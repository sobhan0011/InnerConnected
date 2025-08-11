import Joi from 'joi';
import UserRoles from '../../../src/domain/user/userRoles.js';

const nameRegex = /^[\p{L}\s]+$/u;
const phoneRegex = /^[0-9]{10,15}$/;

const role = Joi.string()
	.valid(...Object.values(UserRoles))
	.messages({
		'any.only': 'Invalid role.',
	});

const phoneNumber = Joi.string().pattern(phoneRegex).messages({
	'string.pattern.base': 'Phone number must be 10–15 digits.',
});

const username = Joi.string().alphanum().min(1).max(30).messages({
	'string.alphanum': 'Username must only contain letters and numbers.',
	'string.min': 'Username must be at least 1 characters long.',
	'string.max': 'Username must not exceed 30 characters.',
});

const nameField = Joi.string().pattern(nameRegex).min(2).max(50).messages({
	'string.pattern.base': 'Must contain only letters and spaces.',
	'string.min': 'Must be at least 2 characters.',
	'string.max': 'Must be at most 50 characters.',
});

const email = Joi.string().email().messages({
	'string.email': 'Email must be a valid email address.',
});

const password = Joi.string()
	.min(8)
	.max(128)
	.pattern(/[a-z]/, 'lowercase')
	.pattern(/[A-Z]/, 'uppercase')
	.pattern(/[0-9]/, 'number')
	.pattern(/[^a-zA-Z0-9]/, 'special')
	.required()
	.messages({
		'string.pattern.name': 'Password must include at least one {#name} character.',
	});

export const createUserSchema = Joi.object({
	firstName: nameField.required(),
	lastName: nameField.required(),
	username: username.required(),
	phoneNumber: phoneNumber.required(),
	email: email.required(),
	password: password.required(),
	role: role.required(),
});

export const updateUserSchema = Joi.object({
	firstName: nameField.optional(),
	lastName: nameField.optional(),
	username: username.optional(),
	phoneNumber: phoneNumber.optional(),
	email: email.optional(),
	password: password.optional(),
	role: role.optional(),
})
	.min(1)
	.messages({
		'object.min': 'At least one field must be provided.',
	});

export const userIdParamSchema = Joi.object({
	id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const getUsersFilterSchema = Joi.object({
	firstName: nameField.optional(),
	lastName: nameField.optional(),
	username: username.optional(),
	phoneNumber: phoneNumber.optional(),
	email: email.optional(),
	createdAfter: Joi.date().iso().optional(),
	createdBefore: Joi.date().iso().optional(),
	role: role.optional(),
});

export const updateMyAccountSchema = Joi.object({
	firstName: nameField.optional(),
	lastName: nameField.optional(),
	username: username.optional(),
})
	.min(1)
	.messages({
		'object.min': 'At least one field must be provided.',
	});
