import express from 'express';
import { makeInvoker } from 'awilix-express';
import { createCommentSchema, updateCommentSchema, commentIdParamSchema } from './commentValidators.js';
import { validate } from '../common/middlewares/validator.js';

function commentsRouter() {
	const router = express.Router();

	const api = makeInvoker((container) => {
		return container.commentController;
	});

	router.get('/comments/', api('getComments'));
	router.get('/comments/:id', validate(commentIdParamSchema, 'params'), api('getCommentById'));
	router.post('/comments/', validate(createCommentSchema, 'body'), api('addComment'));
	router.delete('/comments/:id', validate(commentIdParamSchema, 'params'), api('deleteComment'));
	router.put(
		'/comments/:id',
		validate(commentIdParamSchema, 'params'),
		validate(updateCommentSchema, 'body'),
		api('updateComment'),
	);

	return router;
}

export default commentsRouter;
