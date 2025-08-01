<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ref, onMounted } from 'vue';

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

<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-white py-10 px-4">
    <div class="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">
      <!-- Title -->
      <h1 class="text-2xl font-extrabold text-purple-700 text-center">Your Profile</h1>

      <!-- User Info -->
      <div class="flex items-center gap-5">
        <img
          :src="userStore.user?.profileImage"
          class="w-20 h-20 rounded-full object-cover border-2 border-purple-400 shadow"
          alt="Profile"
        />
        <div>
          <p class="text-lg font-semibold text-gray-800">{{ userStore.user?.username }}</p>
          <p class="text-sm text-gray-500">{{ userStore.user?.email }}</p>
        </div>
      </div>

      <!-- Upload Section -->
      <div class="pt-4 border-t border-gray-200">
        <label class="block mb-2 font-medium text-sm text-gray-700">
          Upload new profile picture
        </label>
        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="block text-sm text-gray-700 border border-gray-300 rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-purple-400"
        />
        <button
          @click="uploadProfilePost"
          :disabled="uploading"
          class="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out disabled:opacity-60"
        >
          {{ uploading ? 'Uploading...' : 'Upload' }}
        </button>
      </div>
    </div>
  </div>
</template>
