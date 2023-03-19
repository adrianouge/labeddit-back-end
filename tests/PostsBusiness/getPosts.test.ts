import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, GetPostsInput, GetPostsOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("getPosts", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar array com posts existentes", async () => {
        const input: GetPostsInput = {
            userToken: "token-mock"
        }
        const response: GetPostsOutput = await postsBusiness.getPosts(input)
        expect(response.allPosts).toHaveLength(2)
    })
})