import { Request, Response } from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { BaseError } from "../errors/BaseError";
import { UsersDTO } from "../dtos/UsersDTO";
import { IdGenerator } from "../services/IdGenerator";


export class UsersController {

    constructor(
        private usersBusiness: UsersBusiness,
        private usersDTO: UsersDTO,
        private idGenerator: IdGenerator
    ) { }

    public createNewUser = async (req: Request, res: Response) => {

        try {

            const id = this.idGenerator.generate()
            const { name, email, password } = req.body
            const newUser = { id, name, email, password }
            const input = this.usersDTO.createNewUserInput(newUser)
            const output = this.usersBusiness.createNewUser(input)

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

    public loginUser = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body
            const input = this.usersDTO.loginUserInput(email, password)
            const output = this.usersBusiness.loginUser(input)

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

    public deleteUser = async (req: Request, res: Response) => {

        try {
            const token = req.headers.authorization
            const input = this.usersDTO.deleteUserInput(token)
            const output = await this.usersBusiness.deleteUser(input)

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