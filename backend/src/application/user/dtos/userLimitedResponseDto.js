export function UserLimitedResponseDto(user) {
	return {
		id: user.id,
		username: user.username,
		profileImage: user.profileImage,
	};
}
