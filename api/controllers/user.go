package controllers

import "github.com/gin-gonic/gin"

type UserRequest struct {
	Username string `json:"username" binding:"required"`
}

func GetUserByUsername(ctx *gin.Context) {
	var user UserRequest
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	ctx.JSON(200, gin.H{"message": "successfully fetched user", "data": user.Username})
}
