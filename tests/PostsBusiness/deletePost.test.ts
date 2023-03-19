import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDatabase } from "../../src/database/PostsDatabase"
import { PostsDTO, DeletePostInput, DeletePostOutput } from "../../src/dtos/PostsDTO"
import { postDB } from "../../src/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("deletePost", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de sucesso", async () => {
        const inputMock: DeletePostInput = {
            userToken: "token-mock",
            postId: "post-id-mock"
        }
        const response: DeletePostOutput = await postsBusiness.deletePost(inputMock)
        expect(response.message).toBe('Post deletado com sucesso.')
    })
})