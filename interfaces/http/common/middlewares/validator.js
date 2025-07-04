export function validate(schema, property) {
	return (req, res, next) => {
		const data = req[property];
		const { error } = schema.validate(data, { abortEarly: false });
		if (error) {
			return res.status(400).json({
				error: 'Validation failed',
				details: error.details.map((d) => {
					return d.message;
				}),
			});
		}
		next();
	};
}
