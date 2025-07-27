export function UserResponseDto(user) {
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		phoneNumber: user.phoneNumber,
		email: user.email,
		createdAt: user.createdAt,
		role: user.role,
		profileImage: user.profileImage,
	};
}
