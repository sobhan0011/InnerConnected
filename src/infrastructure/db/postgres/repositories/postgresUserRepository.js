import User from '../../../../domain/user/user.js';

class postgresUserRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getUsers(filter = {}) {
		const conditions = [];
		const values = [];
		let i = 1;

		if (filter.username) {
			conditions.push(`username = $${i++}`);
			values.push(filter.username);
		}

		if (filter.email) {
			conditions.push(`email = $${i++}`);
			values.push(filter.email);
		}

		if (filter.firstName) {
			conditions.push(`LOWER(first_name) = LOWER($${i++})`);
			values.push(filter.firstName);
		}

		if (filter.lastName) {
			conditions.push(`LOWER(last_name) = LOWER($${i++})`);
			values.push(filter.lastName);
		}

		if (filter.createdAfter) {
			conditions.push(`created_at >= $${i++}`);
			values.push(filter.createdAfter);
		}

		if (filter.createdBefore) {
			conditions.push(`created_at <= $${i++}`);
			values.push(filter.createdBefore);
		}

		let query = 'SELECT * FROM users';
		if (conditions.length > 0) {
			query += ' WHERE ' + conditions.join(' AND ');
		}

		const result = await this.db.query(query, values);
		return result.rows.map((userData) => {
			return this.userDto(userData);
		});
	}

	async getUserById(id) {
		const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
		const userData = result.rows[0];
		if (!userData) return null;
		return this.userDto(userData);
	}

	async addUser(user) {
		const { id, firstName, lastName, username, phoneNumber, password, email, role } = user;
		const result = await this.db.query(
			`INSERT INTO users (id, first_name, last_name, username, phone_number, password, email, role)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
			[id, firstName, lastName, username, phoneNumber, password, email, role],
		);
		const userData = result.rows[0];
		if (!userData) return null;
		return this.userDto(userData);
	}

	async getByEmail(email) {
		const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
		const userData = result.rows[0];
		if (!userData) return null;
		return this.userDto(userData);
	}

	async getByUsername(username) {
		const result = await this.db.query('SELECT * FROM users WHERE username = $1', [username]);
		const userData = result.rows[0];
		if (!userData) return null;
		return this.userDto(userData);
	}

	async deleteUser(id) {
		await this.db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
	}

	async updateUser(userNewData) {
		const { id, firstName, lastName, username, phoneNumber } = userNewData;
		const result = await this.db.query(
			`UPDATE users
		 SET first_name = $1,
		     last_name = $2,
		     username = $3,
		     phone_number = $4
		 WHERE id = $5
		 `,
			[firstName, lastName, username, phoneNumber, id],
		);
		const userData = result.rows[0];
		if (!userData) return null;
		return this.userDto(userData);
	}

	userDto(userData) {
		return new User({
			id: userData.id,
			firstName: userData.first_name,
			lastName: userData.last_name,
			username: userData.username,
			phoneNumber: userData.phone_number,
			email: userData.email,
			password: userData.password,
			role: userData.role,
		});
	}
}

export default postgresUserRepository;
