package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func ConfigureEnv(app *gin.Engine) {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("please setup a .env file in root folder")
	}
	env := os.Getenv("env")
	switch env {
	case "dev":
		fmt.Println("inside dev")
		app.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"*"}, // Replace with your frontend origin
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
			AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}))
	case "prod":
		// serve the client app
		app.Use(static.Serve("/", static.LocalFile("./web/dist", true)))

		// handle all routes declared in client-side
		app.NoRoute(func(ctx *gin.Context) {
			ctx.File("./web/dist/index.html")
		})
	default:
		log.Fatalf("invalid env variable")
	}
}
