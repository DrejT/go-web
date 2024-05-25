package controllers

import (
	"github.com/gin-gonic/gin"
)

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func LoginAuth(ctx *gin.Context) {
	var loginReq LoginRequest
	if err := ctx.ShouldBindJSON(&loginReq); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(200, gin.H{
		"message": "Login successful",
		"data":    loginReq,
	})
}

func RegisterAuth(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "helo",
	})
}
