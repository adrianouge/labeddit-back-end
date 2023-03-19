import { BaseDatabase } from '../../src/database/BaseDatabase'
import { commentDB, likedPostDB, postDB } from '../../src/types'

export class PostsDatabaseMock extends BaseDatabase {

    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"
    public static TABLE_LIKES = "likes"
    public static TABLE_COMMENTS = "comments"

    dbConnection = BaseDatabase.connection

    public createNewPost = async (newPostMock: postDB): Promise<void> => {
    }

    public editPost = async (postIdMock: string, newContentMock: string): Promise<void> => {
    }

    public deletePost = async (postIdMock: string): Promise<void> => {
    }


    public getPost = async (postIdMock: string): Promise<[postDB] | [undefined]> => {

        if (postIdMock === "post-id-mock") {
            return [{
                post_id: "post-id-mock",
                creator_id: "user-id-mock",
                content: "conteúdo mockado",
                likes: 0,
                comments: 0,
                created_at: "data mockada",
                edited_at: "data mockada"
            }]
        }

        else {
            return [undefined]
        }
    }

    public getPosts = async (): Promise<[postDB[]]> => {

        return [[
            {
                post_id: "post-id-mock",
                creator_id: "user-id-mock",
                content: "conteúdo mockado",
                likes: 0,
                comments: 0,
                created_at: "data mockada",
                edited_at: "data mockada"
            },
            {
                post_id: "post-id-mock-1",
                creator_id: "user-id-mock-1",
                content: "conteúdo mockado-1",
                likes: 0 - 1,
                comments: 0 - 1,
                created_at: "data mockada-1",
                edited_at: "data mockada-1"
            }
        ]]
    }


    public likePost = async (postToLike: postDB, userIdMock: string): Promise<void> => {
    }

    public findLikedPost = async (postIdMock: string, userIdMock: string): Promise<[likedPostDB] | [undefined]> => {

        if (postIdMock === "post-id-mock" && userIdMock === "user-id-mock") {
            return [{
                post_id: "post-id-mock",
                user_id: "user-id-mock",
                liked: 1
            }]
        }

        else {
            return [undefined]
        }
    }

    public dislikePost = async (likedPost: likedPostDB, postToDislike: postDB): Promise<void> => {
    }



    public createNewComment = async (newCommentMock: commentDB): Promise<void> => {
    }

    public editComment = async (editedCommentMock: commentDB): Promise<void> => {
    }

    public deleteComment = async (commentIdMock: string): Promise<void> => {
    }


    public getComments = async (): Promise<[commentDB[]]> => {

        return [[
            {
                comment_id: "comment-id-mock",
                commenter_id: "user-id-mock",
                post_id: "post-id-mock",
                content: "conteúdo do comentário mockado",
                likes: 0,
                created_at: "data mockada",
                edited_at: "data mockada"
            },
            {
                comment_id: "comment-id-mock-1",
                commenter_id: "user-id-mock-1",
                post_id: "post-id-mock-1",
                content: "conteúdo do comentário mockado-1",
                likes: 0 - 1,
                created_at: "data mockada-1",
                edited_at: "data mockada-1"
            }
        ]]

    }

    public getComment = async (commentId: string): Promise<[commentDB] | [undefined]> => {

        if (commentId === "comment-id-mock") {
            return [{
                comment_id: "comment-id-mock",
                commenter_id: "user-id-mock",
                post_id: "post-id-mock",
                content: "conteúdo do comentário mockado",
                likes: 0,
                created_at: "data mockada",
                edited_at: "data mockada"
            }]
        }

        else {
            return [undefined]
        }
    }


    public likeComment = async (likeCommentMock: commentDB): Promise<void> => {
    }

    public dislikeComment = async (likeCommentMock: commentDB): Promise<void> => {
    }
}