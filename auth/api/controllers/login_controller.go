package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tapfunds/tf/auth/api/auth"
	"github.com/tapfunds/tf/auth/api/models"
	"github.com/tapfunds/tf/auth/api/security"
	"github.com/tapfunds/tf/auth/api/utils/errors"
)

// Handles the HTTP request, parses and validates input, and calls SignIn.
func (server *Server) Login(c *gin.Context) {
	var loginRequest models.User
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid JSON body"})
		return
	}

	// Prepare and validate user
	loginRequest.Prepare()
	errorMessages := loginRequest.Validate("login")
	if len(errorMessages) > 0 {
		errors.HandleError(c, http.StatusUnprocessableEntity, errorMessages)
		return
	}

	var user models.User
	if err := server.DB.Debug().Where("email = ?", loginRequest.Email).Take(&user).Error; err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Authentication_failed": "Invalid email or password"})
		return
	}

	if err := security.VerifyPassword(user.Password, loginRequest.Password); err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Authentication_failed": "Invalid email or password"})
		return
	}

	token, err := auth.CreateToken(user.ID)
	if err != nil {
		errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Token_error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"response": map[string]interface{}{
			"token":       token,
			"id":          user.ID,
			"email":       user.Email,
			"avatar_path": user.AvatarPath,
			"username":    user.Username,
		},
	})
}
