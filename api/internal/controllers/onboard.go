package controllers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/drejt/api/internal/db"
	"github.com/drejt/api/internal/models"
	"github.com/gin-gonic/gin"
)

type UserOnBoardRequest struct {
	Username       string `json:"username" binding:"required"`
	CollegeName    string `json:"collegeName" binding:"required"`
	Education      string `json:"education" binding:"required"`
	GithubUrl      string `json:"githubUrl"`
	UniversityName string `json:"universityName"`
	WebsiteUrl     string `json:"websiteUrl"`
}

func UserOnBoard(c *gin.Context) {
	var onboardReq UserOnBoardRequest
	if err := c.ShouldBindJSON(&onboardReq); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	q, ctx := db.GetDbConn()
	userDetail, err := q.UpdateUserDetails(*ctx, models.UpdateUserDetailsParams{
		Education:      onboardReq.Education,
		UniversityName: onboardReq.UniversityName,
		CollegeName:    onboardReq.CollegeName,
		Username:       onboardReq.Username,
		GithubUrl:      onboardReq.GithubUrl,
		WebsiteUrl:     onboardReq.WebsiteUrl,
	})
	if err != nil {
		log.Fatalf("error occured:" + err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "there was an error please try again later"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "details updated successfully",
		"data":    userDetail,
	})
}

type OrgOnBoardRequest struct {
	Username      string `json:"username" binding:"required"`
	OrgName       string `json:"orgName" binding:"required"`
	OrgAddress    string `json:"address" binding:"required"`
	Pincode       int32  `json:"pincode" binding:"required"`
	EmployeeCount int32  `json:"employeeCount" binding:"required"`
	WebsiteUrl    string `json:"websiteUrl"`
}

func OrgOnBoard(c *gin.Context) {
	fmt.Println("onboarding")
	var orgOnBoardReq OrgOnBoardRequest
	if err := c.ShouldBindJSON(&orgOnBoardReq); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(orgOnBoardReq)
	q, ctx := db.GetDbConn()
	orgDetail, err := q.UpdateOrgDetails(*ctx, models.UpdateOrgDetailsParams{
		OrgAddress:    orgOnBoardReq.OrgAddress,
		OrgName:       orgOnBoardReq.OrgName,
		EmployeeCount: orgOnBoardReq.EmployeeCount,
		Pincode:       orgOnBoardReq.Pincode,
		Username:      orgOnBoardReq.Username,
		WebsiteUrl:    orgOnBoardReq.WebsiteUrl,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "there was an internal server error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "onboarded successfully",
		"data":    orgDetail,
	})
}
