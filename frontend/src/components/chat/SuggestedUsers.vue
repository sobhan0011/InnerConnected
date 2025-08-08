<template>
  <div v-if="suggestedUsers.length" class="space-y-3">
    <h3 class="text-sm text-gray-500">Suggestions</h3>
    <SuggestedUser
      v-for="user in suggestedUsers"
      :key="user.id"
      :user="user"
      @click="emit('select-user', user)"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import type { UserPreview } from '@/types/chat/userPreview';

// Types
import SuggestedUser from './SuggestedUser.vue';

defineProps<{ suggestedUsers: UserPreview[] }>();
const emit = defineEmits(['select-user']);
</script>
