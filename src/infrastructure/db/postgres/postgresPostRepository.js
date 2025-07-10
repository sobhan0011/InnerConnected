class postgresPostRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getAllPosts() {
		const result = await this.db.query('SELECT * FROM posts');
		return result.rows;
	}

	async getPostById(id) {
		const result = await this.db.query('SELECT * FROM posts WHERE id = $1', [id]);
		return result.rows[0] || null;
	}

	async addPost({ postname, email, password }) {
		const result = await this.db.query(
			`INSERT INTO posts (postname, email, password)
			 VALUES ($1, $2, $3)
			 RETURNING *`,
			[postname, email, password],
		);
		return result.rows[0];
	}

	async deletePost(id) {
		const result = await this.db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
		return result.rows[0] || null;
	}
}

export default postgresPostRepository;
