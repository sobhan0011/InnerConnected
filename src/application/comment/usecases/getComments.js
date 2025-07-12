import { CommentResponseDto } from '../dtos/commentResponseDto.js';

class GetComments {
	constructor(commentRepository) {
		this.commentRepository = commentRepository;
	}

	async execute() {
		const comments = await this.commentRepository.getAllComments();
		if (!comments) return [];
		return comments.map((comment) => {
			return new CommentResponseDto(comment);
		});
	}
}

export default GetComments;
