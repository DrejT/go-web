package controllers

import (
	"fmt"
	"net/http"

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

func RegisterAuth(c *gin.Context) {
	var registerReq RegisterRequest
	if err := c.ShouldBindJSON(&registerReq); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "registration successful",
		"data":    registerReq,
	})
}

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
