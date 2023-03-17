import { BadRequestError } from "../errors/BadRequestError";
import { userDB } from "../types";
import { User } from "../models/User";
import { NotFoundError } from "../errors/NotFoundError";


export interface CreateNewUserInput {
    id: string,
    name: string,
    email: string,
    password: string
}

export interface CreateNewUserOutput {
    message: string,
    userToken: string
}


export interface LoginUserInput {
    email: string,
    password: string
}

export interface LoginuserOutput {
    message: string,
    userToken: string
}


export interface DeleteUserInput {
    userToken: string
}

export interface DeleteUserOutput {
    message: string
}

export class UsersDTO {


    public createNewUserInput(
        newUser: {
            id: string,
            name: unknown,
            email: unknown,
            password: unknown
        }): CreateNewUserInput {

        if (typeof newUser.id !== "string") {
            throw new BadRequestError("'id' do novo usuário deve ser do tipo 'string'.")
        }

        if (typeof newUser.name !== "string") {
            throw new BadRequestError("'name' do novo usuário deve ser do tipo 'string'.")
        }

        if (typeof newUser.email !== "string") {
            throw new BadRequestError("'email' do novo usuário deve ser do tipo 'string'.")
        }

        if (typeof newUser.password !== "string") {
            throw new BadRequestError("'password' do novo usuário deve ser do tipo 'string'.")
        }

        const dto: CreateNewUserInput = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        }

        return dto
    }

    public createNewUserOutput(newUserCreated: userDB, userToken: string): CreateNewUserOutput {

        const dto: CreateNewUserOutput = {
            message: `Olá, ${newUserCreated.name}! Você foi registrado com sucesso.`,
            userToken
        }

        return dto
    }

    public loginUserInput(userEmail: unknown, userPassword: unknown): LoginUserInput {

        if (typeof userEmail !== "string") {
            throw new BadRequestError("'email' do usuário inserido deve ser do tipo 'string'.")
        }

        if (typeof userPassword !== "string") {
            throw new BadRequestError("'senha' do usuário inserido deve ser do tipo 'string'.")
        }

        const dto: LoginUserInput = { email: userEmail, password: userPassword }
        return dto
    }

    public loginUserOutput(loggedInUser: User, userToken: string) {

        const dto: LoginuserOutput = {
            message: `Olá, ${loggedInUser.getName()}! Bom te ver novamente.`,
            userToken
        }
        return dto
    }

    public deleteUserInput(userToken: unknown): DeleteUserInput {
        if (typeof userToken !== 'string') {
            throw new BadRequestError("Token inválido.")
        }

        const dto: DeleteUserInput = {
            userToken
        }
        return dto
    }

    public deleteUserOutput(userDeletedName: string): DeleteUserOutput {
        const dto: DeleteUserOutput = {
            message: `A conta do usuário ${userDeletedName} foi deletada.`
        }
        return dto
    }
}

