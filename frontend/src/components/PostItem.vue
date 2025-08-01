<script setup lang="ts">
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline';
import type { PostWithUser } from '@/types/postWithUser';

defineProps<{
  postWithUser: PostWithUser;
}>();
</script>

<template>
  <div class="bg-white shadow-md rounded-2xl p-5 flex gap-4">
    <img
      :src="postWithUser.profileImage"
      alt="Avatar"
      class="w-12 h-12 rounded-full object-cover"
    />

    <div class="flex-1">
      <div class="flex flex-col mb-2">
        <span class="text-sm font-medium text-gray-800">
          {{ postWithUser.username }}
        </span>
        <span class="text-xs text-gray-400">
          {{ new Date(postWithUser.createdDate).toLocaleString() }}
        </span>
      </div>

      <p class="text-gray-700 text-sm mb-3">
        {{ postWithUser.content }}
      </p>

      <div class="flex items-center gap-2 text-gray-400">
        <button class="hover:text-gray-600 transition" title="Reply">
          <ChatBubbleLeftRightIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
