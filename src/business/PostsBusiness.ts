import { PostsDatabase } from "../database/PostsDatabase";
import { postDB } from "../types";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CreateNewPostInput, DeletePostInput, DislikePostInput, EditPostInput, GetPostInput, GetPostsInput, LikePostInput, PostsDTO } from "../dtos/PostsDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

export class PostsBusiness {
    constructor(
        private postsDTO: PostsDTO,
        private postsDatabase: PostsDatabase,
        private tokenManager: TokenManager
    ) { }

    public createNewPost = async (input: CreateNewPostInput) => {
        const { userToken, postId, content } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [checkPostId] = await this.postsDatabase.getPost(input.postId)

        if (checkPostId) {
            throw new BadRequestError("Já existe um post com o 'id' informado.")
        }

        const newPost: postDB = {
            post_id: postId,
            creator_id: userPayLoad.id,
            content,
            created_at: new Date().toISOString(),
            edited_at: new Date().toISOString(),
            likes: 0,
            comments: 0
        }

        await this.postsDatabase.createNewPost(newPost)

        const output = this.postsDTO.createNewPostOutput()

        return output
    }

    public getPost = async (input: GetPostInput) => {
        const { userToken, postId } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [foundPost] = await this.postsDatabase.getPost(postId)

        if (!foundPost) {
            throw new NotFoundError("Não há posts com este 'id' no banco de dados.")
        }

        const output = this.postsDTO.getPostOutput(foundPost)

        return output
    }

    public getPosts = async (input: GetPostsInput) => {
        const { userToken } = input
        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const allPosts = await this.postsDatabase.getPosts()

        const output = this.postsDTO.getPostsOutput(allPosts)
        return output
    }

    public editPost = async (input: EditPostInput) => {
        const { userToken, postId, newContent } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [postFoundToEdit] = await this.postsDatabase.getPost(postId)

        if (!postFoundToEdit) {
            throw new NotFoundError("Não há posts com o 'id' inserido.")
        }

        await this.postsDatabase.editPost(postId, newContent)

        const output = this.postsDTO.editPostOutput()

        return output
    }

    public likePost = async (input: LikePostInput) => {
        const { userToken, postId } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [foundPost] = await this.postsDatabase.getPost(postId)

        if (!foundPost) {
            throw new NotFoundError("Não há posts com este 'id' no banco de dados.")
        }

        await this.postsDatabase.likePost(foundPost, userPayLoad.id)

        const output = this.postsDTO.likePostOutput()

        return output
    }

    public dislikePost = async (input: DislikePostInput) => {
        const { userToken, postId } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [foundPost] = await this.postsDatabase.getPost(postId)

        if (!foundPost) {
            throw new NotFoundError("Não há posts com este 'id' no banco de dados.")
        }

        const [foundLikedPost] = await this.postsDatabase.findLikedPost(postId, userPayLoad.id)

        if (!foundLikedPost) {
            throw new NotFoundError("O usuário ainda não deu 'like' no post para poder dar 'dislike'.")
        }

        await this.postsDatabase.dislikePost(foundLikedPost, foundPost)

        const output = this.postsDTO.dislikePostOutput()

        return output
    }

    public deletePost = async (input: DeletePostInput) => {

        const { userToken, postId } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [foundPost] = await this.postsDatabase.getPost(postId)

        if (!foundPost) {
            throw new NotFoundError("Não há posts com este 'id' no banco de dados.")
        }

        await this.postsDatabase.deletePost(postId)

        const output = this.postsDTO.deletePostOutput()

        return output
    }
}