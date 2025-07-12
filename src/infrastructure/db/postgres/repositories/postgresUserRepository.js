import User from '../../../../domain/user/user.js';

class postgresUserRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getAllUsers() {
		const result = await this.db.query('SELECT * FROM users');
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
		const { id, firstName, lastName, username, phoneNumber, password, email } = user;
		const result = await this.db.query(
			`INSERT INTO users (id, first_name, last_name, username, phone_number, password, email)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
			[id, firstName, lastName, username, phoneNumber, password, email],
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
		});
	}
}

export default postgresUserRepository;
