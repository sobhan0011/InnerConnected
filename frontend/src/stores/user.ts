import { defineStore } from 'pinia';
import { fetchUserData, uploadUserProfileImage, fetchUsers } from '@/apis/userApi';
import type { User } from '@/types/user';
import { CustomError } from '../../common/errors/customError';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as Error | null,
  }),

  actions: {
    async getUserData() {
      this.loading = true;
      this.error = null;

      try {
        const data = await fetchUserData();
        this.user = data ?? null;
      } catch (err: unknown) {
        if (err instanceof CustomError) {
          this.error = err;
        } else {
          this.error = new Error('Unknown error occurred');
        }
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    async uploadProfile(formData: FormData) {
      this.loading = true;
      this.error = null;

      try {
        await uploadUserProfileImage(formData);
        await this.getUserData();
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

    async searchUsersByUsername(filters: object) {
      this.loading = true;
      this.error = null;
      try {
        return await fetchUsers(filters);
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

    clearUser() {
      this.user = null;
    },
  },
});
