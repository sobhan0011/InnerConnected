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

		if (filter.phoneNumber) {
			conditions.push(`phone_number = $${i++}`);
			values.push(filter.phoneNumber);
		}

		if (filter.role) {
			conditions.push(`role = $${i++}`);
			values.push(filter.role);
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
		const { id, firstName, lastName, username, phoneNumber, password, email, role, createdAt } = user;
		const result = await this.db.query(
			`INSERT INTO users (id, first_name, last_name, username, phone_number, password, email, role, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
			[id, firstName, lastName, username, phoneNumber, password, email, role, createdAt],
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

	async updateUser(userData) {
		const allowedFields = ['firstName', 'lastName', 'username', 'phoneNumber', 'email', 'password', 'role'];
		const updates = [];
		const values = [];

		let index = 1;

		for (const field of allowedFields) {
			if (userData[field] !== undefined) {
				updates.push(`${this.toSnakeCase(field)} = $${index}`);
				values.push(userData[field]);
				index++;
			}
		}

		if (updates.length === 0) {
			throw new Error('No valid fields provided for update.');
		}

		values.push(userData.id);
		const updateQuery = `
		UPDATE users
		SET ${updates.join(', ')}
		WHERE id = $${index}
		RETURNING *;
	`;

		const result = await this.db.query(updateQuery, values);
		return result.rows[0] ? this.userDto(result.rows[0]) : null;
	}

	async updateUserProfileImage(userId, filePath) {
		const query = 'UPDATE users SET profile_image = $1 WHERE id = $2 RETURNING *';
		const result = await this.db.query(query, [filePath, userId]);
		return result.rows[0] ? this.userDto(result.rows[0]) : null;
	}

	toSnakeCase(str) {
		return str.replace(/[A-Z]/g, (letter) => {
			return `_${letter.toLowerCase()}`;
		});
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
			createdAt: userData.created_at,
			role: userData.role,
			profileImage: userData.profile_image,
		});
	}
}

export default postgresUserRepository;
