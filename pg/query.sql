--- user ---
-- name: GetUser :one
SELECT username,
    pass_hash,
    email,
    on_board
FROM users
WHERE username = $1;
-- name: GetUsers :one
SELECT username,
    email,
    pass_hash
FROM users
WHERE username = $1
    OR email = $2
LIMIT 1;
-- name: GetUserAndDetails :exec
-- name: ListUsers :many
SELECT *
FROM users
ORDER BY username;
-- name: CreateUser :one
INSERT INTO users (
        username,
        email,
        pass_hash,
        user_type,
        org_details_id,
        user_details_id
    )
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
-- name: UpdateUserEmail :exec
UPDATE users
SET email = $2
WHERE username = $1;
-- name: UpdateOnBoard :exec
UPDATE users
SET on_board = $2
WHERE username = $1;
-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;
--- user details ---
-- name: CreateUserDetails :one
INSERT INTO user_details (
        college_name,
        education,
        github_url,
        university_name,
        website_url
    )
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
-- name: UpdateUserDetails :one
UPDATE user_details
SET college_name = COALESCE($1, college_name),
    education = COALESCE($2, education),
    github_url = COALESCE($3, github_url),
    university_name = COALESCE($4, university_name),
    website_url = COALESCE($5, website_url)
WHERE id = (
        SELECT user_details_id
        FROM users
        WHERE username = $6
    )
RETURNING *;
--- org details ---
-- name: CreateOrgDetails :one
INSERT INTO org_details (
        org_name,
        org_address,
        pincode,
        employee_count,
        website_url
    )
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
-- name: UpdateOrgDetails :one
UPDATE org_details
SET org_address = COALESCE($1, org_address),
    employee_count = COALESCE($2, employee_count),
    org_name = COALESCE($3, org_name),
    pincode = COALESCE($4, pincode),
    website_url = COALESCE($5, website_url)
WHERE id =(
        SELECT org_details_id
        FROM users
        WHERE username = $6
    )
RETURNING *;