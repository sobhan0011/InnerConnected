import { v4 as uuidv4 } from 'uuid';

class Message {
	constructor({ id, chatId, senderId, text, sendAt }) {
		this.id = id;
		this.chatId = chatId;
		this.senderId = senderId;
		this.text = text;
		this.sendAt = sendAt;
	}

	static create(chatId, senderId, text) {
		if (!text.trim()) throw new Error('Message cannot be empty');
		return new Message({ id: uuidv4(), chatId, senderId, text: text.trim(), sendAt: new Date() });
	}
}

export default Message;
