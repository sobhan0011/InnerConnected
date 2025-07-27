export function validate(schema, property = 'body') {
	return (req, res, next) => {
		const data = req[property];

		if (data === undefined || data === null) {
			return res.status(400).json({
				error: 'Validation failed',
				details: `No ${property} provided.`,
			});
		}

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
