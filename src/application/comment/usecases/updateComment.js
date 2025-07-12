import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import { validateUpdateCommentFields } from '../validators/commentUpdateValidator.js';
import { CommentResponseDto } from '../dtos/commentResponseDto.js';

class UpdateComment {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	async execute(commentId, commentData) {
		validateUpdateCommentFields(commentData);
		const existingComment = await this.commentRepository.getCommentById(commentId);
		if (!existingComment) throw new CustomError(ERROR_CODES.COMMENT_NOT_FOUND);
		existingComment.content = commentData.content ?? existingComment.content;
		await this.commentRepository.updateComment(existingComment);
		return new CommentResponseDto(existingComment);
	}
}

export default UpdateComment;
