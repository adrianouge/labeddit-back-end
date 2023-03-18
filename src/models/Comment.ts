export class Comment {
    
    constructor(
        public post_id: string,
        public user_id: string,
        public content: string,
        public likes: number,
        public created_at: string,
        public edited_at: string
    ) { }

    public getPostId() {
        return this.post_id
    }

    public getUserId() {
        return this.user_id
    }

    public getContent() {
        return this.content
    }

    public getLikes() {
        return this.likes
    }

    public getCreatedAt() {
        return this.created_at
    }

    public getEditedAt() {
        return this.edited_at
    }

    public setContent(newContent: string) {
        this.content = newContent
    }

    public setLikes() {
        this.likes += 1
    }

    public setEditedAt(newEditedAt: string) {
        this.edited_at = newEditedAt
    }

}