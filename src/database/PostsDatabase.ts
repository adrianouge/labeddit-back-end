import { BaseDatabase } from "./BaseDatabase";
import { postDB, likedPostDB } from "../types";

export class PostsDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES = "likes"
    dbConnection = BaseDatabase.connection



    public async getPosts() {

        const allPosts = await this.dbConnection(PostsDatabase.TABLE_POSTS)
        return allPosts
    }


    public async createNewPost(newPost: postDB) {

        await this.dbConnection(PostsDatabase.TABLE_POSTS)
            .insert(newPost)
    }


    public async getPost(postId: string) {

        const postFound = await this.dbConnection(PostsDatabase.TABLE_POSTS)
            .where({ id: postId })
        return postFound
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
}