export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "senhaDoUsuario") {
            return "hash-senhaDoUsuario"
        }

        return "hash-mock"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "senhaDoUsuario" && hash == "hash-senhaDoUsuario") {
            return true
        }

        return false
    }
}