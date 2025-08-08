export function MessageResponseDto(message) {
	return {
		id: message.id,
		chatId: message.chatId,
		sendAt: message.sendAt,
		senderId: message.senderId,
		text: message.text,
	};
}
