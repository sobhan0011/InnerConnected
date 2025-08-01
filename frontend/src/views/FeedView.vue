<script setup lang="ts">
import PostList from '@/components/PostList.vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '@/stores/post';
import { onMounted } from 'vue';
import NewPostForm from '@/components/NewPostForm.vue';

const router = useRouter();
const postStore = usePostStore();

function goToChat() {
  router.push('/chat');
}

async function submitPost(content: string) {
  if (!content.trim()) return;
  await postStore.addPost(content.trim());
}

onMounted(async () => {
  await postStore.loadPosts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-8 flex flex-col gap-4">
    <div class="max-w-2xl mx-auto mb-6 flex items-center justify-between">
      <button
        @click="goToChat"
        class="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow"
      >
        Go to Chat
      </button>
    </div>

    <PostList />
    <NewPostForm class="w-1/1" @newPost="submitPost" />
  </div>
</template>
