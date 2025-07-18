import { v4 as uuidv4 } from 'uuid';

class Comment {
	constructor({ id, content, createdDate, postId, userId, approved }) {
		this.id = id;
		this.content = content;
		this.createdDate = createdDate;
		this.postId = postId;
		this.userId = userId;
		this.approved = approved;
	}

	static async create({ id = uuidv4(), content, createdDate = new Date(), postId, userId, approved = false }) {
		return new Comment({
			id,
			content,
			createdDate,
			postId,
			userId,
			approved,
		});
	}
}

export default Comment;
