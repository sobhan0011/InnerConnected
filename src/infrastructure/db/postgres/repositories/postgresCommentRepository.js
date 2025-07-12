import Comment from '../../../../domain/comment/comment.js';

class postgresCommentRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getAllComments() {
		const result = await this.db.query('SELECT * FROM comments');
		return result.rows.map((commentData) => {
			return this.commentDto(commentData);
		});
	}

	async getCommentById(id) {
		const result = await this.db.query('SELECT * FROM comments WHERE id = $1', [id]);
		const commentData = result.rows[0];
		if (!commentData) return null;
		return this.commentDto(commentData);
	}

	async addComment(comment) {
		const { id, content, createdDate, postId, userId } = comment;
		const result = await this.db.query(
			`INSERT INTO comments (id, content, created_date, post_id, user_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
			[id, content, createdDate, postId, userId],
		);
		const commentData = result.rows[0];
		if (!commentData) return null;
		return this.commentDto(commentData);
	}

	async deleteComment(id) {
		await this.db.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
	}

	async updateComment(commentNewData) {
		const { id, content } = commentNewData;
		const result = await this.db.query(
			`UPDATE comments
		 SET content = $1
		 WHERE id = $2
		 `,
			[content, id],
		);
		const commentData = result.rows[0];
		if (!commentData) return null;
		return this.commentDto(commentData);
	}

	commentDto(commentData) {
		return new Comment({
			id: commentData.id,
			content: commentData.content,
			createdDate: commentData.created_date,
			postId: commentData.post_id,
			userId: commentData.user_id,
		});
	}
}

export default postgresCommentRepository;
