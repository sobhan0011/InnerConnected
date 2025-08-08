import { GetChatMessages } from './getChatMessages.js';
import SaveMessage from './saveMessage.js';
import StartChat from './startChat.js';

class ChatUsecaseRegistry {
	constructor({ chatRepository, messageRepository }) {
		this.startChat = new StartChat(chatRepository);
		this.saveMessage = new SaveMessage(messageRepository);
		this.getChatMessages = new GetChatMessages(chatRepository, messageRepository);
	}
}

export default ChatUsecaseRegistry;
