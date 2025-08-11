import axios, { AxiosError } from 'axios';
import { expressBlogConfig } from '../../configs/expressBlogConfig';
import { ERRORS } from '../../common/errors/erros';
import { CustomError } from '../../common/errors/customError';
import type { Chat } from '@/types/chat/chat';

const baseUrl = `${expressBlogConfig.expressBlogHost}:${expressBlogConfig.expressBlogPort}`;

export async function fetchChatMessages(token: string, chatId: string) {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/chats/${chatId}/messages`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err.status === 400) throw CustomError.createError(ERRORS.BAD_REQUEST, err);
      else if (err.status === 404) throw CustomError.createError(ERRORS.USER_NOT_FOUND, err);
    } else {
      throw CustomError.createError(ERRORS.USER_NOT_FOUND, new Error('Unknown error occurred'));
    }
  }
}

export async function fetchUserChats(token: string) {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/users/chats`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedData = data.map((chatData: Chat) => {
      if (chatData.user.profileImage) {
        chatData.user.profileImage = `${baseUrl}${chatData.user.profileImage}`;
      }
      return chatData;
    });
    return updatedData;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err.status === 400) throw CustomError.createError(ERRORS.BAD_REQUEST, err);
      else if (err.status === 404) throw CustomError.createError(ERRORS.USER_NOT_FOUND, err);
    } else {
      throw CustomError.createError(ERRORS.USER_NOT_FOUND, new Error('Unknown error occurred'));
    }
  }
}
