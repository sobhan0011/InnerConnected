import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import { useAuthStore } from '@/stores/auth';
import FeedView from '@/views/FeedView.vue';
import ProfileView from '@/views/ProfileView.vue';
import ChatView from '@/views/ChatView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    { path: '/feed', name: 'feed', component: FeedView, meta: { requriesAuth: true } },
    { path: '/chat', name: 'chat', component: ChatView, meta: { requriesAuth: true } },
    { path: '/', redirect: '/feed' },
    { path: '/profile', name: 'profile', component: ProfileView },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.token;
  if (to.meta.requriesAuth && !isLoggedIn) next({ name: 'login' });
  else next();
});

export default router;
