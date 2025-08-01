import { v4 as uuidv4 } from 'uuid';

class Post {
	constructor({ id, content, createdDate, userId }) {
		this.id = id;
		this.content = content;
		this.createdDate = createdDate;
		this.userId = userId;
	}

	static async create({ id = uuidv4(), content, createdDate = new Date(), userId }) {
		return new Post({
			id,
			content,
			createdDate: new Date(createdDate),
			userId,
		});
	}
}

export default Post;
