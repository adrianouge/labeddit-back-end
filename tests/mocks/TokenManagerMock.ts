import { TokenPayload } from '../../src/services/TokenManager'

export class TokenManagerMock {

    public createToken = (payload: TokenPayload): string => {
        return "token-mock"
    }

    public getPayload = (token: string): TokenPayload | null => {
        if (token == "token-mock") {
            return {
                id: "user-id-mock",
                name: "nome mock"
            }
        }

        else {
            return null
        }
    }
}