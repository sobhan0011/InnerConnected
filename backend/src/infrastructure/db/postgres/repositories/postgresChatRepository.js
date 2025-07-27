import Chat from '../../../../domain/chat/chat.js';

class postgresChatRepository {
	constructor({ db }) {
		this.db = db;
	}

	async findChatBetweenUsers(userA, userB) {
		const res = await this.db.query(`SELECT * FROM chat WHERE user1_id = $1 AND user2_id = $2`, [userA, userB]);
		const row = res.rows[0];
		if (!row) return null;
		return new Chat({
			id: row.id,
			user1Id: row.user1_id,
			user2Id: row.user2_id,
			createdAt: row.created_at,
		});
	}

	async createChat(chat) {
		await this.db.query(`INSERT INTO chat (id, user1_id, user2_id, created_at) VALUES ($1, $2, $3, $4)`, [
			chat.id,
			chat.user1Id,
			chat.user2Id,
			chat.createdAt,
		]);
	}

	async saveMessage(message) {
		await this.db.query(`INSERT INTO message (id, chat_id, sender_id, text, send_at) VALUES ($1, $2, $3, $4, $5)`, [
			message.id,
			message.chatId,
			message.senderId,
			message.text,
			message.sendAt,
		]);
	}
}

export default postgresChatRepository;
