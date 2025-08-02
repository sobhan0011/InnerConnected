<script setup lang="ts">
import PostList from '@/components/PostList.vue';
import { usePostStore } from '@/stores/post';
import { onMounted } from 'vue';
import NewPostForm from '@/components/NewPostForm.vue';

const postStore = usePostStore();

async function submitPost(content: string) {
  if (!content.trim()) return;
  await postStore.addPost(content.trim());
}

onMounted(async () => {
  await postStore.loadPosts();
});
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden bg-gray-50">
    <div class="flex-1 overflow-y-auto px-4 pt-2">
      <PostList />
    </div>

    <div
      class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow px-4 py-3"
    >
      <div class="max-w-2xl mx-auto">
        <NewPostForm @newPost="submitPost" />
      </div>
    </div>
  </div>
</template>
