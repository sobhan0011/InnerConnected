import Message from '../../../../domain/message/message.js';

export function messageDto(messageData) {
	return new Message({
		id: messageData.id,
		chatId: messageData.chat_id,
		senderId: messageData.sender_id,
		text: messageData.text,
		sendAt: messageData.send_at,
	});
}
