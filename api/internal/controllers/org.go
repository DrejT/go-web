package controllers

import (
	"fmt"
	"net/http"

	"github.com/drejt/api/internal/db"
	"github.com/drejt/api/internal/models"
	"github.com/gin-contrib/sessions"
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

	// session := sessions.Default(c)
	// username, ok := session.Get("username").(string)
	// userType := session.Get("userType")
	// if !ok || username == "" {
	// 	c.JSON(http.StatusConflict, gin.H{"error": "please login first"})
	// }

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

	q, ctx := db.GetDbConn()
	jobs, err := q.GetOrgJobs(*ctx, orgJob.OrgName)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "no not found"})
		return
	}

	if len(jobs) < 1 {
		c.JSON(http.StatusOK, gin.H{"error": "no jobs listed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "successfully fetched org jobs", "data": jobs})
}

type AddNewJobRequest struct {
	OrgName     string `json:"username" binding:"required"`
	Title       string `json:"Title" binding:"required"`
	Description string `json:"Description" binding:"required"`
	Location    string `json:"Location" binding:"required"`
	Experience  string `json:"Experience" binding:"required"`
	JobType     string `json:"JobType" binding:"required"`
	Flexibility string `json:"Flexibility" binding:"required"`
}

func AddNewJob(c *gin.Context) {
	var AddJobReq AddNewJobRequest
	if err := c.ShouldBindJSON(&AddJobReq); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	newJob := models.CreateNewJobParams{
		OrgName:     AddJobReq.OrgName,
		Title:       AddJobReq.Title,
		Description: AddJobReq.Description,
		JobType:     AddJobReq.JobType,
		Experience:  AddJobReq.Experience,
		Flexibility: AddJobReq.Flexibility,
		Location:    AddJobReq.Location,
	}

	q, ctx := db.GetDbConn()
	job, err := q.CreateNewJob(*ctx, newJob)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "there was an error while creating new job"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "added job successfully", "data": job})
}

type OrgJobRequest struct {
	OrgName string `form:"orgName" binding:"required"`
	JobId   int    `form:"jobId" binding:"required"`
}

func GetOrgJobByID(c *gin.Context) {
	var Request OrgJobRequest
	if err := c.ShouldBind(&Request); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	q, ctx := db.GetDbConn()
	job, err := q.GetJobById(*ctx, int64(Request.JobId))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "the job was not found"})
		return
	}
	fmt.Println(job, err)
	c.JSON(http.StatusOK, gin.H{"message": "retireved job successfully", "data": job})
}

type ApplyRequest struct {
	JobId int `json:"jobID" binding:"required"`
}

func ApplyJob(c *gin.Context) {
	var applyReq ApplyRequest
	if err := c.ShouldBindJSON(&applyReq); err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"error": err.Error(),
		})
		return
	}

	q, ctx := db.GetDbConn()
	job, err := q.GetJobById(*ctx, int64(applyReq.JobId))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "job not found"})
	}

	session := sessions.Default(c)
	username, ok := session.Get("username").(string)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid session, please login again",
		})
		return
	}

	user, err := q.GetUser(*ctx, username)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found, please login again"})
		return
	}

	application := models.CreateNewJobApplicationParams{JobID: job.ID, ApplicantID: user.ID}
	_, err = q.CreateNewJobApplication(*ctx, application)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "please try again later"})
		return
	}
	d := make(map[string]string)
	d["username"] = username
	d["message"] = "applied successfully"

	c.JSON(http.StatusOK, gin.H{"data": d})
}
