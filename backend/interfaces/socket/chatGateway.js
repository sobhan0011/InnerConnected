function createChatGateway(io, { chatUsecaseRegistry }) {
	io.on('connection', (socket) => {
		const userId = socket.user?.id;
		if (!userId) return socket.disconnect(true);

		socket.join(userId);

		socket.on('startChat', async ({ toUserId }, cb) => {
			try {
				const chat = await chatUsecaseRegistry.startChat.execute(userId, toUserId);
				socket.join(chat.id);
				cb({ chatId: chat.id, createdAt: chat.createdAt });
			} catch (err) {
				console.error('startChat error:', err);
				cb({ error: 'Failed to start chat' });
			}
		});

		socket.on('sendMessage', async ({ chatId, text }) => {
			try {
				const message = await chatUsecaseRegistry.saveMessage.execute(chatId, userId, text);
				io.to(chatId).emit('receiveMessage', message);
			} catch (err) {
				console.error('sendMessage error:', err);
			}
		});
	});
}

export default createChatGateway;
