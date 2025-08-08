<template>
  <div class="p-4 space-y-6">
    <h2 class="text-xl font-bold text-gray-800">ChatZone</h2>

    <input
      v-model="searchQuery"
      placeholder="Search users..."
      class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,254)]"
    />

    <SuggestedUsers :suggested-users @select-user="emit('select-user', $event)" />

    <PreviousChats :chats="chatStore.chats" @open-chat="emit('open-chat', $event)" />
  </div>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref, watch } from 'vue';

// Components
import SuggestedUsers from './SuggestedUsers.vue';
import PreviousChats from './PreviousChats.vue';

// Stores
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';

// Types
import type { UserPreview } from '@/types/chat/userPreview';

const userStore = useUserStore();
const chatStore = useChatStore();

const emit = defineEmits(['select-user', 'open-chat']);

const searchQuery = ref('');
const suggestedUsers = ref<UserPreview[]>([]);

onMounted(async () => {
  await chatStore.getUserChats();
});

watch(searchQuery, async (val) => {
  if (!val.trim()) return (suggestedUsers.value = []);
  const users = await userStore.searchUsersByUsername({ username: val });
  suggestedUsers.value = Array.isArray(users) ? users : [];
});
</script>
