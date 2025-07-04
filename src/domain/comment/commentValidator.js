import AppError from '../../common/errors/AppError.js';
import { ERROR_CODES } from '../../common/errors/errorCodes.js';
import validator from 'validator';

export function validateCommentFields({ id, content, createdDate, postId, userId }) {
	if (id && !validator.isUUID(id, 4)) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Comment ID must be a valid UUID v4.',
		});
	}

	if (!content || content.trim().length < 3) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Content must be at least 3 characters long.',
		});
	}

	if (!createdDate || isNaN(new Date(createdDate).getTime())) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Invalid created date.',
		});
	}

	if (!postId || !validator.isUUID(postId, 4)) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Post ID must be a valid UUID v4.',
		});
	}

	if (!userId || !validator.isUUID(userId, 4)) {
		throw new AppError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'User ID must be a valid UUID v4.',
		});
	}
}
