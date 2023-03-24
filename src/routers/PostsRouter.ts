import express from 'express'

import { PostsController } from "../controllers/PostsController";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostsDatabase } from "../database/PostsDatabase";
import { PostsDTO } from "../dtos/PostsDTO";

import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';

export const postsRouter = express.Router()

const postsController = new PostsController(
    new PostsDTO(),
    new PostsBusiness(
        new PostsDTO(),
        new PostsDatabase(),
        new TokenManager()
    ),
    new IdGenerator()
)

postsRouter.post('/', postsController.createNewPost)
postsRouter.post('/:id/edit-post', postsController.editPost)
postsRouter.delete('/:id', postsController.deletePost)

postsRouter.get('/', postsController.getPosts)
postsRouter.get('/:id', postsController.getPost)

postsRouter.post('/:id/like', postsController.likePost)
postsRouter.post('/:id/dislike', postsController.dislikePost)


postsRouter.post('/:id/new-comment', postsController.createNewComment)
postsRouter.post('/:id/edit-comment', postsController.editComment)
postsRouter.delete('/:id/', postsController.deleteComment)

postsRouter.get('/:id/comments', postsController.getComments)
postsRouter.get('/:id/comment', postsController.getComment)

postsRouter.post('/:id/like-comment', postsController.likeComment)
postsRouter.post('/:id/dislike-comment', postsController.dislikeComment)
