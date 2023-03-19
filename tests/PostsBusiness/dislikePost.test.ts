import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, DislikePostInput, DislikePostOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("dislikePost", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem confirmando descurtida com sucesso", async () => {
        const input: DislikePostInput = {
            userToken: "token-mock",
            postId: "post-id-mock"
        }
        const response: DislikePostOutput = await postsBusiness.dislikePost(input)
        expect(response.message).toBe("Post 'disliked' com sucesso.")
    })
})