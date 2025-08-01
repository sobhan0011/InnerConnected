import axios from 'axios';
import { expressBlogConfig } from '../../configs/expressBlogConfig';
import type { User } from '@/types/user';
import { ERRORS } from '../../common/errors/erros';
import { CustomError } from './../../common/errors/customError';
import { useAuthStore } from '@/stores/auth';

const baseUrl = `${expressBlogConfig.expressBlogHost}:${expressBlogConfig.expressBlogPort}`;

export async function fetchUserData(): Promise<User | undefined> {
  try {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (!token) {
      throw new Error('No auth token found');
    }

    const { data } = await axios.get(`${baseUrl}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.profileImage) {
      data.profileImage = `${baseUrl}${data.profileImage}`;
    }

    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw CustomError.createError(ERRORS.USER_NOT_FOUND, err);
    } else {
      throw CustomError.createError(
        ERRORS.INTERNAL_SERVER_ERROR,
        new Error('Unknown error occurred'),
      );
    }
  }
}

export async function uploadUserProfileImage(formData: FormData): Promise<void> {
  try {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (!token) {
      throw new Error('No auth token found');
    }

    await axios.post(`${baseUrl}/api/v1/users/me/upload-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw CustomError.createError(ERRORS.INTERNAL_SERVER_ERROR, err);
    } else {
      throw CustomError.createError(
        ERRORS.INTERNAL_SERVER_ERROR,
        new Error('Unknown error occurred'),
      );
    }
  }
}
