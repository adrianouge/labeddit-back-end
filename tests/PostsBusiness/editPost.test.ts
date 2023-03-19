import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, EditPostInput, EditPostOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("editPost", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de sucesso", async () => {
        const editedPost: EditPostInput = {
            userToken: "token-mock",
            postId: "post-id-mock",
            newContent: "conteúdo novo do post mockado"
        }
        const response: EditPostOutput = await postsBusiness.editPost(editedPost)
        expect(response.message).toBe('Post editado com sucesso.')
    })
})