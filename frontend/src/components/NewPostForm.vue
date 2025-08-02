<template>
  <div class="max-w-2xl mx-auto mb-6">
    <form @submit.prevent="sendText" class="flex gap-3">
      <input
        v-model="newPost"
        type="text"
        placeholder="What's on your mind?"
        class="flex-1 bg-white border border-gray-300 rounded-xl px-5 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,254)]"
      />
      <button
        type="submit"
        class="bg-[rgb(108,99,254)] text-white px-6 py-3 rounded-xl text-base font-semibold hover:brightness-110 transition"
      >
        Post
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const newPost = ref('');
const emit = defineEmits(['newPost']);

function sendText() {
  emit('newPost', newPost.value);
  newPost.value = '';
}
</script>
