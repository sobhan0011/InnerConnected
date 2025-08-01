export function PostWithUserResponseDto(postUserData) {
	const { post, user } = postUserData;
	return {
		id: post.id,
		content: post.content,
		createdDate: post.createdDate,
		username: user.username,
		profileImage: user.profileImage || null,
	};
}
