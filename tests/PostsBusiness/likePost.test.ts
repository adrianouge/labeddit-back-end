import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, LikePostInput, LikePostOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("likePost", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem confirmando curtida com sucesso", async () => {
        const input: LikePostInput = {
            userToken: "token-mock",
            postId: "post-id-mock"
        }
        const response: LikePostOutput = await postsBusiness.likePost(input)
        expect(response.message).toBe("Post 'liked' com sucesso.")
    })
})