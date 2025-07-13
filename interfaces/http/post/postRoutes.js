import express from 'express';
import { makeInvoker } from 'awilix-express';
import { createPostSchema, updatePostSchema, postIdParamSchema, getPostsFilterSchema } from './postValidators.js';
import { validate } from '../common/middlewares/validator.js';

function postsRouter() {
	const router = express.Router();

	const api = makeInvoker((container) => {
		return container.postController;
	});

	router.get('/posts/',  validate(getPostsFilterSchema, 'query'), api('getPosts'));
	router.get('/posts/:id', validate(postIdParamSchema, 'params'), api('getPostById'));
	router.post('/posts/', validate(createPostSchema, 'body'), api('addPost'));
	router.delete('/posts/:id', validate(postIdParamSchema, 'params'), api('deletePost'));
	router.patch('/posts/:id', validate(postIdParamSchema, 'params'), validate(updatePostSchema, 'body'), api('updatePost'));

	return router;
}

export default postsRouter;
