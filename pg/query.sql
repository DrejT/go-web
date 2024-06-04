-- name: GetUser :one
SELECT *
FROM users
WHERE id = $1
LIMIT 1;
-- name: ListUsers :many
SELECT *
FROM users
ORDER BY username;
-- name: CreateUser :one
INSERT INTO users (username, email)
VALUES ($1, $2)
RETURNING *;
-- name: UpdateUser :exec
UPDATE users
SET username = $2
WHERE id = $1;
-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;