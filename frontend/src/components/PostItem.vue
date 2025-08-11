<template>
  <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-full">
    <div class="flex items-start gap-4 mb-3">
      <img
        :src="postWithUser.profileImage || defaultAvatar"
        alt="User avatar"
        class="w-12 h-12 rounded-full object-cover"
      />
      <div class="flex-1">
        <div class="flex justify-between items-center">
          <span class="text-sm font-semibold text-gray-800">
            {{ postWithUser.username }}
          </span>
          <span class="text-xs text-gray-400">
            {{ getRelativeTime(postWithUser.createdDate) }}
          </span>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {{ postWithUser.content }}
      </p>
    </div>

    <div class="flex items-center gap-6 text-gray-500 text-sm">
      <button class="flex items-center gap-1 hover:text-gray-700 transition">
        <ChatBubbleLeftRightIcon class="w-5 h-5" />
        <span>Reply</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline';
import type { PostWithUser } from '@/types/postWithUser';
import defaultAvatar from '@/assets/default-avatar.png';

defineProps<{
  postWithUser: PostWithUser;
}>();

function getRelativeTime(date: string | number | Date): string {
  const now = new Date();
  const posted = new Date(date);
  const diffMs = now.getTime() - posted.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;

  return posted.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
</script>
