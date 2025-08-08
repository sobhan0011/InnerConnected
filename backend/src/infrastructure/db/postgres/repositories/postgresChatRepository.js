import Chat from '../../../../domain/chat/chat.js';
import { chatDto } from '../dtos/chatDto.js';
import { chatWithUserPreviewDto } from '../dtos/chatWithUserPreviewDto.js';

class postgresChatRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getChatsWithUserPreview(filters = {}) {
		const { userId, createdBefore, createdAfter, limit = 50, offset = 0 } = filters;

		const params = [];
		const conditions = [];

		if (userId) {
			conditions.push(`(chat.user1_id = $${params.length + 1} OR chat.user2_id = $${params.length + 1})`);
			params.push(userId);
		}

		if (createdAfter) {
			conditions.push(`chat.created_at >= $${params.length + 1}`);
			params.push(createdAfter);
		}

		if (createdBefore) {
			conditions.push(`chat.created_at <= $${params.length + 1}`);
			params.push(createdBefore);
		}

		let query = `
		SELECT
			chat.id AS chat_id,
			chat.created_at,
			CASE
				WHEN chat.user1_id = $1 THEN chat.user2_id
				ELSE chat.user1_id
			END AS target_user_id,
			users.username AS target_username,
			users.profile_image AS target_profile_image
		FROM chat
		JOIN users ON users.id = (
			CASE
				WHEN chat.user1_id = $1 THEN chat.user2_id
				ELSE chat.user1_id
			END
		)
	`;

		if (conditions.length > 0) {
			query += ' WHERE ' + conditions.join(' AND ');
		}

		query += ` ORDER BY chat.created_at DESC LIMIT $${params.length + 1}`;
		params.push(limit);

		if (offset) {
			query += ` OFFSET $${params.length + 1}`;
			params.push(offset);
		}
		const result = await this.db.query(query, params);

		return result.rows.map((chat) => {
			return new chatWithUserPreviewDto(chat);
		});
	}

	async getChatById(id) {
		const result = await this.db.query('SELECT * FROM chat WHERE id = $1', [id]);
		const chatData = result.rows[0];
		if (!chatData) return null;
		return chatDto(chatData);
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
}

export default postgresChatRepository;
