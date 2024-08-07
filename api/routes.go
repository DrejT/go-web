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
		authRouter.DELETE("/logout", controllers.LogoutAuth)
		authRouter.GET("/session", controllers.RevalidateSession)

		userRouter := api.Group("/user")
		userRouter.POST("/", controllers.GetUserByUsername)
		userRouter.Use(middlewares.VerifySession())
		userRouter.POST("/onboard", controllers.UserOnBoard)
		userRouter.GET("/applications", controllers.GetUserApplications)

		orgRouter := api.Group("/org")
		orgRouter.POST("/", controllers.GetOrgByName)
		orgRouter.GET("/", controllers.GetOrgJobByID)
		orgRouter.POST("/job", controllers.GetOrgJobs)
		orgRouter.Use(middlewares.VerifySession())
		orgRouter.POST("/onboard", controllers.OrgOnBoard)
		orgRouter.POST("/job/new", controllers.AddNewJob)
		orgRouter.POST("/job/apply", controllers.ApplyJob)

	}
}
