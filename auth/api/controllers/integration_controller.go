package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tapfunds/tf/auth/api/auth"
	"github.com/tapfunds/tf/auth/api/models"
	"github.com/tapfunds/tf/auth/api/utils/errors"
)

// CreatePlaidInfo creates a new Plaid integration.
func (server *Server) CreatePlaidInfo(c *gin.Context) {
	var integration models.PlaidIntegration
	if err := c.ShouldBindJSON(&integration); err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid JSON body"})
		return
	}

	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	integration.UserID = uid
	integration.Prepare()

	createdIntegration, err := integration.Save(server.DB)
	if err != nil {
		formattedError := errors.FormatError(err.Error())
		errors.HandleError(c, http.StatusInternalServerError, formattedError)
		return
	}

	c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated, "response": createdIntegration})
}

// GetUserIntegration retrieves a user's Plaid integrations.
func (server *Server) GetUserIntegration(c *gin.Context) {
	userID := c.Param("id")
	uid, err := strconv.ParseUint(userID, 10, 32) // Use uint32 consistently
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid User ID"})
		return
	}

	integration := models.PlaidIntegration{}
	integrations, err := integration.FindByUserID(server.DB, uint32(uid))
	if err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"No_integrations": "No Plaid integrations found"}) // More descriptive message
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "response": integrations})
}

// UpdateIntegration updates a Plaid integration.
func (server *Server) UpdateIntegration(c *gin.Context) {
	integrationID := c.Param("id")
	iid, err := strconv.ParseUint(integrationID, 10, 32)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Integration ID"})
		return
	}

	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	integration := &models.PlaidIntegration{} // Declare as a pointer
	integration, err = integration.FindByID(server.DB, uint32(iid))
	if err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"No_integration": "No integration Found"})
		return
	}

	if uid != integration.UserID {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}
	var updateData map[string]interface{}
	if err := c.ShouldBindJSON(&updateData); err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid JSON body"})
		return
	}

	updatedIntegration, err := integration.Update(server.DB, updateData)
	if err != nil {
		formattedError := errors.FormatError(err.Error())
		errors.HandleError(c, http.StatusInternalServerError, formattedError)
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "response": updatedIntegration})
}

// DeleteIntegration deletes a Plaid integration.
func (server *Server) DeleteIntegration(c *gin.Context) {
	integrationID := c.Param("id")
	iid, err := strconv.ParseUint(integrationID, 10, 32)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Integration ID"})
		return
	}

	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	integration := &models.PlaidIntegration{} // Declare as a pointer
	integration, err = integration.FindByID(server.DB, uint32(iid))
	if err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"No_integration": "No integration Found"})
		return
	}

	if uid != integration.UserID {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	err = integration.Delete(server.DB, uint32(iid)) // Use the ID from the URL
	if err != nil {
		errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Delete_error": "Failed to delete integration"}) // Improved error message
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "response": "Integration deleted"})
}
