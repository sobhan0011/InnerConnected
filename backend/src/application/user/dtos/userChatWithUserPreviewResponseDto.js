export function UserChatWithUserPreviewResponseDto(chatWithUserPreview) {
	return {
		id: chatWithUserPreview.id,
		user: {
			id: chatWithUserPreview.userId,
			username: chatWithUserPreview.username,
			profileImage: chatWithUserPreview.profileImage,
		},
		createdAt: chatWithUserPreview.createdAt,
	};
}
