// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: query.sql

package models

import (
	"context"
)

const createOrgDetails = `-- name: CreateOrgDetails :one
INSERT INTO org_details (
        org_name,
        org_address,
        pincode,
        employee_count,
        website_url
    )
VALUES ($1, $2, $3, $4, $5)
RETURNING id, org_name, org_address, pincode, employee_count, website_url
`

type CreateOrgDetailsParams struct {
	OrgName       string
	OrgAddress    string
	Pincode       int32
	EmployeeCount int32
	WebsiteUrl    string
}

// - org details ---
func (q *Queries) CreateOrgDetails(ctx context.Context, arg CreateOrgDetailsParams) (OrgDetail, error) {
	row := q.db.QueryRow(ctx, createOrgDetails,
		arg.OrgName,
		arg.OrgAddress,
		arg.Pincode,
		arg.EmployeeCount,
		arg.WebsiteUrl,
	)
	var i OrgDetail
	err := row.Scan(
		&i.ID,
		&i.OrgName,
		&i.OrgAddress,
		&i.Pincode,
		&i.EmployeeCount,
		&i.WebsiteUrl,
	)
	return i, err
}

const createUser = `-- name: CreateUser :one
INSERT INTO users (
        username,
        email,
        pass_hash,
        user_type,
        org_details_id,
        user_details_id
    )
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, username, email, pass_hash, on_board, user_type, user_details_id, org_details_id
`

type CreateUserParams struct {
	Username      string
	Email         string
	PassHash      string
	UserType      string
	OrgDetailsID  int64
	UserDetailsID int64
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, createUser,
		arg.Username,
		arg.Email,
		arg.PassHash,
		arg.UserType,
		arg.OrgDetailsID,
		arg.UserDetailsID,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.PassHash,
		&i.OnBoard,
		&i.UserType,
		&i.UserDetailsID,
		&i.OrgDetailsID,
	)
	return i, err
}

const createUserDetails = `-- name: CreateUserDetails :one
INSERT INTO user_details (
        college_name,
        education,
        github_url,
        university_name,
        website_url
    )
VALUES ($1, $2, $3, $4, $5)
RETURNING id, college_name, education, github_url, university_name, website_url
`

type CreateUserDetailsParams struct {
	CollegeName    string
	Education      string
	GithubUrl      string
	UniversityName string
	WebsiteUrl     string
}

