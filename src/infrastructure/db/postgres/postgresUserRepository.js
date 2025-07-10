class postgresUserRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getAllUsers() {
		const result = await this.db.query('SELECT * FROM users');
		return result.rows;
	}

	async getUserById(id) {
		const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
		return result.rows[0] || null;
	}

	async addUser({ username, email, password }) {
		const result = await this.db.query(
			`INSERT INTO users (username, email, password)
			 VALUES ($1, $2, $3)
			 RETURNING *`,
			[username, email, password],
		);
		return result.rows[0];
	}

	async deleteUser(id) {
		const result = await this.db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
		return result.rows[0] || null;
	}
}

export default postgresUserRepository;
