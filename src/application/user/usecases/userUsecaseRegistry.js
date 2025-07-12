import AddUser from './addUser.js';
import GetUserById from './getUserById.js';
import GetUsers from './getUsers.js';
import DeleteUser from './deleteUser.js';
import UpdateUser from './updateUser.js';

class UserUsecaseRegistry {
	constructor({ userRepository }) {
		this.addUser = new AddUser(userRepository);
		this.deleteUser = new DeleteUser(userRepository);
		this.getUsers = new GetUsers(userRepository);
		this.getUserById = new GetUserById(userRepository);
		this.updateUser = new UpdateUser(userRepository);
	}
}

export default UserUsecaseRegistry;
