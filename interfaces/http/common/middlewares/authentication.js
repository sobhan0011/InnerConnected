import jwt from 'jsonwebtoken';

export function authentication(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.sendStatus(401);

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		next();
	} catch (err) {
		return res.status(403).json({ error: 'Invalid or expired token' });
	}
}
