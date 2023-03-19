import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, EditCommentInput, EditCommentOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("editComment", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de sucesso", async () => {
        const input: EditCommentInput = {
            userToken: "token-mock",
            commentId: "comment-id-mock",
            newContent: "conteúdo novo do comentário mockado"
        }
        const response: EditCommentOutput = await postsBusiness.editComment(input)
        expect(response.message).toBe('Comentário foi editado com sucesso.')
    })
})