package config

import (
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func ConfigureEnv(app *gin.Engine) {
	store := cookie.NewStore([]byte("lmfoamoefmoasdi"))
	store.Options(sessions.Options{
		Path:     "/",
		Domain:   "",                  // Leave empty for localhost
		MaxAge:   24 * int(time.Hour), // expire in a day
		Secure:   false,               // Set to true if using HTTPS
		HttpOnly: true,
	})
	app.Use(sessions.Sessions("auth", store))

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("please setup a .env file in root folder")
	}
	env := os.Getenv("env")

	switch env {
	case "dev":

		app.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:5173"}, // Replace with your frontend origin
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}))
	case "prod":
		// store.Options(sessions.Options{
		// 	Path:     "/",
		// 	Domain:   "",           // Leave empty for localhost
		// 	MaxAge:   60 * 60 * 24, // expire in a day
		// 	Secure:   false,        // Set to true if using HTTPS
		// 	HttpOnly: true,
		// })
		// app.Use(sessions.Sessions("auth", store))

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
