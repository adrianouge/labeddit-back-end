import { HashManager } from "../services/HashManager";
import { UsersDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { userDB } from "../types";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private usersDTO: UsersDTO,
        private hashManager: HashManager,
        private idGenerator: IdGenerator,
        private usersDatabase: UsersDatabase,
        private tokenManager: TokenManager
    ) { }

    public
}