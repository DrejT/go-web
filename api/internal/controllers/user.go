package controllers

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

type UserRequest struct {
	Username string `json:"username" binding:"required"`
}

func GetUserByUsername(c *gin.Context) {
	var user UserRequest
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	session := sessions.Default(c)
	username := session.Get("username")
	c.JSON(200, gin.H{"message": "successfully fetched user", "data": username})
}
