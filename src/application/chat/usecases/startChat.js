import Chat from '../../../domain/chat/chat.js';

class StartChat {
	constructor(chatRepository) {
		this.chatRepository = chatRepository;
	}

	async execute(userId, targetUserId) {
		const [a, b] = [userId, targetUserId].sort();
		const existing = await this.chatRepository.findChatBetweenUsers(a, b);
		if (existing) return existing;

		const chat = Chat.create(a, b);
		await this.chatRepository.createChat(chat);
		return chat;
	}
}

export default StartChat;
