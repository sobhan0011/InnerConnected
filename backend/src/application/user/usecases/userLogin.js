import serverConfig from '../../../../configs/serverConfig.js';
import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/errors.js';
import { validateUserLoginFields } from '../validators/userLoginValidator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserLogin {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute(email, password) {
		validateUserLoginFields(email);

		const existingUser = await this.userRepository.getByEmail(email);
		if (!existingUser) {
			throw new CustomError(ERROR_CODES.INVALID_EMAIL_OR_PASS);
		}

		const passwordIsCorrect = await bcrypt.compare(password, existingUser.password);
		if (!passwordIsCorrect) throw new CustomError(ERROR_CODES.INVALID_EMAIL_OR_PASS);
		const token = jwt.sign({ id: existingUser.id, role: existingUser.role }, serverConfig.JWT_SECRET, { expiresIn: '1h' });
		return token;
	}
}

export default UserLogin;
