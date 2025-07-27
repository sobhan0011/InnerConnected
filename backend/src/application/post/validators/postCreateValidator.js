import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import validator from 'validator';

export function validateCreatePostFields({ title, content, userId, approved }) {
	if (!title || title.trim().length < 3) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Title must be at least 3 characters long.',
		});
	}

	if (!content || content.trim().length < 10) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Content must be at least 10 characters long.',
		});
	}

	if (!userId || !validator.isUUID(userId, 4)) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'User ID must be a valid UUID v4.',
		});
	}

	if (approved && !validator.isBoolean(approved)) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'approved must be a boolean value.',
		});
	}
}
