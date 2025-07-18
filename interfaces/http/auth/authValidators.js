import Joi from 'joi';

const nameRegex = /^[\p{L}\s]+$/u;
const phoneRegex = /^[0-9]{10,15}$/;

const nameField = Joi.string().pattern(nameRegex).min(2).max(50).messages({
	'string.pattern.base': 'Must contain only letters and spaces.',
	'string.min': 'Must be at least 2 characters long.',
	'string.max': 'Must not exceed 50 characters.',
});

const username = Joi.string().alphanum().min(3).max(30).messages({
	'string.alphanum': 'Username must only contain letters and numbers.',
	'string.min': 'Username must be at least 3 characters long.',
	'string.max': 'Username must not exceed 30 characters.',
});

const phoneNumber = Joi.string().pattern(phoneRegex).messages({
	'string.pattern.base': 'Phone number must be between 10 and 15 digits.',
});

const password = Joi.string()
	.min(8)
	.max(128)
	.pattern(/[a-z]/, 'lowercase')
	.pattern(/[A-Z]/, 'uppercase')
	.pattern(/[0-9]/, 'number')
	.pattern(/[^a-zA-Z0-9]/, 'special')
	.messages({
		'string.pattern.name': 'Password must include at least one {#name} character.',
		'string.min': 'Password must be at least 8 characters long.',
		'string.max': 'Password must not exceed 128 characters.',
	});

const email = Joi.string().email().messages({
	'string.email': 'Email must be a valid email address.',
});

export const userSignupSchema = Joi.object({
	firstName: nameField.required(),
	lastName: nameField.required(),
	username: username.required(),
	phoneNumber: phoneNumber.required(),
	password: password.required(),
	email: email.required(),
});

export const userLoginSchema = Joi.object({
	email: email.required(),
	password: password.required(),
});
