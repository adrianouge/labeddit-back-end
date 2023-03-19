import { PostsBusiness } from "../../src/business/PostsBusiness"
import { PostsDTO, CreateNewPostInput, CreateNewPostOutput } from "../../src/dtos/PostsDTO"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from "../mocks/PostsDatabaseMock"

describe("createNewComment", () => {
    const postsBusiness = new PostsBusiness(
        new PostsDTO(),
        new PostsDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve retornar mensagem de sucesso", async () => {
        const newPostMock: CreateNewPostInput = {
            userToken: "token-mock",
            postId: "novo-post-id-mock",
            content: "conteúdo do post mockado"
        }
        const response: CreateNewPostOutput = await postsBusiness.createNewPost(newPostMock)
        expect(response.message).toBe('Post criado com sucesso.')
    })
})