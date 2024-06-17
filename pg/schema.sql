CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    pass_hash text NOT NULL,
    on_board boolean default false,
    user_type text NOT NULL default 'user'
);