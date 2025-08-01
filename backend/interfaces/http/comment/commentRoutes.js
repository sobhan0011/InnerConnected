import express from 'express';
import { makeInvoker } from 'awilix-express';
import { createCommentSchema, updateCommentSchema, commentIdParamSchema, getCommentsFilterSchema } from './commentValidators.js';
import { validate } from '../common/middlewares/validator.js';
import { optionalAuthentication } from '../common/middlewares/optionalAuthentication.js';
import { authentication } from '../common/middlewares/authentication.js';
import { authorization } from '../common/middlewares/authorization.js';
import UserRoles from './../../../src/domain/user/userRoles.js';

function commentsRouter() {
	const router = express.Router();

	const api = makeInvoker((container) => {
		return container.commentController;
	});

	router.get('/comments/', validate(getCommentsFilterSchema, 'query'), optionalAuthentication, api('getComments'));
	router.get('/comments/:id', validate(commentIdParamSchema, 'params'), optionalAuthentication, api('getCommentById'));
	router.post('/comments/', validate(createCommentSchema, 'body'), authentication, api('addComment'));
	router.delete('/comments/:id', validate(commentIdParamSchema, 'params'), authentication, api('deleteComment'));
	router.patch(
		'/comments/:id',
		validate(commentIdParamSchema, 'params'),
		validate(updateCommentSchema, 'body'),
		authentication,
		api('updateComment'),
	);
	return router;
}

export default commentsRouter;
