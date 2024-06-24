package controllers

import (
	"log"
	"net/http"

	"github.com/drejt/api/internal/db"
	"github.com/drejt/api/internal/lib"
	"github.com/drejt/api/internal/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// handles login request coming from guest users
func LoginAuth(c *gin.Context) {
	var loginReq LoginRequest
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// fetch stored user from db
	q, ctx := db.GetDbConn()
	user, err := q.GetUser(*ctx, loginReq.Username)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	// compare passwords
	match := lib.DoPasswordsMatch(user.PassHash, loginReq.Password)
	if !match {
		c.JSON(http.StatusConflict, gin.H{"error": "sorry the password provided is invalid"})
		return
	}

	// start a new session
	session := sessions.Default(c)
	session.Set("username", loginReq.Username)
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}

	user.PassHash = ""
	// send a successful login response
	c.JSON(200, gin.H{
		"message": "Login successful",
		"data":    user,
	})
}

type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
	UserType string `json:"usertype"`
}

// register a new user
func RegisterAuth(c *gin.Context) {
	var registerReq RegisterRequest
	if err := c.ShouldBindJSON(&registerReq); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error": err.Error(),
		})
		return
	}

	// only org and user types are valid userTypes
	if registerReq.UserType != "org" && registerReq.UserType != "user" {
		registerReq.UserType = "user"
	}

	q, ctx := db.GetDbConn()
	// check for an existing user with the same username or emails
	if existingUser, err := q.GetUsers(*ctx, models.GetUsersParams{Username: registerReq.Username, Email: registerReq.Email}); err != nil {
		// handle the case where unique username and email are sent and no user is returned hence err is not nil
		if err.Error() != "no rows in result set" {
			log.Fatal("errro is ", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "we are facing some issues right now please try again later"})
			return
		}
	} else if existingUser.Username == registerReq.Username || existingUser.Email == registerReq.Email {
		c.JSON(http.StatusConflict, gin.H{"error": "this username/email is already taken"})
		return
	}

	// handle creation of new user details to default values
	userDetails := lib.GetDefaultUserDetails(c, q, ctx)
	orgDetails := lib.GetDefaultOrgDetails(c, q, ctx)

	// now hashing password
	passHash, err := lib.HashPassword(registerReq.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "there was an internal error",
		})
		return
	}

	// creating new user
	newUser := models.CreateUserParams{Username: registerReq.Username, Email: registerReq.Email, PassHash: passHash, UserType: registerReq.UserType, OrgDetailsID: orgDetails.ID, UserDetailsID: userDetails.ID}
	user, err := q.CreateUser(*ctx, newUser)
	if err != nil {
		log.Fatalln("there was an internal server error", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "there was an internal server error",
		})
		return
	}

	// sending data
	c.JSON(http.StatusOK, gin.H{
		"message": "registration successful",
		"data":    user,
	})
}

// check if a session exists using the requests session object
// if session has expired return a message requesting a relogin
func RevalidateSession(c *gin.Context) {
	session := sessions.Default(c)
	username, ok := session.Get("username").(string)
	if !ok || username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "please login",
		})
		return
	}

	q, ctx := db.GetDbConn()
	user, err := q.GetUser(*ctx, string(username))
	if err != nil {
		session.Set("username", "")
		err := session.Save()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "internal error please try again"})
			return
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	user.PassHash = ""
	c.JSON(http.StatusOK, gin.H{"message": "you are logged in", "user": user})
}
