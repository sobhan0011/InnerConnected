import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

class User {
	constructor({ id, firstName, lastName, username, phoneNumber, password, email }) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.phoneNumber = phoneNumber;
		this.password = password;
		this.email = email;
	}

	static async create({ id = uuidv4(), firstName, lastName, username, phoneNumber, password, email }) {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		return new User({
			id,
			firstName,
			lastName,
			username,
			phoneNumber,
			password: hashedPassword,
			email,
		});
	}
}

export default User;
