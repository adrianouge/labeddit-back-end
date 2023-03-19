import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, CreateNewCommentInput, CreateNewCommentOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("createNewComment", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de sucesso", async () => {
        const newCommentMock: CreateNewCommentInput = {
            userToken: "token-mock",
            postId: "post-id-mock",
            commentId: "novo-comment-id-mock",
            content: "conteúdo do comentário mockado"
        }
        const response: CreateNewCommentOutput = await postsBusiness.createNewComment(newCommentMock)
        expect(response.message).toBe('Comentário criado com sucesso.')
    })
})