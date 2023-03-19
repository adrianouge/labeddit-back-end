import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, DeleteCommentInput, DeleteCommentOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("deleteComment", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de sucesso", async () => {
        const inputMock: DeleteCommentInput = {
            userToken: "token-mock",
            commentId: "comment-id-mock"
        }
        const response: DeleteCommentOutput = await postsBusiness.deleteComment(inputMock)
        expect(response.message).toBe('Comentário deletado com sucesso.')
    })
})