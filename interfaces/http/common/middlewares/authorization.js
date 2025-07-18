export function authorization(allowedRoles, allowOwner = false) {
	return (req, res, next) => {
		const { user } = req;
		const paramId = req.params.id;

		const isAllowedRole = allowedRoles.includes(user.role);
		const isOwner = allowOwner && (!paramId || paramId === user.id);

		if (!isAllowedRole && !isOwner) {
			return res.status(403).json({ error: 'Access denied' });
		}

		next();
	};
}
