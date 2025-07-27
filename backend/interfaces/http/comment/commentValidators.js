import Joi from 'joi';

const approved = Joi.bool();
const content = Joi.string().min(3);
const uuid = Joi.string().uuid({ version: 'uuidv4' });

export const createCommentSchema = Joi.object({
	content: content.required(),
	postId: Joi.string().uuid({ version: 'uuidv4' }).required(),
	userId: Joi.string().uuid({ version: 'uuidv4' }).optional(),
	approved: approved.optional(),
});

export const updateCommentSchema = Joi.object({
	content: content.optional(),
	postId: uuid.optional(),
	userId: uuid.optional(),
	approved: approved.optional(),
})
	.min(1)
	.messages({
		'object.min': 'At least one field must be provided.',
	});

export const commentIdParamSchema = Joi.object({
	id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const getCommentsFilterSchema = Joi.object({
	content: content.optional(),
	postId: uuid.optional(),
	userId: uuid.optional(),
	approved: approved.optional(),
	createdAfter: Joi.date().iso().optional(),
	createdBefore: Joi.date().iso().optional(),
});
