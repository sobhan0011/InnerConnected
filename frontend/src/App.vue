<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import NavbarComponent from './components/NavbarComponent.vue';

const route = useRoute();
const showNavbar = computed(() => !['/login', '/signup'].includes(route.path));
</script>

<template>
  <div>
    <NavbarComponent v-if="showNavbar" />
    <RouterView />
  </div>
</template>
