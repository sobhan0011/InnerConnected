import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import validator from 'validator';
import UserRoles from '../../../domain/user/userRoles.js';

export function validateCreateUserFields({ firstName, lastName, username, phoneNumber, password, email, role }) {
	const nameRegex = /^[\p{L}\s]+$/u;

	if (!firstName || !nameRegex.test(firstName.trim())) {
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

	if (!lastName || !nameRegex.test(lastName.trim())) {
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

	if (!username || username.trim().length < 3) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Username must be at least 3 characters long.',
		});
	}

	if (!phoneNumber || !validator.isMobilePhone(phoneNumber, 'any')) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Invalid phone number.',
		});
	}

	if (!Object.values(UserRoles).includes(role)) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Invalid role.',
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
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Password must be strong (min 8 chars, include uppercase, lowercase, number, symbol).',
		});
	}

	if (!email || !validator.isEmail(email)) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Invalid email format.',
		});
	}
}
