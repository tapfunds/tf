package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/tapfunds/tf/auth/api/auth"
	"github.com/tapfunds/tf/auth/api/models"
	"github.com/tapfunds/tf/auth/api/utils/errors"
)

func (server *Server) Signup(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid JSON body"})
		return
	}

	// Prepare and validate user input
	user.Prepare()
	errorMessages := user.Validate("")
	if len(errorMessages) > 0 {
		errors.HandleError(c, http.StatusUnprocessableEntity, errorMessages)
		return
	}

	// Save the new user to the database
	userCreated, err := user.SaveUser(server.DB)
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			errors.HandleError(c, http.StatusConflict, map[string]string{"User_exists": "User with this email already exists"})
		} else {
			errors.HandleError(c, http.StatusInternalServerError, errors.FormatError(err.Error()))
		}
		return
	}

	// Generate authentication token
	token, err := auth.CreateToken(userCreated.ID, false)
	if err != nil {
		log.Printf("Failed to create token: %v", err)
		errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Token_error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status": http.StatusCreated,
		"user": map[string]interface{}{
			"token":       token,
			"id":          userCreated.ID,
			"email":       userCreated.Email,
			"avatar_path": userCreated.AvatarPath,
			"firstname":   userCreated.Firstname,
			"lastname":    userCreated.Lastname,
		},
	})
}
