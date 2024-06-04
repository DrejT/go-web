package controllers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/drejt/api/internal/db"
	"github.com/drejt/api/internal/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func LoginAuth(c *gin.Context) {
	var loginReq LoginRequest
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	session := sessions.Default(c)
	session.Set("username", loginReq.Username)
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	c.JSON(200, gin.H{
		"message": "Login successful",
		"data":    loginReq,
	})
}

type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
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
	newUser := models.CreateUserParams{Username: registerReq.Username, Email: registerReq.Email}
	q, ctx := db.GetDbConn()
	user, err := q.CreateUser(*ctx, newUser)
	fmt.Println(newUser, user, err)
	if err != nil {
		log.Fatalln("there was an internal server error", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "there was an internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "registration successful",
		"data":    user,
	})
}

// check if a session exists using the requests session object
// if session has expired return a message requesting a relogin
func RevalidateSession(c *gin.Context) {
	session := sessions.Default(c)
	u := session.Get("username")
	fmt.Println(u)
	if u == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "please login",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "you are logged in", "username": u})
}