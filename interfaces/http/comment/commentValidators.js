import Joi from 'joi';

export const createCommentSchema = Joi.object({
	name: Joi.string().min(1).max(255).required(),
	email: Joi.string().email().required(),
});

export const updateCommentSchema = Joi.object({
	name: Joi.string().min(1).max(255).optional(),
	email: Joi.string().email().optional(),
});

export const commentIdParamSchema = Joi.object({
	id: Joi.number().integer().min(1).required(),
});
