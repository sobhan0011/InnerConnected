import { v4 as uuidv4 } from 'uuid';

class Chat {
	constructor({ id, user1Id, user2Id, createdAt }) {
		this.id = id;
		this.user1Id = user1Id;
		this.user2Id = user2Id;
		this.createdAt = createdAt;
	}

	static create(userIdA, userIdB) {
		if (userIdA === userIdB) throw new Error('Cannot chat with self');
		const [user1Id, user2Id] = [userIdA, userIdB].sort();
		return new Chat({ id: uuidv4(), user1Id, user2Id, createdAt: new Date() });
	}
}

export default Chat;
