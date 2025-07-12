import Post from '../../../domain/post/post.js';
import { validateCreatePostFields } from '../validators/postCreateValidator.js';
import { PostResponseDto } from '../dtos/postResponseDto.js';
import { CustomError } from '../../../../errors/customError.js';
import { ERROR_CODES } from '../../../../errors/erros.js';

class AddPost {
	constructor(postRepository, userRepository) {
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}

	async execute(postData) {
		validateCreatePostFields(postData);
		const user = await this.userRepository.getUserById(postData.userId);
		if (!user) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);
		const post = await Post.create(postData);
		await this.postRepository.addPost(post);
		return PostResponseDto(post);
	}
}

export default AddPost;
