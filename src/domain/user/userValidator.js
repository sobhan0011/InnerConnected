import AppError from '../../common/errors/AppError.js';
import { ERROR_CODES } from '../../common/errors/errorCodes.js';
import validator from 'validator';

export function validateUserFields({ firstName, lastName, username, phoneNumber, password, email }) {
	const nameRegex = /^[\p{L}\s]+$/u;

	if (!firstName || !nameRegex.test(firstName.trim())) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'First name must contain only letters (any language) and spaces.',
		});
	}
	if (firstName.length > 50) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'First name must be at most 50 characters.',
		});
	}

	if (!lastName || !nameRegex.test(lastName.trim())) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Last name must contain only letters (any language) and spaces.',
		});
	}
	if (lastName.length > 50) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Last name must be at most 50 characters.',
		});
	}

	if (!username || username.trim().length < 3) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Username must be at least 3 characters long.',
		});
	}

	if (!phoneNumber || !validator.isMobilePhone(phoneNumber, 'any')) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Invalid phone number.',
		});
	}

	if (
		!password ||
		!validator.isStrongPassword(password, {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
	) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Password must be strong (min 8 chars, include uppercase, lowercase, number, symbol).',
		});
	}

	if (!email || !validator.isEmail(email)) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Invalid email format.',
		});
	}
}
