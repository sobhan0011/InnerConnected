<template>
  <main>
    <LoginForm @login="onLogin" @goToSignUp="onGoToSignUp" />
  </main>
</template>

<script setup lang="ts">
import router from '@/router';
import LoginForm from '../components/LoginForm.vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

async function onLogin(loginData: { email: string; password: string }) {
  await authStore.login(loginData.email, loginData.password);
  if (!authStore.error && authStore.token) router.push({ name: 'feed' });
  else alert(authStore.error);
}

function onGoToSignUp() {
  router.push({ name: 'signup' });
}
</script>
