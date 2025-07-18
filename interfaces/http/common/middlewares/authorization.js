export function authorization(allowedRoles, allowOwner = false) {
	return (req, res, next) => {
		const { user } = req;
		const { id } = req.params;

		const isAllowedRole = allowedRoles.includes(user.role);
		const isOwner = allowOwner && id === user.userId;

		if (!isAllowedRole && !isOwner) {
			return res.status(403).json({ error: 'Access denied' });
		}

		next();
	};
}
