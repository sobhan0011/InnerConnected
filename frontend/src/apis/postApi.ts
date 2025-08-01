import axios from 'axios';
import { expressBlogConfig } from '../../configs/expressBlogConfig';
import type { PostWithUser } from '@/types/postWithUser';
import { ERRORS } from '../../common/errors/erros';
import { CustomError } from '../../common/errors/customError';
import { useAuthStore } from '@/stores/auth';

const baseUrl = `${expressBlogConfig.expressBlogHost}:${expressBlogConfig.expressBlogPort}`;

export async function fetchPostsWithUsers(): Promise<PostWithUser[] | undefined> {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/posts?includeUser=true`);

    const updatedData = data.map((postUserData: PostWithUser) => {
      if (postUserData.profileImage) {
        postUserData.profileImage = `${baseUrl}${postUserData.profileImage}`;
      }
      return postUserData;
    });
    
    return updatedData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw CustomError.createError(ERRORS.ERROR_WHILE_GETTING_POSTS, err);
    } else {
      throw CustomError.createError(
        ERRORS.ERROR_WHILE_GETTING_POSTS,
        new Error('Unknown error occurred'),
      );
    }
  }
}

export async function addPost(content: string) {
  try {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (!token) {
      throw new Error('No auth token found');
    }

    await axios.post(
      `${baseUrl}/api/v1/posts`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw CustomError.createError(ERRORS.ERROR_WHILE_ADDING_POST, err);
    } else {
      throw CustomError.createError(
        ERRORS.ERROR_WHILE_GETTING_POSTS,
        new Error('Unknown error occurred'),
      );
    }
  }
}
