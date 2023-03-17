import { HashManager } from "../services/HashManager";
import { UsersDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { userDB } from "../types";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateNewUserInput, DeleteUserInput, LoginUserInput, UsersDTO } from "../dtos/UsersDTO";

export class UserBusiness {
    constructor(
        private usersDTO: UsersDTO,
        private hashManager: HashManager,
        private usersDatabase: UsersDatabase,
        private tokenManager: TokenManager
    ) { }

    public createNewUser = async (newUser: CreateNewUserInput) => {

        const [checkId] = await this.usersDatabase.checkId(newUser.id)

        if (checkId) {
            throw new BadRequestError("Cada conta deve ter 'id' único.")
        }


        const [checkEmail] = await this.usersDatabase.checkEmail(newUser.email)

        if (checkEmail) {
            throw new BadRequestError("Cada e-mail pode ter apenas uma conta conectada a ele.")
        }

        const hashedPassword = await this.hashManager.hash(newUser.password)

        const newUserDB: userDB = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword,
            created_at: new Date().toISOString()
        }

        await this.usersDatabase.createNewUser(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.id,
            name: newUser.name
        }

        const userToken = this.tokenManager.createToken(tokenPayload)

        const output = this.usersDTO.createNewUserOutput(newUserDB, userToken)

        return output
    }

    public loginUser = async (loginInput: LoginUserInput) => {
        const { email, password } = loginInput

        const [userFoundByEmail] = await this.usersDatabase.checkEmail(email)

        if (!userFoundByEmail) {
            throw new NotFoundError("Não há usuários registrados com esse e-mail e senha.")
        }

        const comparedPassword = await this.hashManager.compare(password, userFoundByEmail.password)

        if (!comparedPassword) {
            throw new NotFoundError("Não há usuários registrados com esse e-mail e senha.")
        }


        const tokenPayload: TokenPayload = { id: userFoundByEmail.id, name: userFoundByEmail.name }
        const userToken = this.tokenManager.createToken(tokenPayload)

        const userLoggedIn = new User(
            userFoundByEmail.id,
            userFoundByEmail.name,
            userFoundByEmail.email,
            userFoundByEmail.password,
            userFoundByEmail.created_at)

        const output = this.usersDTO.loginUserOutput(userLoggedIn, userToken)

        return output
    }

    public deleteUser = async (input: DeleteUserInput) => {
        const token = input.userToken
        const userPayLoad = this.tokenManager.getPayload(token)

        if (userPayLoad === null) {
            throw new UnauthorizedError("Você não pode deletar essa conta. Tente logar novamente para deletar.")
        }

        await this.usersDatabase.deleteUser(userPayLoad.id)

        const output = this.usersDTO.deleteUserOutput(userPayLoad.name)
        return output
    }
}