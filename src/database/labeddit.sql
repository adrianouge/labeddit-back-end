-- Active: 1679067589201@@127.0.0.1@3306
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
    );

CREATE TABLE
    posts(
        post_id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        comments INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT NOT NULL,
        edited_at TEXT,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

CREATE TABLE
    comments (
        comment_id TEXT PRIMARY KEY UNIQUE NOT NULL,
        commenter_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
        edited_at TEXT
    );

CREATE TABLE
    likes(
        post_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        liked INTEGER DEFAULT(0) NOT NULL,
        FOREIGN KEY(post_id) REFERENCES posts(post_id),
        FOREIGN KEY(user_id) REFERENCES users(id)
    );