package controllers

import (
	"net/http"

	"github.com/drejt/api/internal/db"
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

	q, ctx := db.GetDbConn()
	user, err := q.GetOrg(*ctx, org.OrgName)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "org name not found. please make sure the org is registered "})
		return
	}

	user.Email = ""
	user.PassHash = ""
	c.JSON(http.StatusOK, gin.H{"data": user})
}

type OrgJobsRequest struct {
	OrgName string `json:"orgName" binding:"required"`
}

func GetOrgJobs(c *gin.Context) {
	var orgJob OrgJobsRequest
	if err := c.ShouldBindJSON(&orgJob); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "invalid body"})
		return
	}

	// q, ctx := db.GetDbConn()

	// jobs, err := q.getOrgJobs()
	// if err != nil {
	// 	c.JSON(http.StatusNotFound, gin.H{"error": "no not found"})
	// 	return
	// }

	// change orgjob to jobs var
	c.JSON(http.StatusOK, gin.H{"message": "successfully fetched org jobs", "data": orgJob})
}
