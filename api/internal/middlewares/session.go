package middlewares

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func VerifySession() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		u := session.Get("username")
		if u == nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "please login",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
