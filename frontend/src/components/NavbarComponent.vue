<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

function goToProfile() {
  router.push('/profile');
}

function goToFeed() {
  router.push('/feed');
}

function goToChat() {
  router.push('/chat');
}
</script>

<template>
  <header class="w-full bg-white shadow-sm px-4 py-3 flex justify-between items-center">
    <div class="flex items-center">
      <button
        @click="goToFeed"
        class="shadow-gray-500 cursor-pointer group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-[rgb(108,99,254)] px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,254)] focus:ring-offset-2"
      >
        PostZone
      </button>
    </div>

    <!-- Middle: ChatZone -->
    <div class="flex items-center">
      <button
        @click="goToChat"
        class="shadow-gray-500 cursor-pointer group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-[rgb(108,99,254)] px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,254)] focus:ring-offset-2"
      >
        ChatZone
      </button>
    </div>

    <!-- Right: User info -->
    <div
      class="flex items-center gap-2 px-2 py-1 rounded-md transition hover:bg-gray-100 hover:shadow cursor-pointer group"
      @click="goToProfile"
      v-if="userStore.user"
    >
      <img
        :src="userStore.user.profileImage"
        alt="avatar"
        class="w-8 h-8 rounded-full object-cover border border-gray-300 transition group-hover:scale-105"
      />
      <span class="text-sm font-medium text-gray-800 group-hover:text-[rgb(108,99,254)] transition">
        {{ userStore.user.username }}
      </span>
    </div>
  </header>
</template>
