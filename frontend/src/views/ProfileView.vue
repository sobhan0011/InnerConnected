<template>
  <div class="min-h-screen bg-gradient-to-b from-[rgb(243,240,255)] to-white py-12 px-4">
    <div
      class="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8 border border-gray-100"
    >
      <!-- Title -->
      <h1 class="text-3xl font-bold text-center text-[rgb(108,99,254)] tracking-tight">
        Your Profile
      </h1>

      <!-- User Info -->
      <div class="flex items-center gap-5">
        <img
          :src="userStore.user?.profileImage || defaultAvatar"
          class="w-24 h-24 rounded-full object-cover border-4 border-[rgb(108,99,254)] shadow-md"
          alt="Profile"
        />
        <div>
          <p class="text-xl font-semibold text-gray-800">{{ userStore.user?.username }}</p>
          <p class="text-sm text-gray-500">{{ userStore.user?.email }}</p>
        </div>
      </div>

      <!-- Upload Section -->
      <div class="pt-6 border-t border-gray-200 space-y-4">
        <label class="block text-sm font-medium text-gray-700">
          Upload a new profile picture
        </label>

        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="block w-full text-sm border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,254)]"
        />

        <button
          @click="uploadProfilePost"
          :disabled="uploading"
          class="cursor-pointer w-full bg-[rgb(108,99,254)] hover:brightness-110 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ uploading ? 'Uploading...' : 'Upload' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, onMounted } from 'vue';

// Stores
import { useUserStore } from '@/stores/user';

// Assets
import defaultAvatar from '@/assets/default-avatar.png';

const userStore = useUserStore();

const file = ref<File | null>(null);
const uploading = ref(false);

async function uploadProfilePost() {
  if (!file.value) return;
  uploading.value = true;

  const formData = new FormData();
  formData.append('profileImage', file.value);

  await userStore.uploadProfile(formData);
  uploading.value = false;
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files?.[0] || null;
  file.value = selectedFile;
}

onMounted(async () => {
  await userStore.getUserData();
});
</script>
