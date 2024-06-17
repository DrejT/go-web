package api

import (
	"github.com/drejt/api/internal/controllers"
	"github.com/drejt/api/internal/middlewares"
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
		authRouter.GET("/session", controllers.RevalidateSession)

		userRouter := api.Group("/user")
		userRouter.Use(middlewares.VerifySession())
		userRouter.POST("/", controllers.GetUserByUsername)
		userRouter.POST("/onboard", controllers.UserOnBoard)

		orgRouter := api.Group("/org")
		orgRouter.Use(middlewares.VerifySession())
		orgRouter.POST("/onboard", controllers.OrgOnBoard)

	}
}
