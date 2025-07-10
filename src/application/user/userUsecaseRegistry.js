import AddUser from './addUser.js';
import GetUserById from './getUserById.js';
import GetUsers from './getUsers.js';
import DeleteUser from './deleteUser.js';
import UpdateUser from './updateUser.js';
import GetUserComments from './getUserComments.js';
import GetUserPosts from './getUserPosts.js';

class UserUsecaseRegistry {
	constructor({ userRepository }) {
		this.addUser = new AddUser(userRepository);
		this.deleteUser = new DeleteUser(userRepository);
		this.getUsers = new GetUsers(userRepository);
		this.getUserById = new GetUserById(userRepository);
		this.updateUser = new UpdateUser(userRepository);
		this.getUserComments = new GetUserComments(userRepository);
		this.getUserPosts = new GetUserPosts(userRepository);
	}
}

export default UserUsecaseRegistry;
