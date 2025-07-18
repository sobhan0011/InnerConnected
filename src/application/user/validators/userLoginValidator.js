import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import validator from 'validator';

export function validateUserLoginFields(email) {
	if (!email || !validator.isEmail(email)) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Invalid email format.',
		});
	}
}
