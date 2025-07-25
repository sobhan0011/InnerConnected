import jwt from 'jsonwebtoken';
import serverConfig from '../../../../configs/serverConfig.js';

export function optionalAuthentication(req, res, next) {
	const authorizationHeader = req.headers.authorization;
	if (!authorizationHeader) return next();
	const token = authorization.split(' ')[1];
	try {
		const payload = jwt.verify(token, serverConfig.JWT_SECRET);
		req.user = payload;
	} catch (err) {}
	next();
}
