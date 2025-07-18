import AddUser from './addUser.js';
import GetUserById from './getUserById.js';
import GetUsers from './getUsers.js';
import DeleteUser from './deleteUser.js';
import UpdateUser from './updateUser.js';
import UserLogin from './userLogin.js';
import UserSignup from './userSignup.js';

class UserUsecaseRegistry {
	constructor({ userRepository }) {
		this.addUser = new AddUser(userRepository);
		this.deleteUser = new DeleteUser(userRepository);
		this.getUsers = new GetUsers(userRepository);
		this.getUserById = new GetUserById(userRepository);
		this.updateUser = new UpdateUser(userRepository);
		this.userLogin = new UserLogin(userRepository);
		this.userSignup = new UserSignup(userRepository);
	}
}

export default UserUsecaseRegistry;
