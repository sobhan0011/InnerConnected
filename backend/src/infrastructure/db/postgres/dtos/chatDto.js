import Chat from '../../../../domain/chat/chat.js';

export function chatDto(chatData) {
	return new Chat({
		id: chatData.id,
		user1Id: chatData.user1_id,
		user2Id: chatData.user2_id,
		createdAt: chatData.created_at,
	});
}
