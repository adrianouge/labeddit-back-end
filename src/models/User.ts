export class User {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public created_at: string
    ) { }
    
    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getEmail() {
        return this.email
    }

    public getPassword() {
        return this.password
    }

    public getCreatedAt() {
        return this.created_at
    }
    
    public setEmail(newEmail: string) {
        this.email = newEmail
    }

    public setPassword(newPassword: string) {
        this.password = newPassword
    }
    
}