import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { validateUserFields } from './userValidator.js';

class User {
	constructor({ id, firstName, lastName, username, phoneNumber, hashedPassword, email }) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.phoneNumber = phoneNumber;
		this.password = hashedPassword;
		this.email = email;
	}

	static async create({ id = uuidv4(), firstName, lastName, username, phoneNumber, password, email }) {
		validateUserFields({ firstName, lastName, username, phoneNumber, password, email });

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		return new User({
			id,
			firstName,
			lastName,
			username,
			phoneNumber,
			hashedPassword,
			email,
		});
	}

	async checkPassword(plainPassword) {
		return await bcrypt.compare(plainPassword, this.password);
	}
}

export default User;
