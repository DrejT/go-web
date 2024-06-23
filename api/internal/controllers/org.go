package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type OrgRequest struct {
	OrgName string `json:"orgName" binding:"required"`
}

func GetOrgByName(c *gin.Context) {
	var org OrgRequest
	if err := c.ShouldBindJSON(&org); err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"error": "please enter a valid org name",
		})
		return
	}

	// q, ctx := db.GetDbConn()
	// q.GetUserAndDetails()
}
