import { commentDB, postDB } from "../types";
import { BadRequestError } from "../errors/BadRequestError";


export interface CreateNewPostInput {
    userToken: string,
    postId: string,
    content: string
}

export interface CreateNewPostOutput {
    message: string
}


export interface EditPostInput {
    userToken: string,
    postId: string,
    newContent: string
}

export interface EditPostOutput {
    message: string
}


export interface DeletePostInput {
    userToken: string,
    postId: string
}

export interface DeletePostOutput {
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
    allPosts: postDB[] | undefined
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



export interface CreateNewCommentInput {
    userToken: string,
    postId: string,
    commentId: string,
    content: string
}

export interface CreateNewCommentOutput {
    message: string
}


export interface EditCommentInput {
    userToken: string,
    commentId: string,
    newContent: string
}

export interface EditCommentOutput {
    message: string
}


export interface DeleteCommentInput {
    userToken: string,
    commentId: string
}

export interface DeleteCommentOutput {
    message: string
}


export interface GetCommentInput {
    userToken: string,
    commentId: string
}

export interface GetCommentOutput {
    foundComment: commentDB
}


export interface GetCommentsInput {
    userToken: string,
    postId: string
}

export interface GetCommentsOutput {
    allComments: commentDB[]
}


export interface LikeCommentInput {
    userToken: string,
    commentId: string
}

export interface LikeCommentOutput {
    message: string
}


export interface DislikeCommentInput {
    userToken: string,
    commentId: string
}

export interface DislikeCommentOutput {
    message: string
}



export class PostsDTO {

    public createNewPostInput(
        userToken: unknown,
        postId: unknown,
        content: unknown,
    ): CreateNewPostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
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


    public editPostInput(
        userToken: unknown,
        newContent: unknown,
        postId: unknown): EditPostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
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


    public deletePostInput(userToken: unknown, postId: unknown): DeletePostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
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


    public getPostsInput(userToken: unknown): GetPostsInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
        }

        const dto: GetPostsInput = { userToken }

        return dto
    }

    public getPostsOutput(allPosts: postDB[] | undefined): GetPostsOutput {
        const dto: GetPostsOutput = { allPosts }
        return dto
    }


    public getPostInput(userToken: unknown, postId: unknown): GetPostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
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


    public likePostInput(userToken: unknown, postId: unknown): LikePostInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
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
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
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



    public createNewCommentInput(userToken: unknown, postId: unknown, commentId: unknown, content: unknown): CreateNewCommentInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError("'id' do post a ser curtido deve ser do tipo 'string'.")
        }

        if (typeof commentId !== 'string') {
            throw new BadRequestError("'id' do comentário deve ser do tipo 'string'.")
        }

        if (typeof content !== 'string') {
            throw new BadRequestError("'content' deve ser do tipo 'string'.")
        }

        const dto: CreateNewCommentInput = {
            userToken,
            commentId,
            postId,
            content
        }

        return dto
    }

    public createNewCommentOutput(): CreateNewCommentOutput {
        const dto: CreateNewCommentOutput = {
            message: "Comentário criado com sucesso."
        }

        return dto
    }


    public editCommentInput(userToken: unknown, commentId: unknown, newContent: unknown): EditCommentInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
        }

        if (typeof commentId !== 'string') {
            throw new BadRequestError("'id' do comentário deve ser do tipo 'string'.")
        }

        if (typeof newContent !== 'string') {
            throw new BadRequestError("Novo 'content' do comentário deve ser do tipo 'string'.")
        }

        const dto: EditCommentInput = {
            userToken,
            commentId,
            newContent
        }

        return dto
    }

    public editCommentOutput(): EditCommentOutput {
        const dto: EditCommentOutput = {
            message: "Comentário foi editado com sucesso."
        }

        return dto
    }


    public deleteCommentInput(userToken: unknown, commentId: unknown): DeleteCommentInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
        }

        if (typeof commentId !== 'string') {
            throw new BadRequestError("'id' do comentário deve ser do tipo 'string'.")
        }

        const dto: DeleteCommentInput = {
            userToken,
            commentId
        }

        return dto
    }

    public deleteCommentOutput(): DeleteCommentOutput {
        const dto: DeleteCommentOutput = {
            message: "Comentário deletado com sucesso."
        }

        return dto
    }


    public getCommentInput(userToken: unknown, commentId: unknown): GetCommentInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
        }

        if (typeof commentId !== 'string') {
            throw new BadRequestError("'id' do comentário deve ser do tipo 'string'.")
        }

        const dto: GetCommentInput = {
            userToken,
            commentId
        }

        return dto
    }

    public getCommentOutput(foundComment: commentDB): GetCommentOutput {
        const dto: GetCommentOutput = {
            foundComment
        }

        return dto
    }


    public getCommentsInput(userToken: unknown, postId: unknown): GetCommentsInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError("'id' do post dos comentários deve ser do tipo 'string'.")
        }

        const dto: GetCommentsInput = {
            userToken,
            postId
        }

        return dto
    }

    public getCommentsOutput(allComments: commentDB[]): GetCommentsOutput {
        const dto: GetCommentsOutput = {
            allComments
        }

        return dto
    }


    public likeCommentInput(userToken: unknown, commentId: unknown): LikeCommentInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
        }

        if (typeof commentId !== 'string') {
            throw new BadRequestError("'id' do comentário deve ser do tipo 'string'.")
        }

        const dto: LikeCommentInput = {
            userToken, commentId
        }

        return dto
    }

    public likeCommentOutput(): LikeCommentOutput {

        const dto: LikeCommentOutput = {
            message: "Comentário curtido com sucesso."
        }

        return dto
    }


    public dislikeCommentInput(userToken: unknown, commentId: unknown): DislikeCommentInput {

        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token do usuário precisa ser do tipo 'string'.")
        }

        if (typeof commentId !== 'string') {
            throw new BadRequestError("'id' do comentário deve ser do tipo 'string'.")
        }

        const dto: DislikeCommentInput = {
            userToken, commentId
        }

        return dto
    }

    public dislikeCommentOutput(): DislikeCommentOutput {

        const dto: DislikeCommentOutput = {
            message: "Comentário descurtido com sucesso."
        }

        return dto
    }
}
