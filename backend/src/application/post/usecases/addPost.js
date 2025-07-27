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

	async execute(postData, requester) {
		validateCreatePostFields(postData);
		const postOwner = await this.userRepository.getUserById(postData.userId);
		if (!postOwner) throw new CustomError(ERROR_CODES.USER_NOT_FOUND);

		const requesterOwnsPost = postData.userId === requester.id;
		const postOwnerIsAdmin = postOwner.role === UserRoles.ADMIN;
		const requesterIsAdmin = requester.role === UserRoles.ADMIN;
		if (!requesterOwnsPost && (postOwnerIsAdmin || !requesterIsAdmin)) {
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		}
		if (!requesterIsAdmin && postData.approved) {
			throw new CustomError(ERROR_CODES.UNAUTHORIZED);
		}

		const post = await Post.create(postData);
		await this.postRepository.addPost(post);
		return PostResponseDto(post);
	}
}

export default AddPost;
