class ChatController {
	constructor({ chatUsecaseRegistry }) {
		this.chatUsecaseRegistry = chatUsecaseRegistry;
	}

	getChatMessages = async (req, res) => {
		const chatId = req.params.chatId;
		const requester = req.user;
		const result = await this.chatUsecaseRegistry.getChatMessages.execute(chatId, requester);
		res.json(result);
	};
}

export default ChatController;
