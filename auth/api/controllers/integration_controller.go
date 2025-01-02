package controllers

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/tapfunds/tf/auth/api/auth"
	"github.com/tapfunds/tf/auth/api/models"
	"github.com/tapfunds/tf/auth/api/utils/errors"

	"github.com/gin-gonic/gin"
)

// Create new token
func (server *Server) CreatePlaidInfo(c *gin.Context) {
	//clear previous error if any
	errList = map[string]string{}

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Unable to read request body"})
		return
	}

	integration := models.PlaidIntegration{}
	err = json.Unmarshal(body, &integration)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid JSON body"})
		return
	}

	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	// check if the user exist:
	user := models.User{}
	err = server.DB.Debug().Model(models.User{}).Where("id = ?", uid).Take(&user).Error
	if err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	integration.UserID = uid //the authenticated user is the one creating the post
	integration.Prepare()
	postCreated, err := integration.Save(server.DB)
	if err != nil {
		errList := errors.FormatError(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  errList,
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": postCreated,
	})
}

func (server *Server) GetUserIntegration(c *gin.Context) {
	userID := c.Param("id")
	uid, err := strconv.ParseUint(userID, 10, 64)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid User ID"})
		return
	}

	integration := models.PlaidIntegration{}
	integrations, err := integration.FindByUserID(server.DB, uint32(uid))
	if err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"No_post": "No Plaid Credentials Found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": integrations,
	})
}

func (server *Server) UpdateIntegration(c *gin.Context) {

	postID := c.Param("id")
	pid, err := strconv.ParseUint(postID, 10, 64)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Post ID"})
		return
	}

	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	integration := models.PlaidIntegration{}
	err = server.DB.Debug().Model(models.PlaidIntegration{}).Where("id = ?", pid).Take(&integration).Error
	if err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"No_post": "No Post Found"})
		return
	}

	if uid != integration.UserID {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Unable to read request body"})
		return
	}

	editedIntegration := models.PlaidIntegration{}
	err = json.Unmarshal(body, &editedIntegration)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid JSON body"})
		return
	}

	editedIntegration.ID = integration.ID
	editedIntegration.UserID = integration.UserID

	integrationtUpdated, err := editedIntegration.Update(server.DB)
	if err != nil {
		errList := errors.FormatError(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  errList,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": integrationtUpdated,
	})
}

func (server *Server) DeleteIntegration(c *gin.Context) {

	postID := c.Param("id")
	pid, err := strconv.ParseUint(postID, 10, 64)
	if err != nil {
		errors.HandleError(c, http.StatusBadRequest, map[string]string{"Invalid_request": "Invalid Post ID"})
		return
	}

	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	integration := models.PlaidIntegration{}
	err = server.DB.Debug().Model(models.PlaidIntegration{}).Where("id = ?", pid).Take(&integration).Error
	if err != nil {
		errors.HandleError(c, http.StatusNotFound, map[string]string{"No_post": "No Post Found"})
		return
	}

	if uid != integration.UserID {
		errors.HandleError(c, http.StatusUnauthorized, map[string]string{"Unauthorized": "Unauthorized"})
		return
	}

	err = integration.Delete(server.DB)
	if err != nil {
		errors.HandleError(c, http.StatusInternalServerError, map[string]string{"Other_error": "Please try again later"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Item deleted",
	})
}
