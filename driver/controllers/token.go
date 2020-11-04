package controllers

import (
	"fmt"
	"net/http"
	"tfdb/models"
	"github.com/gin-gonic/gin"
)

// GetPlaidInfo ... Get all users
func GetPlaidInfo(c *gin.Context) {
	var plaidInfo []models.PlaidIntegration
	err := models.GetPlaidInfo(&plaidInfo)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, plaidInfo)
	}
}

// CreatePlaidInfo ... Create User
func CreatePlaidInfo(c *gin.Context) {
	var plaidInfo models.PlaidIntegration
	c.BindJSON(&plaidInfo)
	err := models.CreatePlaidInfo(&plaidInfo)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, plaidInfo)
	}
}

// GetPlaidInfoByID ... Get the plaidInfo by id
func GetPlaidInfoByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var plaidInfo models.PlaidIntegration
	err := models.GetPlaidInfoByID(&plaidInfo, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, plaidInfo)
	}
}

// UpdatePlaidInfo ... Update the plaidInfo information
func UpdatePlaidInfo(c *gin.Context) {
	var plaidInfo models.PlaidIntegration
	id := c.Params.ByName("id")
	err := models.GetPlaidInfoByID(&plaidInfo, id)
	if err != nil {
		c.JSON(http.StatusNotFound, plaidInfo)
	}
	c.BindJSON(&plaidInfo)
	err = models.UpdatePlaidInfo(&plaidInfo, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, plaidInfo)
	}
}

// DeletePlaidInfo ... Delete the plaidInfo
func DeletePlaidInfo(c *gin.Context) {
	var plaidInfo models.PlaidIntegration
	id := c.Params.ByName("id")
	err := models.DeletePlaidInfo(&plaidInfo, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id" + id: "is deleted"})
	}
}
