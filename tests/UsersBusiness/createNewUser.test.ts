import { UsersBusiness } from "../../src/business/UsersBusiness"
import { UsersDatabase } from "../../src/database/UsersDatabase"
import { UsersDTO, CreateNewUserInput, CreateNewUserOutput } from "../../src/dtos/UsersDTO"
import { userDB } from "../../src/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UsersDatabaseMock } from "../mocks/UsersDatabaseMock"

describe("createNewUser", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDTO(),
        new HashManagerMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de sucesso e token mockado", async () => {
        expect.assertions(2)
        const newUserMock: CreateNewUserInput = {
            id: "user-id-mock-novo",
            name: "nome mock",
            email: "emailnovo@mock.up",
            password: "senha mockada"
        }

        const response: CreateNewUserOutput = await usersBusiness.createNewUser(newUserMock)

        expect(response.message).toBe(`Olá, ${newUserMock.name}! Você foi registrado com sucesso.`)
        expect(response.userToken).toBe("token-mock")
    })
})