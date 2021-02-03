package tests

import (
	"fmt"
	"log"
	"testing"

	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/stretchr/testify/assert"
	"github.com/tapfunds/tfapi/api/models"
)

func TestFindAllIntegrations(t *testing.T) {

	err := refreshUserAndIntegrationTable()
	if err != nil {
		log.Fatalf("Error refreshing user and post table %v\n", err)
	}
	_, _, err = seedUsersAndIntegrations()
	if err != nil {
		log.Fatalf("Error seeding user and post  table %v\n", err)
	}
	//Where postInstance is an instance of the post initialize in setup_test.go
	integrations, err := tokenInstance.FindUserIntegrations(server.DB, 1)
	if err != nil {
		t.Errorf("this is the error getting the posts: %v\n", err)
		return
	}
	assert.Equal(t, len(*integrations), 1)
}

func TestSaveIntegration(t *testing.T) {

	err := refreshUserAndIntegrationTable()
	if err != nil {
		log.Fatalf("Error user and post refreshing table %v\n", err)
	}
	user, err := seedOneUser()
	if err != nil {
		log.Fatalf("Cannot seed user %v\n", err)
	}
	newIntegration := models.PlaidIntegration{
		ID:       1,
		ItemID:    "This is the ItemID",
		AccessToken:  "This is the AccessToken",
		PaymentID:  "This is the PaymentID",
		UserID: user.ID,
	}
	savedPost, err := newIntegration.SaveToken(server.DB)
	if err != nil {
		t.Errorf("this is the error getting the post: %v\n", err)
		return
	}
	assert.Equal(t, newIntegration.ID, savedPost.ID)
	assert.Equal(t, newIntegration.AccessToken, savedPost.AccessToken)
	assert.Equal(t, newIntegration.ItemID, savedPost.ItemID)
	assert.Equal(t, newIntegration.PaymentID, savedPost.PaymentID)
	assert.Equal(t, newIntegration.UserID, savedPost.UserID)
}

func TestUpdateAIntegration(t *testing.T) {

	err := refreshUserAndIntegrationTable()
	if err != nil {
		log.Fatalf("Error refreshing user and post table: %v\n", err)
	}
	user, token, err := seedOneUserAndOneIntegration()
	if err != nil {
		fmt.Println(token)
		log.Fatalf("Error Seeding table")
	}
	integrationUpdate := models.PlaidIntegration{
		ID:       1,
		ItemID:    "This is the new ItemID",
		AccessToken:  "This is the new AccessToken",
		PaymentID:  "This is the new PaymentID",
		UserID: user.ID,
	}
	updatedIntegration, err := integrationUpdate.UpdateAIntegration(server.DB)
	if err != nil {
		t.Errorf("this is the error updating the integration: %v\n", err)
		return
	}
	
	assert.Equal(t, updatedIntegration.ID, integrationUpdate.ID)
	assert.Equal(t, updatedIntegration.AccessToken, integrationUpdate.AccessToken)
	assert.Equal(t, updatedIntegration.ItemID, integrationUpdate.ItemID)
	assert.Equal(t, updatedIntegration.PaymentID, integrationUpdate.PaymentID)
}

func TestDeleteAIntegration(t *testing.T) {

	err := refreshUserAndIntegrationTable()
	if err != nil {
		log.Fatalf("Error refreshing user and post table: %v\n", err)
	}
	_, integration, err := seedOneUserAndOneIntegration()
	if err != nil {
		log.Fatalf("Error Seeding tables")
	}
	isDeleted, err := integration.DeleteAIntegration(server.DB)
	if err != nil {
		t.Errorf("this is the error updating the user: %v\n", err)
		return
	}
	assert.Equal(t, isDeleted, int64(1))
}

func TestDeleteUserPosts(t *testing.T) {

	err := refreshUserAndIntegrationTable()
	if err != nil {
		log.Fatalf("Error refreshing user and post table: %v\n", err)
	}
	user, _, err := seedOneUserAndOneIntegration()
	if err != nil {
		log.Fatalf("Error Seeding tables")
	}

	numberDeleted, err := tokenInstance.DeleteUserIntegrations(server.DB, user.ID)
	if err != nil {
		t.Errorf("this is the error deleting the post: %v\n", err)
		return
	}
	assert.Equal(t, numberDeleted, int64(1))
}