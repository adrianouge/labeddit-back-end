import { Request, Response } from "express";
import { PostsDTO } from "../dtos/PostsDTO";
import { PostsBusiness } from "../business/PostsBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { BaseError } from "../errors/BaseError";

export class PostsController {

    constructor(
        private postsDTO: PostsDTO,
        private postsBusiness: PostsBusiness,
        private idGenerator: IdGenerator,

    ) { }

    public createNewPost = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const postId = this.idGenerator.generate()
            const { content } = req.body
            const input = this.postsDTO.createNewPostInput(userToken, postId, content)
            const output = this.postsBusiness.createNewPost(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const postId = req.params.id
            const userToken = req.headers.authorization
            const { newContent } = req.body
            const input = this.postsDTO.editPostInput(userToken, newContent, postId)
            const output = this.postsBusiness.editPost(input)
            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

    public deletePost = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const postId = req.params.id
            const input = this.postsDTO.deletePostInput(userToken, postId)
            const output = this.postsBusiness.deletePost(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }


    public getPost = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const postId = req.params.id
            const input = this.postsDTO.getPostInput(userToken, postId)
            const output = this.postsBusiness.getPost(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

    public getPosts = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const input = this.postsDTO.getPostsInput(userToken)
            const output = this.postsBusiness.getPosts(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }


    public likePost = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const postId = req.params.id
            const input = this.postsDTO.likePostInput(userToken, postId)
            const output = this.postsBusiness.likePost(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

    public dislikePost = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const postId = req.params.id
            const input = this.postsDTO.dislikePostInput(userToken, postId)
            const output = this.postsBusiness.dislikePost(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }




    public createNewComment = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const postId = req.params.id
            const commentId = this.idGenerator.generate()
            const { content } = req.body
            const input = this.postsDTO.createNewCommentInput(userToken, postId, commentId, content)
            const output = this.postsBusiness.createNewComment(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

    public editComment = async (req: Request, res: Response) => {
        try {
            const commentId = req.body.comment_id
            const userToken = req.headers.authorization
            const { newContent } = req.body
            const input = this.postsDTO.editPostInput(userToken, newContent, commentId)
            const output = this.postsBusiness.editPost(input)
            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

    public deleteComment = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const postId = req.params.id
            const commentId = req.body.comment_id
            const input = this.postsDTO.deleteCommentInput(userToken, commentId)
            const output = this.postsBusiness.deleteComment(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }


    public getComment = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const commentId = req.body.comment_id
            const input = this.postsDTO.getCommentInput(userToken, commentId)
            const output = this.postsBusiness.getComment(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

    public getComments = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const postId = req.params.id
            const input = this.postsDTO.getCommentsInput(userToken, postId)
            const output = this.postsBusiness.getComments(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }


    public likeComment = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const commentId = req.body.comment_id
            const input = this.postsDTO.likePostInput(userToken, commentId)
            const output = this.postsBusiness.likePost(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

    public dislikeComment = async (req: Request, res: Response) => {

        try {
            const userToken = req.headers.authorization
            const commentId = req.body.comment_id
            const input = this.postsDTO.dislikeCommentInput(userToken, commentId)
            const output = this.postsBusiness.dislikeComment(input)

            res.status(200).send(output)
        }

        catch (error) {

            console.log(error)

            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Ocorreu um erro inesperado.") }
        }
    }

}
