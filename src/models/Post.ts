export class Post {

    constructor(
        public post_id: string,
        public creator_id: string,
        public content: string,
        public likes: number,
        public comments: number,
        public created_at: string,
        public edited_at: string | null
    ) { }
    
    public getPostId() {
        return this.post_id
    }

    public getCreatorId() {
        return this.creator_id
    }

    public getContent() {
        return this.content
    }

    public getLikes() {
        return this.likes
    }

    public getComments() {
        return this.comments
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

    public setLikes(newLikes: number) {
        this.likes = newLikes
    }
    
    public setComments(newComments: number) {
        this.comments = newComments
    }
    
    public setEditedAt(newEditedAt: string) {
        this.edited_at = newEditedAt
    }
}