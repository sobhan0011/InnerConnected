<template>
  <div class="h-screen bg-white flex flex-col">
    <div class="max-w-3xl w-full mx-auto flex-1">
      <transition name="fade" mode="out-in">
        <ChatList
          v-if="!chatActive"
          @back="goBack"
          @select-user="createAndOpenChat"
          @open-chat="selectChat"
        />
        <ChatWindow v-else :chat="activeChat!" @back="goBack" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import ChatList from '@/components/chat/ChatList.vue';
import ChatWindow from '@/components/chat/ChatWindow.vue';

// Stores
import { useChatStore } from '@/stores/chat';

// Types
import type { Chat } from '@/types/chat/chat';
import type { UserPreview } from '@/types/chat/userPreview';

const chatStore = useChatStore();

const chatActive = ref(false);
const activeChat = ref<Chat | null>(null);

async function createAndOpenChat(user: UserPreview) {
  await chatStore.createChat(user);
  const newChat = chatStore.currentChat;
  if (newChat) openChat(newChat);
}

async function selectChat({ chat }: { chat: Chat }) {
  await chatStore.joinChat(chat);
  const newChat = chatStore.currentChat;
  if (newChat) openChat(newChat);
}

function openChat(chat: Chat) {
  chatActive.value = true;
  activeChat.value = chat;
}

function goBack() {
  chatActive.value = false;
  activeChat.value = null;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
