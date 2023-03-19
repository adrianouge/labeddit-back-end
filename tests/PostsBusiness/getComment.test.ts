import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, GetCommentInput, GetCommentOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"
import { postDB } from "../../src/types"

describe("getComment", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar post procurado", async () => {

        const input: GetCommentInput = {
            userToken: "token-mock",
            commentId: "comment-id-mock"
        }

        const response: GetCommentOutput = await postsBusiness.getComment(input)
        console.log(response)
        expect(response.foundComment).toHaveProperty("comment_id")
    })
})