import Post from '../../../../domain/post/post.js';
import User from '../../../../domain/user/user.js';

export function postWithUserDto(postUserData) {
	const post = new Post({
		id: postUserData.id,
		content: postUserData.content,
		createdDate: postUserData.created_date,
		userId: postUserData.user_id,
	});
	const user = new User({
		id: postUserData.user_id,
		firstName: postUserData.first_name,
		lastName: postUserData.last_name,
		username: postUserData.username,
		phoneNumber: postUserData.phone_number,
		email: postUserData.email,
		password: postUserData.password,
		createdAt: postUserData.created_at,
		role: postUserData.role,
		profileImage: postUserData.profile_image,
	});
	return { post, user };
}
