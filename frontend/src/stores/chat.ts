// 3rd Party
import { defineStore } from 'pinia';
import type { Socket } from 'socket.io-client';

// Stores
import { useAuthStore } from './auth';

// Apis
import { fetchChatMessages, fetchUserChats } from '@/apis/chatApi';

// Infra
import { createSocket, getSocket } from '@/infrastructure/socket';

// Types
import type { Chat } from '@/types/chat/chat';
import type { Message } from '@/types/chat/message';
import type { UserPreview } from '@/types/chat/userPreview';
import type { FetchedMessage } from '@/types/chat/fetchedMessage';
import type { StartChatResponse } from '@/types/chat/startChatResponse';

// Commons
import { ERRORS } from '../../common/errors/erros';
import { CustomError } from '../../common/errors/customError';

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [] as Chat[],
    currentChat: null as Chat | null,
    chatMessages: [] as Message[],
    loading: false,
    error: null as Error | null,
    socket: null as Socket | null,
  }),

  actions: {
    async getUserChats() {
      this.loading = true;

      const authStore = useAuthStore();
      const token = authStore.token;
      if (!token) throw new CustomError(ERRORS.UNAUTHORIZED);

      this.chats = await fetchUserChats(token);
      this.loading = false;
    },

    async joinChat(chat: Chat) {
      await this.createChat(chat.user);

      this.loading = true;

      const authStore = useAuthStore();
      const token = authStore.token;
      if (!token) throw new CustomError(ERRORS.UNAUTHORIZED);

      const fetchedPreviousMessages = chat.id ? await fetchChatMessages(token, chat.id) : [];

      const previousMessages = fetchedPreviousMessages.map((fetchedMessage: FetchedMessage) => {
        return {
          id: fetchedMessage.id,
          text: fetchedMessage.text,
          createdAt: fetchedMessage.createdAt,
          fromMe: fetchedMessage.senderId !== chat.user.id,
        };
      });

      this.chatMessages.push(...previousMessages);

      this.loading = false;
    },

    createChat(targetUser: UserPreview): Promise<Chat> {
      return new Promise((resolve, reject) => {
        this.loading = true;

        const authStore = useAuthStore();
        const token = authStore.token;
        if (!token) return reject(new CustomError(ERRORS.UNAUTHORIZED));

        createSocket(token);
        this.socket = getSocket();
        this.socket.connect();

        this.socket.emit('startChat', { toUserId: targetUser.id }, (res: StartChatResponse) => {
          if (res?.error) {
            return reject(new CustomError(ERRORS.FAILED_TO_START_CHAT));
          }

          const chat = {
            id: res.chatId,
            createdAt: res.createdAt,
            user: targetUser,
          };

          this.currentChat = chat;
          // this.chats.push(chat);
          resolve(chat);
        });

        this.socket.on('receiveMessage', (msg: FetchedMessage) => {
          const fromTargetUser = msg.senderId === targetUser.id;
          if (fromTargetUser) this.chatMessages.push({ id: msg.id, text: msg.text, fromMe: false });
        });

        this.loading = false;
      });
    },

    sendMessage(text: string) {
      if (!this.socket) return;

      const msg: Message = {
        id: crypto.randomUUID(),
        text,
        fromMe: true,
      };

      this.chatMessages.push(msg);

      this.socket.emit('sendMessage', {
        chatId: this.currentChat?.id,
        text,
      });
    },

    leaveChat() {
      this.error = null;
      this.loading = false;

      if (this.socket) {
        this.socket.off('receiveMessage');
        this.socket.disconnect();
        this.socket = null;
      }

      this.currentChat = null;
      this.chatMessages = [];
    },
  },
});
