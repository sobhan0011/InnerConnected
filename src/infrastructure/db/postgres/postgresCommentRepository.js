class postgresCommentRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getAllComments() {
		const result = await this.db.query('SELECT * FROM comments');
		return result.rows;
	}

	async getCommentById(id) {
		const result = await this.db.query('SELECT * FROM comments WHERE id = $1', [id]);
		return result.rows[0] || null;
	}

	async addComment({ commentname, email, password }) {
		const result = await this.db.query(
			`INSERT INTO comments (commentname, email, password)
			 VALUES ($1, $2, $3)
			 RETURNING *`,
			[commentname, email, password],
		);
		return result.rows[0];
	}

	async deleteComment(id) {
		const result = await this.db.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
		return result.rows[0] || null;
	}
}

export default postgresCommentRepository;
