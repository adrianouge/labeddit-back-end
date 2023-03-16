import { BaseDatabase } from "./BaseDatabase";
import { User } from "../models/User";
import { userDB } from "../types";

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    dbConnection = BaseDatabase.connection

    public async createNewUser(userToCreate: userDB) {
        await this.dbConnection(UsersDatabase.TABLE_USERS).insert(userToCreate)
    }

    public async getUser(userId: string) {
        const foundUserDB = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ id: userId })
        return foundUserDB
    }

    public async checkId(userId: string) {
        const foundUserDB = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ id: userId })
        return foundUserDB
    }
    
    public async checkEmail(userEmail: string) {
        const foundUserDB = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ email: userEmail })
        return foundUserDB
    }

    public async checkPassword(userPassword: string) {
        const foundUserDB = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ password: userPassword })
        return foundUserDB
    }

    public async deleteUser(userToDeleteId: string) {
        await this.dbConnection(UsersDatabase.TABLE_USERS).del().where({id: userToDeleteId})
    }
}
