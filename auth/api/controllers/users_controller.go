package controllers

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/tapfunds/tf/auth/api/auth"
	"github.com/tapfunds/tf/auth/api/fileupload"
	"github.com/tapfunds/tf/auth/api/models"
	"github.com/tapfunds/tf/auth/api/security"
	"github.com/tapfunds/tf/auth/api/utils/errors"
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
	userID := c.Param("id")
	uid, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Request"})
		return
	}

	tokenID, err := auth.ExtractTokenID(c.Request)
	if err != nil || tokenID == 0 || tokenID != uint32(uid) {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		errors.HandleError(c, http.StatusUnprocessableEntity, map[string]string{"Invalid_file": "Invalid File"})
		return
	}

	uploadedFile, fileErr := fileupload.FileUpload.UploadFile(file)
	if fileErr != nil {
		errors.HandleError(c, http.StatusUnprocessableEntity, fileErr)
		return
	}

	user := models.User{AvatarPath: uploadedFile} // Set AvatarPath directly
	updatedUser, err := user.UpdateAUserAvatar(server.DB, uint32(uid))
	if err != nil {
		errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Cannot_Save": "Cannot Save Image, Pls try again later"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": updatedUser,
	})
}

func (server *Server) UpdateUser(c *gin.Context) {
	userID := c.Param("id")
	uid, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Request"})
		return
	}

	tokenID, err := auth.ExtractTokenID(c.Request)
	if err != nil || tokenID == 0 || tokenID != uint32(uid) {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	requestBody, err := parseRequestBody(c)
	if err != nil {
		errors.HandleError(c, http.StatusUnprocessableEntity, map[string]string{"Invalid_body": "Unable to get request"})
		return
	}

	formerUser, err := findUserByID(server.DB, uid)
	if err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"User_invalid": "The user does not exist"}) // Corrected status code
		return
	}

	updatedUser, customErr := handlePasswordUpdateAndOtherFields(formerUser, requestBody)
	if customErr != nil {
		errors.HandleError(c, http.StatusUnprocessableEntity, map[string]string{customErr.Key: customErr.Message})
		return
	}

	updatedUser.Prepare()
	errorMessages := updatedUser.Validate("update")
	if len(errorMessages) > 0 {
		errors.HandleError(c, http.StatusUnprocessableEntity, errorMessages) // Pass errorMessages directly
		return
	}
	updateData := make(map[string]interface{})
	if updatedUser.Username != formerUser.Username {
		updateData["username"] = updatedUser.Username
	}
	if updatedUser.Email != formerUser.Email {
		updateData["email"] = updatedUser.Email
	}
	if updatedUser.Password != formerUser.Password {
		updateData["password"] = updatedUser.Password
	}

	finalUser, err := updatedUser.UpdateAUser(server.DB, uint32(uid), updateData)
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
	if err := integration.DeleteByUserID(server.DB, uint32(uid)); err != nil {
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
	err := db.Where("id = ?", uid).First(&user).Error // Removed .Debug()
	return user, err
}

// handlePasswordUpdate function
func handlePasswordUpdateAndOtherFields(formerUser models.User, requestBody map[string]string) (models.User, *errors.CustomError) {
	newUser := formerUser

	if requestBody["username"] != "" {
		newUser.Username = requestBody["username"]
	}

	if requestBody["email"] != "" {
		newUser.Email = requestBody["email"]
	}

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
		newUser.Password = requestBody["password"]
	}

	return newUser, nil
}
