CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    on_boarding boolean DEFAULT FALSE,
    pass_hash text NOT NULL,
    github_url text
);