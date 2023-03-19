import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, GetCommentsInput, GetCommentsOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("getPosts", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar array com comentários existentes", async () => {
        const input: GetCommentsInput = {
            userToken: "token-mock",
            postId: "post-id-mock"
        }
        const response: GetCommentsOutput = await postsBusiness.getComments(input)
        expect(response.allComments).toHaveLength(2)
    })
})