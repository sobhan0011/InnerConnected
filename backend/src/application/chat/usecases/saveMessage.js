import Message from '../../../domain/message/message.js';

class SaveMessage {
	constructor(messageRepository) {
		this.messageRepository = messageRepository;
	}

	async execute(chatId, senderId, text) {
		const message = Message.create(chatId, senderId, text);
		await this.messageRepository.saveMessage(message);
		return message;
	}
}

export default SaveMessage;
