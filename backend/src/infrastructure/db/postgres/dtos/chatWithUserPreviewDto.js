export function chatWithUserPreviewDto(chatData) {
	return {
		id: chatData.chat_id,
		userId: chatData.target_user_id,
		username: chatData.target_username,
		profileImage: chatData.target_profile_image,
		createdAt: chatData.created_at,
	};
}
