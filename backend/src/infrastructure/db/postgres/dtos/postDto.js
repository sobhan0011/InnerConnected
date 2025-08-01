import Post from '../../../../domain/post/post.js';

export function postDto(postData) {
	return new Post({
		id: postData.id,
		content: postData.content,
		createdDate: postData.created_date,
		userId: postData.user_id,
	});
}
