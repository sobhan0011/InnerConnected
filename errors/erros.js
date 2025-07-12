export const ERROR_CODES = {
	USER_NOT_FOUND: {
		code: 'USER_NOT_FOUND',
		fa_message: 'کاربر پیدا نشد',
		en_message: 'User not found',
		status: 404,
	},
	VALIDATION_FAILED: {
		code: 'VALIDATION_FAILED',
		fa_message: 'اعتبارسنجی ناموفق بود',
		en_message: 'Validation failed',
		status: 400,
	},
	INTERNAL_SERVER_ERROR: {
		code: 'INTERNAL_SERVER_ERROR',
		fa_message: 'خطای داخلی سرور',
		en_message: 'Internal server error',
		status: 500,
	},
	EMAIL_ALREADY_EXISTS: {
		code: 'EMAIL_ALREADY_EXISTS',
		fa_message: 'این ایمیل قبلاً ثبت شده است',
		en_message: 'Email already exists',
		status: 409,
	},
	USERNAME_ALREADY_EXISTS: {
		code: 'USERNAME_ALREADY_EXISTS',
		fa_message: 'این نام کاربری قبلاً ثبت شده است',
		en_message: 'Username already exists',
		status: 409,
	},
	POST_NOT_FOUND: {
		code: 'POST_NOT_FOUND',
		fa_message: 'پست پیدا نشد',
		en_message: 'Post not found',
		status: 404,
	},
	COMMENT_NOT_FOUND: {
		code: 'COMMENT_NOT_FOUND',
		fa_message: 'کامنت پیدا نشد',
		en_message: 'Comment not found',
		status: 404,
	},
};
