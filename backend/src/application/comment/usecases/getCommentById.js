import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';
import UserRoles from '../../../domain/user/userRoles.js';
import { CommentResponseDto } from '../dtos/commentResponseDto.js';

class GetCommentById {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	async execute(commentId) {
		const comment = await this.commentRepository.getCommentById(commentId);
		if (!comment) throw new CustomError(ERROR_CODES.COMMENT_NOT_FOUND);

		return new CommentResponseDto(comment);
	}
}

export default GetCommentById;
