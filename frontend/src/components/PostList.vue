<script setup lang="ts">
import { onMounted } from 'vue';
import { usePostStore } from '@/stores/post';
import PostItem from './PostItem.vue';
import bgImage from '../assets/undraw_making-art_c05m.svg';

const postStore = usePostStore();

onMounted(async () => {
  await postStore.loadPosts();
});
</script>

<template>
  <div
    class="h-full w-full bg-amber-100 bg-no-repeat bg-cover bg-center"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div
      class="max-w-2xl h-85/100 mx-auto flex flex-col backdrop-blur-sm bg-white/80 shadow-md rounded-2xl overflow-hidden"
    >
      <div class="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <PostItem v-for="post in postStore.posts" :key="post.id" :post-with-user="post" />
      </div>
    </div>
  </div>
</template>
