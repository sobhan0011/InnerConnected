<template>
  <main>
    <SignUp @signup="onSignUp" @goToLogin="ongoToLogin" />
  </main>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import SignUp from '@/components/SignUp.vue';
const authStore = useAuthStore();

async function onSignUp(signUpData: {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
}) {
  await authStore.signUp(signUpData);
  if (!authStore.error && authStore.token) router.push({ name: 'login' });
  else alert(authStore.error);
}

function ongoToLogin() {
  router.push({ name: 'login' });
}
</script>
