package main

import (
	"github.com/drejt/api"
	"github.com/drejt/config"
	"github.com/gin-contrib/static"

	"github.com/gin-gonic/gin"
)

var router api.Router = api.NewRouter()

func main() {
	app := gin.Default()
	router.SetupRouter(app)
	config.App.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// serve the client app
	config.App.Use(static.Serve("/", static.LocalFile("./web/dist", true)))

	// handle all routes declared in client-side
	config.App.NoRoute(func(ctx *gin.Context) {
		ctx.File("./web/dist/index.html")
	})
	config.App.Run() // listen and serve on 0.0.0.0:8080
}
