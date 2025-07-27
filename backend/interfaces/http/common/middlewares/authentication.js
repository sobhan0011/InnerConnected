import jwt from 'jsonwebtoken';
import serverConfig from '../../../../configs/serverConfig.js';

export function authentication(req, res, next) {
	const authorizationHeader = req.headers.authorization;
	if (!authorizationHeader) return res.sendStatus(401);
	const token = authorizationHeader.split(' ')[1];
	try {
		const payload = jwt.verify(token, serverConfig.JWT_SECRET);
		req.user = payload;
		next();
	} catch (err) {
		return res.status(403).json({ error: 'Invalid or expired token' });
	}
}
