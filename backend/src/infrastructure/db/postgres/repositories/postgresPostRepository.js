import { postDto } from '../dtos/postDto.js';
import { postWithUserDto } from '../dtos/postWithUserDto.js';

class postgresPostRepository {
	constructor({ db }) {
		this.db = db;
	}

	filterBuilder(filter) {
		const conditions = [];
		const values = [];
		let i = 1;

		if (filter.userId) {
			conditions.push(`user_id = $${i++}`);
			values.push(filter.userId);
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
		return { conditions, values };
	}

	async getPosts(filter = {}) {
		const { conditions, values } = this.filterBuilder(filter);
		let query = 'SELECT * FROM posts';
		if (conditions.length > 0) {
			query += ' WHERE ' + conditions.join(' AND ');
		}

		const result = await this.db.query(query, values);
		return result.rows.map((postData) => {
			return postDto(postData);
		});
	}

	async getPostsWithUser(filter = {}) {
		let query = `
        SELECT posts.*,
				users.id AS user_id, users.first_name, users.last_name, users.username, users.email,
				users.phone_number, users.password, users.created_at, users.role, users.profile_image
        FROM posts
        JOIN users ON posts.user_id = users.id
    `;

		const { conditions, values } = this.filterBuilder(filter);
		if (conditions.length > 0) {
			query += ' WHERE ' + conditions.join(' AND ');
		}

		query += ' ORDER BY posts.created_date DESC';

		const result = await this.db.query(query, values);
		return result.rows.map((postWithUserData) => {
			return postWithUserDto(postWithUserData);
		});
	}

	async getPostById(id) {
		const result = await this.db.query('SELECT * FROM posts WHERE id = $1', [id]);
		const postData = result.rows[0];
		if (!postData) return null;
		return postDto(postData);
	}

	async addPost(post) {
		const { id, content, createdDate, userId } = post;
		const result = await this.db.query(
			`INSERT INTO posts (id, content, created_date, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
			[id, content, createdDate, userId],
		);
		const postData = result.rows[0];
		if (!postData) return null;
		return postDto(postData);
	}

	async deletePost(id) {
		await this.db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
	}

	async updatePost(postNewData) {
		const { id, content } = postNewData;
		const result = await this.db.query(
			`UPDATE posts
		 SET content = $1
		 WHERE id = $2
		 `,
			[content, id],
		);
		const postData = result.rows[0];
		if (!postData) return null;
		return postDto(postData);
	}
}

export default postgresPostRepository;
