-- name: GetUser :one
SELECT *
FROM users
WHERE username = $1;
-- name: GetUsers :one
SELECT *
FROM users
WHERE username = $1
    OR email = $2
LIMIT 1;
-- name: ListUsers :many
SELECT *
FROM users
ORDER BY username;
-- name: CreateUser :one
INSERT INTO users (username, email, pass_hash)
VALUES ($1, $2, $3)
RETURNING *;
-- name: UpdateUser :exec
UPDATE users
SET email = $2
WHERE username = $1;
-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;