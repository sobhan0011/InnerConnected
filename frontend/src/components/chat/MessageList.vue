<template>
  <div class="flex-1 overflow-y-auto px-4 py-4 space-y-3">
    <div v-for="msg in messages" :key="msg.id" :class="msg.fromMe ? 'text-right' : 'text-left'">
      <div
        :class="[
          'inline-block max-w-xs px-4 py-2 rounded-lg',
          msg.fromMe
            ? 'bg-[rgb(108,99,254)] text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none',
        ]"
      >
        {{ msg.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/chat/message';

defineProps<{ messages: Message[] }>();
</script>
