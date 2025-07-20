import jwt from 'jsonwebtoken';

export function optionalAuthentication(req, res, next) {
	const authorizationHeader = req.headers.authorization;
	if (!authorizationHeader) return next();
	const token = authorization.split(' ')[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
	} catch (err) {}
	next();
}
