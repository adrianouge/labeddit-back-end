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
postsRouter.get('/', postsController.getPosts)
postsRouter.get('/:id', postsController.getPost)
postsRouter.get('/:id', postsController.editPost)
postsRouter.post('/:id', postsController.likePost)
postsRouter.post('/:id', postsController.dislikePost)
postsRouter.delete('/id', postsController.deletePost)