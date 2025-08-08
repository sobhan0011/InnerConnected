<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center gap-3 border-b border-gray-200 p-4">
      <button
        @click="emit('back')"
        class="text-sm text-[rgb(108,99,254)] font-medium hover:underline"
      >
        ← Back
      </button>
      <img :src="chat.user.profileImage" class="w-8 h-8 rounded-full object-cover" />
      <span class="text-sm font-semibold text-gray-800">{{ chat.user.username }}</span>
    </div>

    <MessageList :messages="chatStore.chatMessages" class="flex-1 overflow-y-auto px-4 py-2" />

    <div class="p-4 border-t border-gray-200">
      <MessageInput @send="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { onBeforeUnmount } from 'vue';

// Components
import MessageList from './MessageList.vue';
import MessageInput from './MessageInput.vue';

// Stores
import { useChatStore } from '@/stores/chat';

// Types
import type { Chat } from '@/types/chat/chat';

defineProps<{ chat: Chat }>();
const emit = defineEmits(['back']);

const chatStore = useChatStore();

function sendMessage(newMessage: string) {
  chatStore.sendMessage(newMessage);
}

onBeforeUnmount(() => {
  chatStore.leaveChat();
});
</script>
