// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package models

type Application struct {
	ID         int64
	JobID      int64
	Applicants int64
}

type FullName struct {
	ID        int64
	FirstName string
	LastName  string
}

type Job struct {
	ID          int64
	OrgName     string
	Title       string
	Description string
	Location    string
	Experience  string
	Language    string
	JobType     string
	Flexibility string
}

type OrgDetail struct {
	ID            int64
	OrgName       string
	OrgAddress    string
	Pincode       int32
	EmployeeCount int32
	WebsiteUrl    string
}

type User struct {
	ID            int64
	Username      string
	Email         string
	PassHash      string
	OnBoard       bool
	UserType      string
	UserDetailsID int64
	OrgDetailsID  int64
}

type UserDetail struct {
	ID             int64
	CollegeName    string
	Education      string
	GithubUrl      string
	UniversityName string
	WebsiteUrl     string
}
