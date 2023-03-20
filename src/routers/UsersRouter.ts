import express from 'express'

import { UsersController } from "../controllers/UsersController";
import { UsersBusiness } from "../business/UsersBusiness";
import { UsersDatabase } from "../database/UsersDatabase";
import { UsersDTO } from "../dtos/UsersDTO";

import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';

export const usersRouter = express.Router()

const usersController = new UsersController(
    new UsersBusiness(
        new UsersDTO(),
        new HashManager(),
        new UsersDatabase(),
        new TokenManager()
    ),
    new UsersDTO(),
    new IdGenerator()
)

usersRouter.post('/', usersController.createNewUser)
usersRouter.post('/login', usersController.loginUser)
usersRouter.delete('/delete', usersController.deleteUser)