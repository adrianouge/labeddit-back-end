import { BaseDatabase } from "./BaseDatabase";
import { User } from "../models/User";
import { userDB } from "../types";

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    dbConnection = BaseDatabase.connection

    public async createNewUser(userToCreate: userDB): Promise<void> {
        await this.dbConnection(UsersDatabase.TABLE_USERS).insert(userToCreate)
    }

    public async checkId(userId: string): Promise<userDB[] | undefined[]> {
        const foundUserDB = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ id: userId })
        return foundUserDB
    }

    public async checkEmail(userEmail: string): Promise<userDB[] | undefined[] > {
        const foundUserDB = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ email: userEmail })
        return foundUserDB
    }

    public async checkPassword(userPassword: string): Promise<userDB[] | undefined[] >  {
    const foundUserDB = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ password: userPassword })
    return foundUserDB
}

    public async deleteUser(userToDeleteId: string): Promise<void> {
    await this.dbConnection(UsersDatabase.TABLE_USERS).del().where({ id: userToDeleteId })
}
}
