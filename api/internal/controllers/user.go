package controllers

import (
	"fmt"
	"net/http"

	"github.com/drejt/api/internal/db"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

type UserRequest struct {
	Username string `json:"username" binding:"required"`
}

func GetUserByUsername(c *gin.Context) {
	var u UserRequest
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	// init db conn
	q, ctx := db.GetDbConn()
	user, err := q.GetUser(*ctx, u.Username)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "this user does not exist"})
		return
	}
	user.PassHash = ""

	c.JSON(200, gin.H{"message": "successfully fetched user", "data": user})
}

func GetUserApplications(c *gin.Context) {
	session := sessions.Default(c)
	uid := session.Get("uid").(int64)
	fmt.Println(uid)

	q, ctx := db.GetDbConn()
	applications, err := q.GetUserApplications(*ctx, uid)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": applications})
}
