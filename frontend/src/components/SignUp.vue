<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <form
      class="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6"
      @submit.prevent="handleSignup"
    >
      <div class="flex justify-center">
        <InnerConnectedIcon class="w-15 h-15 fill-purple-400" />
      </div>
      <div class="text-center">
        <h2 class="text-2xl font-semibold text-gray-800">Create your account</h2>
      </div>

      <BaseInput v-model="form.firstName" label="First Name" placeholder="Your first name" />
      <BaseInput v-model="form.lastName" label="Last Name" placeholder="Your last name" />
      <BaseInput v-model="form.username" label="Username" placeholder="Choose a username" />
      <BaseInput v-model="form.phoneNumber" label="Phone Number" placeholder="e.g. 09945040322" />
      <BaseInput v-model="form.email" label="Email" type="email" placeholder="Your email address" />
      <BaseInput
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Create a secure password"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm transition"
      >
        Sign Up
      </button>

      <p class="text-sm text-center text-gray-600">
        Already have an account?
        <span
          @click="emit('goToLogin')"
          class="text-blue-600 hover:underline font-medium cursor-pointer ml-1"
        >
          Log in
        </span>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue';
import { ref } from 'vue';
import InnerConnectedIcon from './icons/innerConnectedIcon.vue';

const emit = defineEmits(['signup', 'goToLogin']);

const form = ref({
  firstName: '',
  lastName: '',
  username: '',
  phoneNumber: '',
  password: '',
  email: '',
});

function handleSignup() {
  emit('signup', { ...form.value });
}
</script>
