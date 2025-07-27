import Post from '../../../../domain/post/post.js';

class postgresPostRepository {
	constructor({ db }) {
		this.db = db;
	}

	async getPosts(filter = {}) {
		const conditions = [];
		const values = [];
		let i = 1;

		if (filter.approved !== undefined) {
			conditions.push(`approved = $${i++}`);
			values.push(filter.approved);
		}

		if (filter.userId) {
			conditions.push(`user_id = $${i++}`);
			values.push(filter.userId);
		}

		if (filter.title) {
			conditions.push(`title ILIKE $${i++}`);
			values.push(`%${filter.title}%`);
		}

		if (filter.content) {
			conditions.push(`content ILIKE $${i++}`);
			values.push(`%${filter.content}%`);
		}

		if (filter.createdAfter) {
			conditions.push(`created_date >= $${i++}`);
			values.push(filter.createdAfter);
		}

		if (filter.createdBefore) {
			conditions.push(`created_date <= $${i++}`);
			values.push(filter.createdBefore);
		}

		let query = 'SELECT * FROM posts';
		if (conditions.length > 0) {
			query += ' WHERE ' + conditions.join(' AND ');
		}

		const result = await this.db.query(query, values);
		return result.rows.map((postData) => {
			return this.postDto(postData);
		});
	}

	async getPostById(id) {
		const result = await this.db.query('SELECT * FROM posts WHERE id = $1', [id]);
		const postData = result.rows[0];
		if (!postData) return null;
		return this.postDto(postData);
	}

	async addPost(post) {
		const { id, title, content, createdDate, approved, userId } = post;
		const result = await this.db.query(
			`INSERT INTO posts (id, title, content, created_date, approved, user_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
			[id, title, content, createdDate, approved, userId],
		);
		const postData = result.rows[0];
		if (!postData) return null;
		return this.postDto(postData);
	}

	async deletePost(id) {
		await this.db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
	}

	async updatePost(postNewData) {
		const { id, title, content } = postNewData;
		const result = await this.db.query(
			`UPDATE posts
		 SET title = $1,
		     content = $2
		 WHERE id = $3
		 `,
			[title, content, id],
		);
		const postData = result.rows[0];
		if (!postData) return null;
		return this.postDto(postData);
	}

	async updatePostApprovalStatus(postId, approved) {
		const result = await this.db.query(
			`UPDATE posts
     SET approved = $1
     WHERE id = $2
     RETURNING *`,
			[approved, postId],
		);

		const postData = result.rows[0];
		if (!postData) return null;

		return this.postDto(postData);
	}

	postDto(postData) {
		return new Post({
			id: postData.id,
			title: postData.title,
			content: postData.content,
			createdDate: postData.created_date,
			approved: postData.approved,
			userId: postData.user_id,
		});
	}
}

export default postgresPostRepository;
