package main

import (
	"github.com/drejt/api"
	"github.com/drejt/config"
	"github.com/gin-gonic/gin"
)

func main() {
	api.InitRoutes()
	config.App.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "pong",
		})
	})
	config.App.Run() // listen and serve on 0.0.0.0:8080
}
