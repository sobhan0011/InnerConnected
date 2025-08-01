import axios, { AxiosError } from 'axios';
import { expressBlogConfig } from '../../configs/expressBlogConfig';
import { ERRORS } from '../../common/errors/erros';
import { CustomError } from './../../common/errors/customError';

const baseUrl = `${expressBlogConfig.expressBlogHost}:${expressBlogConfig.expressBlogPort}`;

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err.status === 400) throw CustomError.createError(ERRORS.BAD_REQUEST, err);
      else if (err.status === 404) throw CustomError.createError(ERRORS.USER_NOT_FOUND, err);
    } else {
      throw CustomError.createError(ERRORS.USER_NOT_FOUND, new Error('Unknown error occurred'));
    }
  }
}

export async function signUp(signUpData: {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
}) {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/auth/signup`, signUpData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof AxiosError) {
      if (err.status === 400) throw CustomError.createError(ERRORS.BAD_REQUEST, err);
    } else {
      throw CustomError.createError(
        ERRORS.INTERNAL_SERVER_ERROR,
        new Error('Unknown error occurred'),
      );
    }
  }
}
