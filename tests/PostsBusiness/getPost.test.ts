import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, GetPostInput, GetPostOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"
import { postDB } from "../../src/types"

describe("getPost", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar post procurado", async () => {
        const input: GetPostInput = {
            userToken: "token-mock",
            postId: "post-id-mock"
        }
        const response: GetPostOutput = await postsBusiness.getPost(input)
        expect(response.foundPost).toEqual({
            "comments": 0, "content": "conteúdo mockado", "created_at": "data mockada", "creator_id": "user-id-mock",
            "edited_at": "data mockada", "likes": 0, "post_id": "post-id-mock"
        })
    })
})