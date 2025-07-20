import UserRoles from '../../../domain/user/userRoles.js';
import { CommentResponseDto } from '../dtos/commentResponseDto.js';

class GetComments {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	async execute(filters, requester) {
		if (!requester || requester.role !== UserRoles.ADMIN) filters.approved = true;
		const comments = await this.commentRepository.getComments(filters);
		if (!comments) return [];
		return comments.map((comment) => {
			return new CommentResponseDto(comment);
		});
	}
}

export default GetComments;
