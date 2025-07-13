import Joi from 'joi';

export const createCommentSchema = Joi.object({
	content: Joi.string().min(3).required(),
	postId: Joi.string().uuid({ version: 'uuidv4' }).required(),
	userId: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const updateCommentSchema = Joi.object({
	content: Joi.string().min(3).required(),
});

export const commentIdParamSchema = Joi.object({
	id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const getCommentsFilterSchema = Joi.object({
	userId: Joi.string().uuid().optional(),
	postId: Joi.string().uuid().optional(),
	content: Joi.string().min(1).optional(),
	createdAfter: Joi.date().iso().optional(),
	createdBefore: Joi.date().iso().optional(),
});
