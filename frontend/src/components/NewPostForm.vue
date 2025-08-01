<template>
  <div class="max-w-2xl mx-auto mb-6">
    <form @submit.prevent="emit('newPost', newPost)" class="flex gap-2">
      <input
        v-model="newPost"
        type="text"
        placeholder="What's on your mind?"
        class="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
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
</script>
