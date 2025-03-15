package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tapfunds/tf/auth/api/auth"
	"github.com/tapfunds/tf/auth/api/utils/errors"
)

func (server *Server) CheckToken(c *gin.Context) {

	// Extract and validate user ID from URL
	userID := c.Param("token")
	uid, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Request"})
		return
	}

	// Extract user ID from token
	tokenID, err := auth.ExtractTokenID(c.Request)
	if err != nil || tokenID == 0 || tokenID != uint32(uid) {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	// Successful validation response
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Token IS valid",
	})
}
