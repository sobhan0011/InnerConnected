import { messageDto } from '../dtos/messageDto.js';

class postgresMessageRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getMessages(filters) {
		const { chatId } = filters;
		const result = await this.db.query(`SELECT * FROM message WHERE chat_id = $1`, [chatId]);
		return result.rows.map((messageData) => {
			return messageDto(messageData);
		});
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

export default postgresMessageRepository;
