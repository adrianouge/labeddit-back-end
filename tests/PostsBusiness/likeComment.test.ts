import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, LikeCommentInput, LikeCommentOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("likeComment", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem confirmando curtida com sucesso", async () => {
        const input: LikeCommentInput = {
            userToken: "token-mock",
            commentId: "comment-id-mock"
        }
        const response: LikeCommentOutput = await postsBusiness.likeComment(input)
        expect(response.message).toBe("Comentário curtido com sucesso.")
    })
})