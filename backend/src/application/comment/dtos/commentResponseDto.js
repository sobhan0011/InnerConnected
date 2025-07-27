export function CommentResponseDto(comment) {
	return {
		id: comment.id,
		content: comment.content,
		createdDate: comment.createdDate,
		postId: comment.postId,
		userId: comment.userId,
	};
}
