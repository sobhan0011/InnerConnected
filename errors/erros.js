export const ERROR_CODES = {
	USER_NOT_FOUND: {
		code: 'USER_NOT_FOUND',
		fa_message: 'کاربر پیدا نشد',
		en_message: 'User not found',
		status: 404,
	},
	EMAIL_ALREADY_EXISTS: {
		code: 'EMAIL_ALREADY_EXISTS',
		fa_message: 'این ایمیل قبلاً ثبت شده است',
		en_message: 'Email already exists',
		status: 409,
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
};
