import { PostsDatabase } from "../database/PostsDatabase";
import { commentDB, postDB } from "../types";
import { TokenManager } from "../services/TokenManager";
import { CreateNewCommentInput, CreateNewPostInput, DeleteCommentInput, DeletePostInput, DislikeCommentInput, DislikePostInput, EditCommentInput, EditPostInput, GetCommentInput, GetCommentsInput, GetPostInput, GetPostsInput, LikeCommentInput, LikePostInput, PostsDTO } from "../dtos/PostsDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

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

        return allPosts
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



    public createNewComment = async (input: CreateNewCommentInput) => {

        const { userToken, postId, commentId, content } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [checkCommentId] = await this.postsDatabase.getComment(commentId)

        if (checkCommentId) {
            throw new BadRequestError("Já existe um comentário com o 'id' inserido.")
        }

        const newComment: commentDB = {
            comment_id: commentId,
            commenter_id: userPayLoad.id,
            post_id: postId,
            content,
            likes: 0,
            created_at: new Date().toISOString(),
            edited_at: new Date().toISOString()
        }

        await this.postsDatabase.createNewComment(newComment)

        const output = this.postsDTO.createNewCommentOutput()
        return output
    }

    public editComment = async (input: EditCommentInput) => {

        const { userToken, commentId, newContent } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [commentToEdit] = await this.postsDatabase.getComment(commentId)

        if (!commentToEdit) {
            throw new NotFoundError("Comentário para ser editado não encontrado com 'id' informado.")
        }

        if (commentToEdit.commenter_id !== userPayLoad.id) {
            throw new UnauthorizedError("Apenas o criador do comentário pode editar o mesmo.")
        }

        const editedComment: commentDB = {
            comment_id: commentToEdit.comment_id,
            commenter_id: commentToEdit.commenter_id,
            post_id: commentToEdit.post_id,
            content: newContent,
            likes: commentToEdit.likes,
            created_at: commentToEdit.created_at,
            edited_at: new Date().toISOString()
        }

        await this.postsDatabase.editComment(editedComment)

        const output = this.postsDTO.editCommentOutput()
        return output
    }

    public deleteComment = async (input: DeleteCommentInput) => {

        const { userToken, commentId } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [commentToDelete] = await this.postsDatabase.getComment(commentId)

        if (!commentToDelete) {
            throw new NotFoundError("Comentário para deleção com 'id' informado não encontrado.")
        }

        if (commentToDelete.commenter_id !== userPayLoad.id) {
            throw new UnauthorizedError("Apenas o criador do comentário pode deletar o mesmo.")
        }

        await this.postsDatabase.deleteComment(commentId)

        const output = this.postsDTO.deleteCommentOutput()
        return output
    }


    public getComments = async (input: GetCommentsInput) => {
        const { userToken, postId } = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [postComments] = await this.postsDatabase.getComments(postId)

        if (!postComments) {
            throw new NotFoundError("Não há comentários neste post.")
        }

        const output = this.postsDTO.getCommentsOutput(postComments)
        return output
    }

    public getComment = async (input: GetCommentInput) => {

        const { userToken, commentId} = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [commentFound] = await this.postsDatabase.getComment(commentId)

        if (!commentFound) {
            throw new NotFoundError("Comentário não encontrado com 'id' informado.")
        }

        const output = this.postsDTO.getCommentOutput(commentFound)
        return output
    }


    public likeComment = async (input: LikeCommentInput) => {

        const { userToken, commentId} = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [commentToLike] = await this.postsDatabase.getComment(commentId)

        if (!commentToLike) {
            throw new NotFoundError("Comentário para curtir não encontrado com o 'id' informado.")
        }

        const commentLiked: commentDB = {
            comment_id: commentToLike.comment_id,
            commenter_id: commentToLike.commenter_id,
            post_id: commentToLike.post_id,
            content: commentToLike.content,
            likes: commentToLike.likes +=1,
            created_at: commentToLike.created_at,
            edited_at: commentToLike.edited_at
        }

        await this.postsDatabase.likeComment(commentLiked)

        const output = this.postsDTO.likeCommentOutput()
        return output
    }

    public dislikeComment = async(input: DislikeCommentInput) => {
        const {userToken, commentId} = input

        const userPayLoad = this.tokenManager.getPayload(userToken)

        if (!userPayLoad) {
            throw new BadRequestError("Token inválido.")
        }

        const [commentToDislike] = await this.postsDatabase.getComment(commentId)

        if (!commentToDislike) {
            throw new NotFoundError("Comentário para descurtir não encontrado com o 'id' informado.")
        }

        const commentDisliked: commentDB = {
            comment_id: commentToDislike.comment_id,
            commenter_id: commentToDislike.commenter_id,
            post_id: commentToDislike.post_id,
            content: commentToDislike.content,
            likes: commentToDislike.likes -=1,
            created_at: commentToDislike.created_at,
            edited_at: commentToDislike.edited_at
        }

        await this.postsDatabase.dislikeComment(commentDisliked)

        const output = this.postsDTO.dislikeCommentOutput()
        return output
    }
}