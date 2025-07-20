import jwt from 'jsonwebtoken';

export function authentication(req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) return res.sendStatus(401);
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		next();
	} catch (err) {
		return res.status(403).json({ error: 'Invalid or expired token' });
	}
}
