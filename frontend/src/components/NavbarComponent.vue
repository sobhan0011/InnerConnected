<script setup lang="ts">
import { useRouter } from 'vue-router';
import InnerConnectedIcon from '@/components/icons/innerConnectedIcon.vue';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

function goToProfile() {
  router.push('/profile');
}

function goToFeed() {
  router.push('/feed');
}
</script>

<template>
  <header class="w-full bg-white shadow-sm px-4 py-3 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <InnerConnectedIcon class="w-6 h-6 text-purple-600" />
      <span @click="goToFeed" class="font-semibold text-lg text-purple-600 cursor-pointer"
        >ChatZone</span
      >
    </div>

    <div class="flex items-center gap-2 cursor-pointer" @click="goToProfile" v-if="userStore.user">
      <img
        :src="userStore.user.profileImage"
        alt="avatar"
        class="w-8 h-8 rounded-full object-cover border border-gray-300"
      />
      <span class="text-sm font-medium text-gray-800">
        {{ userStore.user.username }}
      </span>
    </div>
  </header>
</template>
