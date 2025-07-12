import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';

export function validateUpdatePostFields({ title, content }) {
	if (title && title.trim().length < 3) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Title must be at least 3 characters long.',
		});
	}

	if (!content && content.trim().length < 10) {
		throw new CustomError({
			...ERROR_CODES.VALIDATION_FAILED,
			details: 'Content must be at least 10 characters long.',
		});
	}
}