// - user details ---
func (q *Queries) CreateUserDetails(ctx context.Context, arg CreateUserDetailsParams) (UserDetail, error) {
	row := q.db.QueryRow(ctx, createUserDetails,
		arg.CollegeName,
		arg.Education,
		arg.GithubUrl,
		arg.UniversityName,
		arg.WebsiteUrl,
	)
	var i UserDetail
	err := row.Scan(
		&i.ID,
		&i.CollegeName,
		&i.Education,
		&i.GithubUrl,
		&i.UniversityName,
		&i.WebsiteUrl,
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

const getOrg = `-- name: GetOrg :one
SELECT id, username, email, pass_hash, on_board, user_type, user_details_id, org_details_id
FROM users
WHERE user_type = 'org'
    AND username = $1
`

// - org ---
func (q *Queries) GetOrg(ctx context.Context, username string) (User, error) {
	row := q.db.QueryRow(ctx, getOrg, username)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.PassHash,
		&i.OnBoard,
		&i.UserType,
		&i.UserDetailsID,
		&i.OrgDetailsID,
	)
	return i, err
}

const getUser = `-- name: GetUser :one
SELECT username,
    pass_hash,
    email,
    on_board,
    user_type
FROM users
WHERE username = $1
`

type GetUserRow struct {
	Username string
	PassHash string
	Email    string
	OnBoard  bool
	UserType string
}

// - user ---
func (q *Queries) GetUser(ctx context.Context, username string) (GetUserRow, error) {
	row := q.db.QueryRow(ctx, getUser, username)
	var i GetUserRow
	err := row.Scan(
		&i.Username,
		&i.PassHash,
		&i.Email,
		&i.OnBoard,
		&i.UserType,
	)
	return i, err
}

const getUsers = `-- name: GetUsers :one
SELECT username,
    email,
    pass_hash
FROM users
WHERE username = $1
    OR email = $2
LIMIT 1
`

type GetUsersParams struct {
	Username string
	Email    string
}

type GetUsersRow struct {
	Username string
	Email    string
	PassHash string
}

func (q *Queries) GetUsers(ctx context.Context, arg GetUsersParams) (GetUsersRow, error) {
	row := q.db.QueryRow(ctx, getUsers, arg.Username, arg.Email)
	var i GetUsersRow
	err := row.Scan(&i.Username, &i.Email, &i.PassHash)
	return i, err
}

const listUsers = `-- name: ListUsers :many
SELECT id, username, email, pass_hash, on_board, user_type, user_details_id, org_details_id
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
			&i.PassHash,
			&i.OnBoard,
			&i.UserType,
			&i.UserDetailsID,
			&i.OrgDetailsID,
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

const updateOnBoard = `-- name: UpdateOnBoard :exec
UPDATE users
SET on_board = $2
WHERE username = $1
`

type UpdateOnBoardParams struct {
	Username string
	OnBoard  bool
}

func (q *Queries) UpdateOnBoard(ctx context.Context, arg UpdateOnBoardParams) error {
	_, err := q.db.Exec(ctx, updateOnBoard, arg.Username, arg.OnBoard)
	return err
}

const updateOrgDetails = `-- name: UpdateOrgDetails :one
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
RETURNING id, org_name, org_address, pincode, employee_count, website_url
`

type UpdateOrgDetailsParams struct {
	OrgAddress    string
	EmployeeCount int32
	OrgName       string
	Pincode       int32
	WebsiteUrl    string
	Username      string
}

func (q *Queries) UpdateOrgDetails(ctx context.Context, arg UpdateOrgDetailsParams) (OrgDetail, error) {
	row := q.db.QueryRow(ctx, updateOrgDetails,
		arg.OrgAddress,
		arg.EmployeeCount,
		arg.OrgName,
		arg.Pincode,
		arg.WebsiteUrl,
		arg.Username,
	)
	var i OrgDetail
	err := row.Scan(
		&i.ID,
		&i.OrgName,
		&i.OrgAddress,
		&i.Pincode,
		&i.EmployeeCount,
		&i.WebsiteUrl,
	)
	return i, err
}

const updateUserDetails = `-- name: UpdateUserDetails :one
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
RETURNING id, college_name, education, github_url, university_name, website_url
`

type UpdateUserDetailsParams struct {
	CollegeName    string
	Education      string
	GithubUrl      string
	UniversityName string
	WebsiteUrl     string
	Username       string
}

func (q *Queries) UpdateUserDetails(ctx context.Context, arg UpdateUserDetailsParams) (UserDetail, error) {
	row := q.db.QueryRow(ctx, updateUserDetails,
		arg.CollegeName,
		arg.Education,
		arg.GithubUrl,
		arg.UniversityName,
		arg.WebsiteUrl,
		arg.Username,
	)
	var i UserDetail
	err := row.Scan(
		&i.ID,
		&i.CollegeName,
		&i.Education,
		&i.GithubUrl,
		&i.UniversityName,
		&i.WebsiteUrl,
	)
	return i, err
}

const updateUserEmail = `-- name: UpdateUserEmail :exec
UPDATE users
SET email = $2
WHERE username = $1
`

type UpdateUserEmailParams struct {
	Username string
	Email    string
}

func (q *Queries) UpdateUserEmail(ctx context.Context, arg UpdateUserEmailParams) error {
	_, err := q.db.Exec(ctx, updateUserEmail, arg.Username, arg.Email)
	return err
}
