package controllers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/jinzhu/gorm"
	"github.com/tapfunds/tf/auth/api/fileupload"
	"github.com/tapfunds/tf/auth/api/utils/errors"

	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
	"github.com/tapfunds/tf/auth/api/auth"
	"github.com/tapfunds/tf/auth/api/models"
	"github.com/tapfunds/tf/auth/api/security"
)

func (server *Server) CreateUser(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		errors.HandleError(c, http.StatusUnprocessableEntity, map[string]string{"Invalid_body": "Unable to get request"})
		return
	}

	user.Prepare()
	errorMessages := user.Validate("")
	if len(errorMessages) > 0 {
		errors.HandleError(c, http.StatusUnprocessableEntity, errorMessages)
		return
	}

	userCreated, err := user.SaveUser(server.DB)
	if err != nil {
		errors.HandleError(c, http.StatusInternalServerError, errors.FormatError(err.Error()))
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": userCreated,
	})
}

func (server *Server) GetUsers(c *gin.Context) {

	//clear previous error if any
	errList = map[string]string{}

	user := models.User{}

	users, err := user.FindAllUsers(server.DB)
	if err != nil {
		errList["No_user"] = "No User Found"
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  errList,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": users,
	})
}

func (server *Server) GetUser(c *gin.Context) {
	userID := c.Param("id")
	uid, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Request"})
		return
	}
	user := models.User{}

	userGotten, err := user.FindUserByID(server.DB, uint32(uid))
	if err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"No_user": "No User Found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": userGotten,
	})
}

func (server *Server) UpdateAvatar(c *gin.Context) {

	//clear previous error if any
	errList = map[string]string{}

	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatalf("Error getting env, %v", err)
	}

	userID := c.Param("id")
	// Check if the user id is valid
	uid, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		errList["Invalid_request"] = "Invalid Request"
		c.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  errList,
		})
		return
	}
	// Get user id from the token for valid tokens
	tokenID, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errList["Unauthorized"] = "Unauthorized"
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": http.StatusUnauthorized,
			"error":  errList,
		})
		return
	}
	// If the id is not the authenticated user id
	if tokenID != 0 && tokenID != uint32(uid) {
		errList["Unauthorized"] = "Unauthorized"
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": http.StatusUnauthorized,
			"error":  errList,
		})
		return
	}
	file, err := c.FormFile("file")
	if err != nil {
		errList["Invalid_file"] = "Invalid File"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
		})
		return
	}
	uploadedFile, fileErr := fileupload.FileUpload.UploadFile(file)
	if fileErr != nil {
		c.JSON(http.StatusUnprocessableEntity, fileErr)
		return
	}

	//Save the image path to the database
	user := models.User{}
	user.AvatarPath = uploadedFile
	user.Prepare()
	updatedUser, err := user.UpdateAUserAvatar(server.DB, uint32(uid))
	if err != nil {
		errList["Cannot_Save"] = "Cannot Save Image, Pls try again later"
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  errList,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": updatedUser,
	})
}

func (server *Server) UpdateUser(c *gin.Context) {
	userID := c.Param("id")

	// Check if the user id is valid
	uid, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Request"})
		return
	}

	// Get user id from the token for valid tokens
	tokenID, err := auth.ExtractTokenID(c.Request)
	if err != nil || tokenID == 0 || tokenID != uint32(uid) {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	// read request body
	requestBody, err := parseRequestBody(c)
	if err != nil {
		errors.HandleError(c, http.StatusUnprocessableEntity, map[string]string{"Invalid_body": "Unable to get request"})
		return
	}

	// get user by id
	formerUser, err := findUserByID(server.DB, uid)
	if err != nil {
		errors.HandleError(c, http.StatusUnprocessableEntity, map[string]string{"User_invalid": "The user does not exist"})
		return
	}

	// Handle updates
	updatedUser, err := handlePasswordUpdateAndOtherFields(formerUser, requestBody)
	if err != nil {
		if customErr, ok := err.(*errors.CustomError); ok {
			errors.HandleError(c, http.StatusUnprocessableEntity, map[string]string{customErr.Key: customErr.Message})
		} else {
			errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Unexpected_error": err.Error()})
		}
		return
	}

	updatedUser.Prepare()
	errorMessages := updatedUser.Validate("update")
	if len(errorMessages) > 0 {
		errors.HandleError(c, http.StatusUnprocessableEntity, map[string]string{"Validation_error": "Validation failed"})
		return
	}

	finalUser, err := updatedUser.UpdateAUser(server.DB, uint32(uid))
	if err != nil {
		errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Update_failed": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": finalUser,
	})
}

func (server *Server) DeleteUser(c *gin.Context) {

	// Extract and validate user ID from URL
	userID := c.Param("id")
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

	// Delete the user
	user := models.User{}
	if _, err := user.DeleteAUser(server.DB, uint32(uid)); err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"Delete_error": "User could not be deleted"})
		return
	}

	// Delete related integrations
	integration := models.PlaidIntegration{}
	if err := integration.Delete(server.DB); err != nil {
		errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Delete_error": "Failed to delete user integrations"})
		return
	}

	// Successful deletion response
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "User and related integrations deleted successfully",
	})
}

func parseRequestBody(c *gin.Context) (map[string]string, error) {
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		return nil, err
	}

	var requestBody map[string]string
	err = json.Unmarshal(body, &requestBody)
	return requestBody, err
}

func findUserByID(db *gorm.DB, uid uint64) (models.User, error) {
	var user models.User
	err := db.Debug().Model(models.User{}).Where("id = ?", uid).Take(&user).Error
	return user, err
}

// handlePasswordUpdate function
func handlePasswordUpdateAndOtherFields(formerUser models.User, requestBody map[string]string) (models.User, *errors.CustomError) {
	newUser := formerUser

	// Update username if provided
	if requestBody["username"] != "" {
		newUser.Username = requestBody["username"]
	}

	// Update email if provided
	if requestBody["email"] != "" {
		newUser.Email = requestBody["email"]
	}

	// Handle password update
	if requestBody["current_password"] != "" {
		if requestBody["new_password"] == "" {
			return newUser, &errors.CustomError{Key: "Empty_new", Message: "Please provide a new password"}
		}

		if len(requestBody["new_password"]) < 6 {
			return newUser, &errors.CustomError{Key: "Invalid_password", Message: "Password should be at least 6 characters"}
		}

		err := security.VerifyPassword(formerUser.Password, requestBody["current_password"])
		if err != nil {
			return newUser, &errors.CustomError{Key: "Password_mismatch", Message: "Current password is incorrect"}
		}

		newUser.Password = requestBody["new_password"]
	} else if requestBody["password"] != "" {
		// Set a new password without current password verification
		newUser.Password = requestBody["password"]
	}

	return newUser, nil
}
