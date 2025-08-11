<template>
  <div class="flex flex-col h-screen">
    <div class="flex items-center gap-3 border-b border-gray-200 p-4 flex-shrink-0">
      <button
        @click="emit('back')"
        class="text-sm text-[rgb(108,99,254)] font-medium hover:underline"
      >
        ← Back
      </button>
      <img
        :src="chat.user.profileImage || defaultAvatar"
        class="w-8 h-8 rounded-full object-cover"
      />
      <span class="text-sm font-semibold text-gray-800">{{ chat.user.username }}</span>
    </div>

    <!-- Add ref here -->
    <div ref="messageList" class="flex-1 overflow-y-auto px-4 py-2">
      <MessageList :messages="chatStore.chatMessages" />
    </div>

    <div class="p-4 border-t border-gray-200 flex-shrink-0">
      <MessageInput @send="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { onBeforeUnmount, ref, watch, nextTick } from 'vue';

// Components
import MessageList from './MessageList.vue';
import MessageInput from './MessageInput.vue';

// Stores
import { useChatStore } from '@/stores/chat';

// Types
import type { Chat } from '@/types/chat/chat';

// Assets
import defaultAvatar from '@/assets/default-avatar.png';

defineProps<{ chat: Chat }>();
const emit = defineEmits(['back']);

const chatStore = useChatStore();
const messageList = ref<HTMLElement | null>(null);

function sendMessage(newMessage: string) {
  chatStore.sendMessage(newMessage);
}

watch(
  () => chatStore.chatMessages,
  async () => {
    await nextTick();
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight;
    }
  },
  { deep: true },
);

onBeforeUnmount(() => {
  chatStore.leaveChat();
});
</script>
