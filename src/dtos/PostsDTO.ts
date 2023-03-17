import { postDB } from "../types";
import { Post } from "../models/Post";
import { BadRequestError } from "../errors/BadRequestError";


export interface CreateNewPostInput {
    userToken: string,
    postId: string,
    content: string
}

export interface CreateNewPostOutput {
    message: string
}


export interface GetPostInput {
    userToken: string,
    postId: string
}

export interface GetPostOutput {
    foundPost: postDB
}


export interface GetPostsInput {
    userToken: string
}

export interface GetPostsOutput {
    allPosts: postDB[]
}


export interface EditPostInput {
    userToken: string,
    postId: string,
    newContent: string
}

export interface EditPostOutput {
    message: string
}


export interface LikePostInput {
    userToken: string,
    postId: string
}

export interface LikePostOutput {
    message: string
}


export interface DislikePostInput {
    userToken: string,
    postId: string
}

export interface DislikePostOutput {
    message: string
}


export interface DeletePostInput {
    userToken: string,
    postId: string
}

export interface DeletePostOutput {
    message: string
}


export class PostsDTO {

    public createNewPostInput(
        userToken: unknown,
        postId: unknown,
        content: unknown,
    ): CreateNewPostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token inválido.")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError("'id' do post deve ser do tipo 'string'.")
        }

        if (typeof content !== 'string') {
            throw new BadRequestError("'content' de post deve ser do tipo 'string'.")
        }

        const dto: CreateNewPostInput = {
            userToken, postId, content
        }

        return dto
    }

    public createNewPostOutput(): CreateNewPostOutput {

        const dto: CreateNewPostOutput = {
            message: 'Post criado com sucesso.'
        }

        return dto
    }


    public getPostsInput(userToken: unknown): GetPostsInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token inválido.")
        }

        const dto: GetPostsInput = { userToken }
        
        return dto
    }

    public getPostsOutput(allPosts: postDB[]): GetPostsOutput {
        const dto: GetPostsOutput = { allPosts }
        return dto
    }


    public getPostInput(userToken: unknown, postId: unknown): GetPostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token inválido.")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError("'id' do post deve ser do tipo 'string'.")
        }

        const dto: GetPostInput = {
            userToken,
            postId
        }

        return dto
    }

    public getPostOutput(postFound: postDB) {
        const dto: GetPostOutput = {
            foundPost: postFound
        }

        return dto
    }


    public editPostInput(
        userToken: unknown,
        newContent: unknown,
        postId: unknown): EditPostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token inválido.")
        }

        if (typeof newContent !== 'string') {
            throw new BadRequestError("Novo conteúdo do post deve ser do tipo 'string'.")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError("'id' do post deve ser do tipo 'string'.")
        }

        const dto: EditPostInput = {
            userToken, postId, newContent
        }

        return dto
    }

    public editPostOutput(): EditPostOutput {
        const dto: EditPostOutput = {
            message: "Post editado com sucesso."
        }

        return dto
    }


    public likePostInput(userToken: unknown, postId: unknown): LikePostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token inválido.")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError("'id' do post deve ser do tipo 'string'.")
        }

        const dto: LikePostInput = {
            userToken, postId
        }

        return dto
    }

    public likePostOutput(): LikePostOutput {
        const dto: LikePostOutput = {
            message: "Post 'liked' com sucesso."
        }

        return dto
    }


    public dislikePostInput(userToken: unknown, postId: unknown): DislikePostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token inválido.")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError("'id' do post deve ser do tipo 'string'.")
        }

        const dto: DislikePostInput = {
            userToken, postId
        }

        return dto
    }

    public dislikePostOutput(): DislikePostOutput {
        const dto: DislikePostOutput = {
            message: "Post 'disliked' com sucesso."
        }

        return dto
    }


    public deletePostInput(userToken: unknown, postId: unknown): DeletePostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token inválido.")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError("'id' do post deve ser do tipo 'string'.")
        }

        const dto: DeletePostInput = {
            userToken, postId
        }

        return dto
    }

    public deletePostOutput(): DeletePostOutput {

        const dto: DeletePostOutput = {
            message: "Post deletado com sucesso."
        }

        return dto
    }
}