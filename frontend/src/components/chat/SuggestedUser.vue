<template>
  <div
    class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition"
  >
    <img :src="user.profileImage || defaultAvatar" class="w-10 h-10 rounded-full object-cover" />
    <span class="text-sm font-medium text-gray-800">{{ user.username }}</span>
  </div>
</template>

<script setup lang="ts">
// Types
import type { UserPreview } from '@/types/chat/userPreview';

// Assets
import defaultAvatar from '@/assets/default-avatar.png';

defineProps<{ user: UserPreview }>();
</script>
