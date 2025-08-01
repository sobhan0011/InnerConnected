export function PostResponseDto(post) {
	return {
		id: post.id,
		content: post.content,
		createdDate: post.createdDate,
		userId: post.userId,
	};
}
