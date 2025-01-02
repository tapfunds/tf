package tests

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/tapfunds/tf/auth/api/models"
)

func TestFindAllUsers(t *testing.T) {
	err := refreshUserTable()
	assert.NoError(t, err)

	_, err = seedUsers() // Seed 2 users
	assert.NoError(t, err)

	user := models.User{}
	users, err := user.FindAllUsers(server.DB)
	assert.NoError(t, err)

	assert.Equal(t, 2, len(*users))
}

func TestSaveUser(t *testing.T) {
	err := refreshUserTable()
	assert.NoError(t, err)

	newUser := models.User{
		Email:    "test@example.com",
		Username: "test",
		Password: "password",
	}

	savedUser, err := newUser.SaveUser(server.DB)
	assert.NoError(t, err)

	assert.Equal(t, newUser.Email, savedUser.Email)
	assert.Equal(t, newUser.Username, savedUser.Username)
}

func TestFindUserByID(t *testing.T) {
	err := refreshUserTable()
	assert.NoError(t, err)

	user, err := seedOneUser()
	assert.NoError(t, err)

	foundUser, err := user.FindUserByID(server.DB, user.ID)
	assert.NoError(t, err)

	assert.Equal(t, foundUser.ID, user.ID)
	assert.Equal(t, foundUser.Email, user.Email)
	assert.Equal(t, foundUser.Username, user.Username)
}

func TestUpdateAUser(t *testing.T) {
	err := refreshUserTable()
	assert.NoError(t, err)

	user, err := seedOneUser()
	assert.NoError(t, err)

	userUpdate := models.User{
		Username:  "modiUpdate",
		Email:     "modiupdate@example.com",
		Password:  "password",
		UpdatedAt: time.Now(),
	}

	updatedUser, err := userUpdate.UpdateAUser(server.DB, user.ID, map[string]interface{}{
		"username": userUpdate.Username,
		"email":    userUpdate.Email,
		"password": userUpdate.Password,
	})
	assert.NoError(t, err)

	assert.Equal(t, updatedUser.Username, userUpdate.Username)
	assert.Equal(t, updatedUser.Email, userUpdate.Email)
}

func TestDeleteAUser(t *testing.T) {
	err := refreshUserTable()
	assert.NoError(t, err)

	user, err := seedOneUser()
	assert.NoError(t, err)

	isDeleted, err := user.DeleteAUser(server.DB, user.ID)
	assert.NoError(t, err)

	assert.Equal(t, int64(1), isDeleted)
}
