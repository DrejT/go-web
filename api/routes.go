package api

import (
	"github.com/drejt/api/controllers"
	"github.com/drejt/config"
)

func InitRoutes() {
	initAuthRouter()
}

func initAuthRouter() {
	authRouter := config.App.Group("/api/v1/auth")
	authRouter.POST("/login", controllers.LoginAuth)
	// authRouter.GET("/login")
	authRouter.POST("/register", controllers.RegisterAuth)
}
