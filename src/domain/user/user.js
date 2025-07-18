import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import UserRoles from './userRoles.js';

class User {
	constructor({ id, firstName, lastName, username, phoneNumber, password, email, role, createdAt }) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.phoneNumber = phoneNumber;
		this.password = password;
		this.email = email;
		this.role = role;
		this.createdAt = createdAt;
	}

	static async create({
		id = uuidv4(),
		firstName,
		lastName,
		username,
		phoneNumber,
		password,
		email,
		role = UserRoles.USER,
		createdAt = new Date(),
	}) {
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
			role,
			createdAt,
		});
	}
}

export default User;
