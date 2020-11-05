package controllers

import (
	"tfdb/models"
	"net/http"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// FindPlaidInfo ... Get all users
// GET /books
// Get all books
func FindPlaidInfos(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var info []models.PlaidIntegration
	db.Find(&info)

	c.JSON(http.StatusOK, gin.H{"data": info})
}

// POST /books
// Create new books
func CreatePlaidInfo(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	// Validate input
	var input models.CreatePlaidIntegration
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create Book
	token := models.PlaidIntegration{User: input.User, ItemID: input.ItemID, AccessToken: input.AccessToken, PaymentID: input.PaymentID}
	db.Create(&token)

	c.JSON(http.StatusOK, gin.H{"data": token})

}

// GET /books/:id
// Find a book
func FindPlaidInfo(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	// Get model if exist
	var info models.PlaidIntegration
	if err := db.Where("id = ?", c.Param("id")).First(&info).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": info})
}

// DELETE /books/:id
// Delete a book
func DeletePlaidInfo(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	// Get model if exist
	var info models.PlaidIntegration
	if err := db.Where("id = ?", c.Param("id")).First(&info).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.Delete(&info)

	c.JSON(http.StatusOK, gin.H{"data": true})
}