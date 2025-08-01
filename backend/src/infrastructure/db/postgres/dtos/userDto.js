import User from '../../../../domain/user/user.js';

export function userDto(userData) {
	return new User({
		id: userData.id,
		firstName: userData.first_name,
		lastName: userData.last_name,
		username: userData.username,
		phoneNumber: userData.phone_number,
		email: userData.email,
		password: userData.password,
		createdAt: userData.created_at,
		role: userData.role,
		profileImage: userData.profile_image,
	});
}
