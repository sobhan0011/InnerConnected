import Message from '../../../domain/chat/message.js';

class SendMessage {
	constructor(chatRepository) {
		this.chatRepository = chatRepository;
	}

	async execute(chatId, senderId, text) {
		const message = Message.create(chatId, senderId, text);
		await this.chatRepository.saveMessage(message);
		return message;
	}
}

export default SendMessage;
