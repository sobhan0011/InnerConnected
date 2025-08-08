<template>
  <form @submit.prevent="send" class="flex gap-2">
    <input
      v-model="localMessage"
      type="text"
      placeholder="Type a message..."
      class="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,254)]"
    />
    <button
      type="submit"
      class="bg-[rgb(108,99,254)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition"
    >
      Send
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'send', message: string): void;
}>();

const localMessage = ref('');

function send() {
  if (!localMessage.value.trim()) return;
  emit('send', localMessage.value);
  localMessage.value = '';
}
</script>
