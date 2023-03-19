import { UsersBusiness } from "../../src/business/UsersBusiness"
import { UsersDTO, DeleteUserInput, DeleteUserOutput } from "../../src/dtos/UsersDTO"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UsersDatabaseMock } from "../mocks/UsersDatabaseMock"

describe("createNewUser", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDTO(),
        new HashManagerMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de deleção com sucesso", async () => {
        const userTokenMockado: DeleteUserInput = { userToken: "token-mock" }
        const response = await usersBusiness.deleteUser(userTokenMockado)

        expect(response.message).toBe(`A conta do usuário nome mock foi deletada.`)
    })
})