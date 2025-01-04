package tests

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/tapfunds/tf/auth/api/models"
	testsetup "github.com/tapfunds/tf/auth/tests/setup"
)

func TestSaveUser(t *testing.T) {
	testsetup.SetupDatabase()

	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))

	newUser := models.User{
		Email:    "test@example.com",
		Username: "test",
		Password: "password",
	}

	savedUser, err := newUser.SaveUser(testsetup.Server.DB)
	assert.NoError(t, err)

	// Validate that saved user matches the input
	assert.Equal(t, newUser.Email, savedUser.Email)
	assert.Equal(t, newUser.Username, savedUser.Username)
	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}

func TestFindUserByID(t *testing.T) {
	testsetup.SetupDatabase()

	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))

	user, err := testsetup.SeedUser("Nala", "nala@example.com", "password")
	assert.NoError(t, err)

	// Fetch the user by ID
	foundUser, err := user.FindUserByID(testsetup.Server.DB, user.ID)
	assert.NoError(t, err)

	// Validate user properties match
	assert.Equal(t, foundUser.ID, user.ID)
	assert.Equal(t, foundUser.Email, user.Email)
	assert.Equal(t, foundUser.Username, user.Username)
	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}

func TestUpdateAUser(t *testing.T) {
	testsetup.SetupDatabase()

	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))

	user, err := testsetup.SeedUser("Nala", "nala@example.com", "password")
	assert.NoError(t, err)

	userUpdate := models.User{
		Username:  "modiUpdate",
		Email:     "modiupdate@example.com",
		Password:  "password",
		UpdatedAt: time.Now(),
	}

	updatedUser, err := userUpdate.UpdateAUser(testsetup.Server.DB, user.ID, map[string]interface{}{
		"username": userUpdate.Username,
		"email":    userUpdate.Email,
		"password": userUpdate.Password,
	})
	assert.NoError(t, err)

	// Assert that the user details are updated correctly
	assert.Equal(t, updatedUser.Username, userUpdate.Username)
	assert.Equal(t, updatedUser.Email, userUpdate.Email)

	// Check that the UpdateAt field was updated (allowing for small time delta)
	assert.WithinDuration(t, updatedUser.UpdatedAt, userUpdate.UpdatedAt, time.Second)
	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}

func TestDeleteAUser(t *testing.T) {
	testsetup.SetupDatabase()

	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))

	user, err := testsetup.SeedUser("Nala", "nala@example.com", "password")
	assert.NoError(t, err)

	// Delete the user and verify the deletion response
	isDeleted, err := user.DeleteAUser(testsetup.Server.DB, user.ID)
	assert.NoError(t, err)

	// Ensure that deletion returns 1 (indicating success)
	assert.Equal(t, int64(1), isDeleted)
	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}
