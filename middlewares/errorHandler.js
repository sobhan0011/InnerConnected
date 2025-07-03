export default (err, req, res, next) => {
	console.error('🚨', err.stack);

	const statusCode = err.statusCode || 500;
	const message = statusCode === 500 ? 'Internal Server Error' : err.message;

	res.status(statusCode).json({
		error: {
			message,
			...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
		},
	});
};
