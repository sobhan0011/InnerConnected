export const ERRORS = {
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    en_message: 'User not found',
    fa_message: 'کاربر پیدا نشد',
    status: 404,
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    en_message: 'Bad request',
    fa_message: 'داد‌های ورودی نامعتبرند',
    status: 400,
  },
  ERROR_WHILE_GETTING_POSTS: {
    code: 'ERROR_WHILE_GETTING_POSTS',
    en_message: 'Error while getting posts',
    fa_message: 'خطا هنگام دریافت پست ها',
    status: 400,
  },
  ERROR_WHILE_ADDING_POST: {
    code: 'ERROR_WHILE_ADDING_POST',
    en_message: 'Error while adding posts',
    fa_message: 'خطا هنگام ارسال پست',
    status: 500,
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    en_message: 'Internal server error',
    fa_message: 'خطای داخلی سرور',
    status: 500,
  },
  EMAIL_ALREADY_EXISTS: {
    code: 'EMAIL_ALREADY_EXISTS',
    en_message: 'Email already exists',
    fa_message: 'این ایمیل قبلاً ثبت شده است',
    status: 409,
  },
  USERNAME_ALREADY_EXISTS: {
    code: 'USERNAME_ALREADY_EXISTS',
    en_message: 'Username already exists',
    fa_message: 'این نام کاربری قبلاً ثبت شده است',
    status: 409,
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    en_message: 'Unauthorized',
    fa_message: 'دسترسی غیر مجاز است',
    status: 401,
  },
  FAILED_TO_START_CHAT: {
    code: 'FAILED_TO_START_CHAT',
    en_message: 'Failed to start chat',
    fa_message: 'آغاز چت با شکست مواجه شد',
    status: 500,
  },
};
