import { defineStore } from 'pinia';
import { login, signUp } from '@/apis/authApi';
import { CustomError } from '../../common/errors/customError';
import { useUserStore } from './user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: undefined as string | undefined,
    loading: false,
    error: null as Error | null,
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        this.token = await login(email, password);
        const userStore = useUserStore();
        await userStore.getUserData();
      } catch (err: unknown) {
        console.log(err);
        if (err instanceof CustomError) {
          this.error = err;
        } else {
          this.error = new Error('Unknown error occurred');
        }
      } finally {
        this.loading = false;
      }
    },
    async signUp(signUpData: {
      firstName: string;
      lastName: string;
      username: string;
      phoneNumber: string;
      password: string;
      email: string;
    }) {
      this.loading = true;
      this.error = null;
      try {
        this.token = await signUp(signUpData);
      } catch (err: unknown) {
        if (err instanceof CustomError) {
          this.error = err;
        } else {
          this.error = new Error('Unknown error occurred');
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
