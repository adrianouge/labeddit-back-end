import { UsersBusiness } from "../../src/business/UsersBusiness"
import { UsersDatabase } from "../../src/database/UsersDatabase"
import { UsersDTO, LoginUserInput, LoginuserOutput } from "../../src/dtos/UsersDTO"
import { userDB } from "../../src/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UsersDatabaseMock } from "../mocks/UsersDatabaseMock"

describe("loginUser", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDTO(),
        new HashManagerMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de boas vindas e token mockado", async () => {
        const userLoginMock: LoginUserInput = {
            email: "email@mock.up",
            password: "senhaDoUsuario"
        }
        const response = await usersBusiness.loginUser(userLoginMock)

        expect(response.message).toBe(`Olá, nome mock! Bom te ver novamente.`)
        expect(response.userToken).toBe("token-mock")
    })
})