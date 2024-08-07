package main

import (
	"log"

	"github.com/drejt/api"
	"github.com/drejt/config"

	"github.com/gin-gonic/gin"
)

var router api.Router = api.NewRouter()

func main() {
	app := gin.Default()

	config.ConfigureEnv(app)

	app.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.SetupRouter(app)

	err := app.Run() // listen and serve on 0.0.0.0:8080
	if err != nil {
		log.Fatalf(err.Error())
	}
}
