import SendMessage from './sendMessage.js';
import StartChat from './startChat.js';

class ChatUsecaseRegistry {
	constructor({ chatRepository }) {
		this.startChat = new StartChat(chatRepository);
		this.sendMessage = new SendMessage(chatRepository);
	}
}

export default ChatUsecaseRegistry;
