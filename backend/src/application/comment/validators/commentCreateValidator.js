import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import validator from 'validator';

export function validateCreateCommentFields({ content, postId, userId }) {
	if (!content || content.trim().length < 3) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Content must be at least 3 characters long.',
		});
	}

	if (!postId || !validator.isUUID(postId, 4)) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Post ID must be a valid UUID v4.',
		});
	}

	if (!userId || !validator.isUUID(userId, 4)) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'User ID must be a valid UUID v4.',
		});
	}
}
