<template>
  <div class="space-y-3">
    <h3 class="text-sm text-gray-500">Recent</h3>
    <ChatItem
      v-for="chat in chats"
      :key="chat.id"
      :chat="chat"
      @click="
        emit('open-chat', {
          chat,
        })
      "
    />
  </div>
</template>

<script setup lang="ts">
// Components
import ChatItem from './ChatItem.vue';

// Types
import type { Chat } from '@/types/chat/chat';

defineProps<{ chats: Chat[] }>();
const emit = defineEmits(['open-chat']);
</script>
