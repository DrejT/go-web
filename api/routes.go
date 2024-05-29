package api

import (
	"github.com/drejt/api/controllers"
	"github.com/gin-gonic/gin"
)

type Router interface {
	SetupRouter(router *gin.Engine)
}

type router struct{}

func NewRouter() Router {
	return &router{}
}

// SetupRouter configuration router information
func (r *router) SetupRouter(router *gin.Engine) {
	// Setup route group for the API
	api := router.Group("/api/v1")
	{
		authRouter := api.Group("/auth")
		authRouter.POST("/login", controllers.LoginAuth)
		// authRouter.GET("/login")
		authRouter.POST("/register", controllers.RegisterAuth)

		userRouter := api.Group("/user")
		userRouter.GET("/", controllers.GetUserByUsername)

	}
}
