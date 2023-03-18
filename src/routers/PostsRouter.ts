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
postsRouter.get('/:id', postsController.editPost)
postsRouter.delete('/id', postsController.deletePost)

postsRouter.get('/', postsController.getPosts)
postsRouter.get('/:id', postsController.getPost)

postsRouter.post('/:id', postsController.likePost)
postsRouter.post('/:id', postsController.dislikePost)


postsRouter.post('/:id', postsController.createNewComment)
postsRouter.post('/:id', postsController.editComment)
postsRouter.delete('/:id', postsController.deleteComment)

postsRouter.get('/:id', postsController.getComments)
postsRouter.get('/:id', postsController.getComment)

postsRouter.post('/:id', postsController.likeComment)
postsRouter.post('/:id', postsController.dislikeComment)