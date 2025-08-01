import { ERRORS } from './erros';

interface ErrorDetails {
  code: string;
  en_message: string;
  fa_message: string;
  status: number;
  details?: Error;
}

export class CustomError extends Error {
  code: string;
  status: number;
  en_message: string;
  fa_message: string;
  details?: Error;

  constructor({ code, en_message, fa_message, status, details }: ErrorDetails) {
    super(en_message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
    this.en_message = en_message;
    this.fa_message = fa_message;
    this.details = details || undefined;
  }

  static createError(
    error: (typeof ERRORS)[keyof typeof ERRORS],
    originalError?: Error,
  ): CustomError {
    return new CustomError({ ...error, details: originalError });
  }
}
