import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, DislikeCommentInput, DislikeCommentOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("dislikeComment", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem confirmando curtida com sucesso", async () => {
        const input: DislikeCommentInput = {
            userToken: "token-mock",
            commentId: "comment-id-mock"
        }
        const response: DislikeCommentOutput = await postsBusiness.dislikeComment(input)
        expect(response.message).toBe("Comentário descurtido com sucesso.")
    })
})