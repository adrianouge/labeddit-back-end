export interface userDB {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string,
}

export interface postDB {
    post_id: string,
    creator_id: string,
    content: string,
    created_at: string,
    edited_at: string,
    likes: number,
    comments: number
}

export interface likedPostDB {
    post_id: string,
    user_id: string,
    liked: number
}

export interface commentDB {
    comment_id: string,
    commenter_id: string,
    post_id: string,
    content: string,
    likes: number,
    created_at: string,
    edited_at: string
}