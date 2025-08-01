export default (err, req, res, next) => {
	const statusCode = err.status || 500;
	res.status(statusCode).json({
		code: err.code || 'INTERNAL_SERVER_ERROR',
		en_message: err.en_message || 'Something went wrong',
		fa_message: err.fa_message || 'خطای نامشخص',
		details: err.details || null,
	});
};
