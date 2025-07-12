import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import validator from 'validator';

export function validatUpdateUserFields({ firstName, lastName, username, phoneNumber }) {
	const nameRegex = /^[\p{L}\s]+$/u;

	if (firstName) {
		if (!nameRegex.test(firstName.trim())) {
			throw new CustomError({
				...ERROR_CODES.VALIDATION_FAILED,
				details: 'First name must contain only letters (any language) and spaces.',
			});
		}
		if (firstName.length > 50) {
			throw new CustomError({
				...ERROR_CODES.VALIDATION_FAILED,
				details: 'First name must be at most 50 characters.',
			});
		}
	}

	if (lastName) {
		if (!nameRegex.test(lastName.trim())) {
			throw new CustomError({
				...ERROR_CODES.VALIDATION_FAILED,
				details: 'Last name must contain only letters (any language) and spaces.',
			});
		}
		if (lastName.length > 50) {
			throw new CustomError({
				...ERROR_CODES.VALIDATION_FAILED,
				details: 'Last name must be at most 50 characters.',
			});
		}
	}

	if (username && username.trim().length < 3) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Username must be at least 3 characters long.',
		});
	}

	if (phoneNumber && !validator.isMobilePhone(phoneNumber, 'any')) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Invalid phone number.',
		});
	}
}
