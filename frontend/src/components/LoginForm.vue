<template>
  <div
    class="min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-center px-6 py-8 gap-6 bg-gray-100"
  >
    <div
      class="basis-1/3 hidden md:block md:w-1/2 h-[500px] bg-center bg-no-repeat bg-contain"
      :style="{ backgroundImage: `url(${bgImage})` }"
    ></div>

    <div
      class="basis-2/3 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center space-y-6"
    >
      <InnerConnectedIcon class="w-15 h-15 fill-purple-400" />

      <form class="w-full space-y-5" @submit.prevent="handleSubmit">
        <BaseInput
          v-model="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          :iconLeft="AtSymbolIcon"
        />

        <BaseInput
          v-model="password"
          label="Password"
          placeholder="Enter password"
          type="password"
          :iconLeft="LockClosedIcon"
        />

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Log in
        </button>
      </form>

      <p class="text-sm text-gray-600">
        Don't have an account?
        <span
          @click="emit('goToSignUp')"
          class="text-blue-500 hover:underline font-medium ml-1 cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InnerConnectedIcon from './icons/innerConnectedIcon.vue';
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/vue/24/solid';
import bgImage from '../assets/undraw_certificate_cqps.svg';
import BaseInput from './base/BaseInput.vue';

const email = ref('');
const password = ref('');

const emit = defineEmits(['login', 'goToSignUp']);

const handleSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement;
  if (!form.checkValidity()) return;
  emit('login', { email: email.value, password: password.value });
};
</script>
