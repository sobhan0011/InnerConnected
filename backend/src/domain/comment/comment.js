import { v4 as uuidv4 } from 'uuid';

class Comment {
	constructor({ id, content, createdDate, postId, userId }) {
		this.id = id;
		this.content = content;
		this.createdDate = createdDate;
		this.postId = postId;
		this.userId = userId;
	}

	static async create({ id = uuidv4(), content, createdDate = new Date(), postId, userId }) {
		return new Comment({
			id,
			content,
			createdDate,
			postId,
			userId,
		});
	}
}

export default Comment;
