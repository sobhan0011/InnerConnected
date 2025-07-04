import { v4 as uuidv4 } from 'uuid';
import { validatePostFields } from './postValidation.js';

class Post {
	constructor({ id, title, content, createdDate, approved, userId }) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.createdDate = createdDate;
		this.approved = approved;
		this.userId = userId;
	}

	static async create({ id = uuidv4(), title, content, createdDate = new Date(), approved = false, userId }) {
		validatePostFields({
			id,
			title,
			content,
			createdDate,
			approved,
			userId,
		});

		return new Post({
			id,
			title,
			content,
			createdDate: new Date(createdDate),
			approved,
			userId,
		});
	}
}

export default Post;
