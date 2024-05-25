package main

import (
	"github.com/drejt/api"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"

	"github.com/gin-gonic/gin"
)

var router api.Router = api.NewRouter()

func main() {
	app := gin.Default()
	app.Use(cors.Default())

	app.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// serve the client app
	app.Use(static.Serve("/", static.LocalFile("./web/dist", true)))

	// handle all routes declared in client-side
	app.NoRoute(func(ctx *gin.Context) {
		ctx.File("./web/dist/index.html")
	})
	router.SetupRouter(app)

	app.Run() // listen and serve on 0.0.0.0:8080
}
