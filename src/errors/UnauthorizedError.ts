import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "Desautorizado a ter acesso a essa informação."
    ) { super(401, message) }
}