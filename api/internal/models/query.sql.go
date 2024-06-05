// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: query.sql

package models

import (
	"context"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (username, email, pass_hash)
VALUES ($1, $2, $3)
RETURNING id, username, email, on_boarding, pass_hash, github_url
`

type CreateUserParams struct {
	Username string
	Email    string
	PassHash string
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, createUser, arg.Username, arg.Email, arg.PassHash)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.OnBoarding,
		&i.PassHash,
		&i.GithubUrl,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteUser, id)
	return err
}

const getUser = `-- name: GetUser :one
SELECT id, username, email, on_boarding, pass_hash, github_url
FROM users
WHERE username = $1
`

func (q *Queries) GetUser(ctx context.Context, username string) (User, error) {
	row := q.db.QueryRow(ctx, getUser, username)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.OnBoarding,
		&i.PassHash,
		&i.GithubUrl,
	)
	return i, err
}

const getUsers = `-- name: GetUsers :one
SELECT id, username, email, on_boarding, pass_hash, github_url
FROM users
WHERE username = $1
    OR email = $2
LIMIT 1
`

type GetUsersParams struct {
	Username string
	Email    string
}

func (q *Queries) GetUsers(ctx context.Context, arg GetUsersParams) (User, error) {
	row := q.db.QueryRow(ctx, getUsers, arg.Username, arg.Email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.OnBoarding,
		&i.PassHash,
		&i.GithubUrl,
	)
	return i, err
}

const listUsers = `-- name: ListUsers :many
SELECT id, username, email, on_boarding, pass_hash, github_url
FROM users
ORDER BY username
`

func (q *Queries) ListUsers(ctx context.Context) ([]User, error) {
	rows, err := q.db.Query(ctx, listUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.Email,
			&i.OnBoarding,
			&i.PassHash,
			&i.GithubUrl,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateUser = `-- name: UpdateUser :exec
UPDATE users
SET email = $2
WHERE username = $1
`

type UpdateUserParams struct {
	Username string
	Email    string
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) error {
	_, err := q.db.Exec(ctx, updateUser, arg.Username, arg.Email)
	return err
}
