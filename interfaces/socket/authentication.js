import jwt from 'jsonwebtoken';
import serverConfig from '../../configs/serverConfig.js';

export function authentication(socket, next) {
	const token = socket.handshake.auth?.token;
	if (!token) return next(new Error('Authentication error: token required'));

	try {
		const payload = jwt.verify(token, serverConfig.JWT_SECRET);
		socket.user = payload;
		next();
	} catch (err) {
		next(new Error('Authentication error: invalid token'));
	}
}
