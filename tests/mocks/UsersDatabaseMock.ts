import { BaseDatabase } from '../../src/database/BaseDatabase'
import { userDB } from '../../src/types'

export class UsersDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    dbConnection = BaseDatabase.connection

    public createNewUser = async (newUserMock: userDB) => {
    }

    public checkId = async (userIdMock: string): Promise<userDB[] | undefined[] >  => {

        if (userIdMock === "user-id-mock") {
            return [{
                id: "id-user-mock",
                name: "nome mock",
                email: "email@mock.up",
                password: "hash-senhaDoUsuario",
                created_at: "data mockada"
            }]
        }

        else {
            return [undefined]
        }
    }

    public checkEmail = async (userEmailMock: string): Promise<userDB[] | undefined[] >  => {

        if (userEmailMock === "email@mock.up") {
            return [{
                id: "user-id-mock",
                name: "nome mock",
                email: "email@mock.up",
                password: "hash-senhaDoUsuario",
                created_at: "data mockada"
            }]
        }

        else {
            return [undefined]
        }
    }

    public checkPassword = async (userPasswordMock: string): Promise<userDB[] | undefined[] >  => {

        if (userPasswordMock === "senha mockada") {
            return [{
                id: "user-id-mock",
                name: "nome mock",
                email: "email@mock.up",
                password: "senha mockada",
                created_at: "data mockada"
            }]
        }

        else {
            return [undefined]
        }
    }

    public deleteUser = async (userToDeleteIdMock: string) => {}
}