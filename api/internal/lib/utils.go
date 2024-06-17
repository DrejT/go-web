package lib

import (
	"context"
	"net/http"

	"github.com/drejt/api/internal/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Hash password using the bcrypt hashing algorithm
func HashPassword(password string) (string, error) {
	// Convert password string to byte slice
	var passwordBytes = []byte(password)

	// Hash password with bcrypt's min cost
	hashedPasswordBytes, err := bcrypt.
		GenerateFromPassword(passwordBytes, bcrypt.MinCost)

	return string(hashedPasswordBytes), err
}

// Check if two passwords match using Bcrypt's CompareHashAndPassword
// which return nil on success and an error on failure.
func DoPasswordsMatch(hashedPassword, currPassword string) bool {
	err := bcrypt.CompareHashAndPassword(
		[]byte(hashedPassword), []byte(currPassword))
	return err == nil
}

func GetDefaultUserDetails(c *gin.Context, q *models.Queries, ctx *context.Context) models.UserDetail {
	newUserDetails := models.CreateUserDetailsParams{CollegeName: "", UniversityName: "", WebsiteUrl: "", GithubUrl: "", Education: ""}
	details, err := q.CreateUserDetails(*ctx, newUserDetails)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "there was an internal error"})
	}
	return details
}

func GetDefaultOrgDetails(c *gin.Context, q *models.Queries, ctx *context.Context) models.OrgDetail {
	newOrgDetails := models.CreateOrgDetailsParams{Pincode: 000000, OrgAddress: "", WebsiteUrl: "", OrgName: "", EmployeeCount: 1}
	details, err := q.CreateOrgDetails(*ctx, newOrgDetails)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "there was an internal error"})
	}
	return details
}
