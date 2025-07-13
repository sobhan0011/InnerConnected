import Joi from 'joi';

export const createPostSchema = Joi.object({
	title: Joi.string().min(3).max(255).required(),
	content: Joi.string().min(10).required(),
	createdDate: Joi.date().optional(),
	approved: Joi.boolean().optional(),
	userId: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const updatePostSchema = Joi.object({
	title: Joi.string().min(3).max(255).required(),
	content: Joi.string().min(10).required(),
});

export const postIdParamSchema = Joi.object({
	id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const getPostsFilterSchema = Joi.object({
	approved: Joi.boolean().optional(),
	userId: Joi.string().uuid().optional(),
	title: Joi.string().min(1).optional(),
	content: Joi.string().min(1).optional(),
	createdAfter: Joi.date().iso().optional(),
	createdBefore: Joi.date().iso().optional(),
});
