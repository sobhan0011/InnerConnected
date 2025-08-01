import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import validator from 'validator';

export function validateCreatePostFields({ content, userId }) {
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
}
