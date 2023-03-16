CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

CREATE TABLE
    posts(
        post_id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes NUMBER DEFAULT(0) NOT NULL,
        comments NUMBER DEFAULT(0) NOT NULL,
        created_at TEXT NOT NULL,
        edited_at TEXT
    );

CREATE TABLE likes( post_id TEXT  ) 