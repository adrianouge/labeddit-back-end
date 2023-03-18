import { BaseDatabase } from "./BaseDatabase";
import { postDB, likedPostDB, commentDB } from "../types";

export class PostsDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES = "likes"
    public static TABLE_COMMENTS = "comments"
    dbConnection = BaseDatabase.connection


    public async createNewPost(newPost: postDB) {

        await this.dbConnection(PostsDatabase.TABLE_POSTS)
            .insert(newPost)
    }

    public async editPost(postId: string, newContent: string) {

        await this.dbConnection(PostsDatabase.TABLE_POSTS)
            .insert(newContent)
            .where({ id: postId })
    }

    public async deletePost(postId: string) {

        await this.dbConnection(PostsDatabase.TABLE_POSTS)
            .del()
            .where({ id: postId })
    }


    public async getPost(postId: string) {

        const postFound = await this.dbConnection(PostsDatabase.TABLE_POSTS)
            .where({ id: postId })
        return postFound
    }

    public async getPosts() {

        const allPosts = await this.dbConnection(PostsDatabase.TABLE_POSTS)
        return allPosts
    }


    public async likePost(postToLike: postDB, userLikingId: string) {

        await this.dbConnection(PostsDatabase.TABLE_POSTS)
            .update({ ...postToLike, likes: postToLike.likes += 1 })
            .where({ id: postToLike.post_id })

        await this.dbConnection(PostsDatabase.TABLE_LIKES)
            .insert({ post_id: postToLike.post_id, user_id: userLikingId, liked: 1 })
    }

    public async findLikedPost(postId: string, userId: string) {

        const likedPost = await this.dbConnection(PostsDatabase.TABLE_LIKES)
            .where({ post_id: postId, user_id: userId })
        return likedPost
    }

    public async dislikePost(likedPost: likedPostDB, postToDislike: postDB) {

        await this.dbConnection(PostsDatabase.TABLE_POSTS)
            .update({ ...postToDislike, likes: postToDislike.likes -= 1 })
            .where({ id: postToDislike.post_id })

        await this.dbConnection(PostsDatabase.TABLE_LIKES)
            .update({ ...likedPost, liked: 0 })
            .where({ post_id: likedPost.post_id, user_id: likedPost.user_id })
    }



    public async createNewComment(newComment: commentDB) {
        await this.dbConnection(PostsDatabase.TABLE_COMMENTS)
            .insert(newComment)
    }

    public async editComment(editedComment: commentDB) {
        await this.dbConnection(PostsDatabase.TABLE_COMMENTS)
            .update(editedComment)
            .where({ comment_id: editedComment.comment_id })
    }

    public async deleteComment(commentId: string) {
        await this.dbConnection(PostsDatabase.TABLE_COMMENTS)
            .del()
            .where({ comment_id: commentId })
    }


    public async getComments(postId: string) {
        const allComments = await this.dbConnection(PostsDatabase.TABLE_COMMENTS)
            .where({ post_id: postId })
        return allComments
    }

    public async getComment(commentId: string) {
        const foundComment = await this.dbConnection(PostsDatabase.TABLE_COMMENTS)
            .where({ comment_id: commentId })
        return foundComment
    }


    public async likeComment(likedComment: commentDB) {
        await this.dbConnection(PostsDatabase.TABLE_COMMENTS)
            .update(likedComment)
            .where({ comment_id: likedComment.comment_id })
    }

    public async dislikeComment(dislikedComment: commentDB) {

        await this.dbConnection(PostsDatabase.TABLE_COMMENTS)
            .update(dislikedComment)
            .where({ comment_id: dislikedComment.comment_id })
    }
}