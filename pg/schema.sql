CREATE TABLE org_details (
    id BIGSERIAL PRIMARY KEY,
    org_name text NOT NULL default '',
    org_address text NOT NULL default '',
    pincode INT NOT NULL default 000000,
    employee_count INT NOT NULL default 1,
    website_url text NOT NULL default ''
);
CREATE TABLE user_details (
    id BIGSERIAL PRIMARY KEY,
    college_name text NOT NULL default '',
    education text NOT NULL default '',
    github_url text NOT NULL default '',
    university_name text NOT NULL default '',
    website_url text NOT NULL default ''
);
CREATE TABLE full_name (
    id BIGSERIAL PRIMARY KEY,
    first_name text NOT NULL default '',
    last_name text NOT NULL default ''
);
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    pass_hash text NOT NULL,
    on_board boolean default false,
    user_type text NOT NULL default 'user',
    user_details_id BIGSERIAL NOT NULL references user_details(id),
    org_details_id BIGSERIAL NOT NULL references org_details(id)
);