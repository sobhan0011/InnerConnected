export function authorization(allowedRoles) {
	return (req, res, next) => {
		const { user } = req;
		const isAllowedRole = allowedRoles.includes(user.role);
		if (!isAllowedRole) {
			return res.status(403).json({ error: 'Access denied' });
		}
		next();
	};
}
