export function PostResponseDto(post) {
	return {
		id: post.id,
		title: post.title,
		content: post.content,
		createdDate: post.createdDate,
		approved: post.approved,
		userId: post.userId,
	};
}
