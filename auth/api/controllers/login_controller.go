package controllers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/jinzhu/gorm"
	"github.com/tapfunds/tf/auth/api/auth"
	"github.com/tapfunds/tf/auth/api/models"
	"github.com/tapfunds/tf/auth/api/security"
	"github.com/tapfunds/tf/auth/api/utils/errors"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func (server *Server) Login(c *gin.Context) {
	var loginRequest models.LoginRequest
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid JSON body"})
		return
	}

	// Validate the login request
	if err := validate.Struct(loginRequest); err != nil {
		errorMessages := make(map[string]string)
		for _, err := range err.(validator.ValidationErrors) {
			errorMessages[err.Field()] = fmt.Sprintf("Invalid %s", err.Field())
		}
		errors.HandleError(c, http.StatusUnprocessableEntity, errorMessages)
		return
	}

	var user models.User
	if err := server.DB.Debug().Where("email = ?", loginRequest.Email).Take(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Authentication_failed": "Invalid email or password"})
		} else {
			errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Database_error": "An unexpected error occurred"})
		}
		return
	}

	if err := security.VerifyPassword(user.Password, loginRequest.Password); err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Authentication_failed": "Invalid email or password"})
		return
	}

	token, err := auth.CreateToken(user.ID)
	if err != nil {
		log.Printf("Failed to create token: %v", err)
		errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Token_error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"user": map[string]interface{}{
			"token":       token,
			"id":          user.ID,
			"email":       user.Email,
			"avatar_path": user.AvatarPath,
			"firstname":   user.Firstname,
			"lastname":    user.Lastname,
		},
	})
}
