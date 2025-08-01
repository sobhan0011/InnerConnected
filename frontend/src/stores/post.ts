import { defineStore } from 'pinia';
import { fetchPostsWithUsers, addPost as apiAddPost } from '@/apis/postApi';
import type { PostWithUser } from '@/types/postWithUser';
import { CustomError } from '../../common/errors/customError';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as PostWithUser[] | undefined,
    loading: false,
    error: null as Error | null,
  }),

  actions: {
    async loadPosts() {
      this.loading = true;
      this.error = null;
      try {
        this.posts = await fetchPostsWithUsers();
      } catch (err: unknown) {
        if (err instanceof CustomError) {
          this.error = err;
        } else {
          this.error = new Error('Unknown error occurred');
        }
        this.posts = [];
      } finally {
        this.loading = false;
      }
    },

    async addPost(content: string) {
      try {
        await apiAddPost(content);
        await this.loadPosts();
      } catch (err: unknown) {
        if (err instanceof CustomError) {
          this.error = err;
        } else {
          this.error = new Error('Unknown error occurred');
        }
      }
    },
  },
});
