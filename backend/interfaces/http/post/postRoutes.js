import express from 'express';
import { makeInvoker } from 'awilix-express';
import { createPostSchema, updatePostSchema, postIdParamSchema, getPostsFilterSchema } from './postValidators.js';
import { validate } from '../common/middlewares/validator.js';
import { optionalAuthentication } from '../common/middlewares/optionalAuthentication.js';
import { authorization } from '../common/middlewares/authorization.js';
import { authentication } from '../common/middlewares/authentication.js';
import UserRoles from '../../../src/domain/user/userRoles.js';

function postsRouter() {
	const router = express.Router();

	const api = makeInvoker((container) => {
		return container.postController;
	});

	router.get('/posts/', validate(getPostsFilterSchema, 'query'), optionalAuthentication, api('getPosts'));
	router.get('/posts/:id', validate(postIdParamSchema, 'params'), optionalAuthentication, api('getPostById'));
	router.post('/posts/', validate(createPostSchema, 'body'), authentication, api('addPost'));
	router.delete('/posts/:id', validate(postIdParamSchema, 'params'), authentication, api('deletePost'));
	router.patch(
		'/posts/:id',
		validate(postIdParamSchema, 'params'),
		validate(updatePostSchema, 'body'),
		authentication,
		api('updatePost'),
	);
	router.patch(
		'/posts/:id/approve',
		validate(postIdParamSchema, 'params'),
		authentication,
		authorization([UserRoles.ADMIN]),
		api('approvePost'),
	);
	router.patch(
		'/posts/:id/reject',
		validate(postIdParamSchema, 'params'),
		authentication,
		authorization([UserRoles.ADMIN]),
		api('rejectPost'),
	);
	return router;
}

export default postsRouter;
