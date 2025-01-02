package tests

import (
	"log"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/tapfunds/tf/auth/api/models"
)

// TestFindAllUserIntegrations retrieves all integrations for a user
func TestFindAllUserIntegrations(t *testing.T) {
	err := refreshUserAndPlaidIntegrationTable()
	if err != nil {
		log.Fatal(err)
	}

	user, _, err := seedOneUserAndOneIntegration()
	if err != nil {
		t.Fatal(err)
	}

	integrations, err := user.GetIntegrations(server.DB)
	if err != nil {
		t.Errorf("failed to retrieve integrations: %v", err)
		return
	}

	assert.Equal(t, len(integrations), 1) // Assert one integration for the seeded user
}

// TestSaveIntegration tests creating a new integration
func TestSaveIntegration(t *testing.T) {
	err := refreshUserAndPlaidIntegrationTable()
	if err != nil {
		log.Fatal(err)
	}

	user, err := seedOneUser() // Seed a user for the integration
	if err != nil {
		t.Fatal(err)
	}

	newIntegration := models.PlaidIntegration{
		UserID:      user.ID,
		PlaidItemID: "test_item_id",
		AccessToken: "test_access_token",
	}

	savedIntegration, err := newIntegration.Save(server.DB)
	if err != nil {
		t.Errorf("failed to save integration: %v", err)
		return
	}

	assert.Equal(t, newIntegration.UserID, savedIntegration.UserID)
	assert.Equal(t, newIntegration.PlaidItemID, savedIntegration.PlaidItemID)
	assert.Equal(t, newIntegration.AccessToken, savedIntegration.AccessToken)
}

// TestUpdateAIntegration tests updating an existing integration
func TestUpdateAIntegration(t *testing.T) {
	err := refreshUserAndPlaidIntegrationTable()
	if err != nil {
		log.Fatal(err)
	}

	integration, err := seedOneIntegration()
	if err != nil {
		t.Fatal(err)
	}

	updateData := map[string]interface{}{
		"item_id":      "updated_item_id",
		"access_token": "updated_access_token",
		"payment_id":   "updated_payment_id",
	}

	updatedIntegration, err := integration.Update(server.DB, updateData)
	if err != nil {
		t.Errorf("failed to update integration: %v", err)
		return
	}

	assert.Equal(t, integration.ID, updatedIntegration.ID) // Ensure ID remains the same
	assert.Equal(t, updateData["item_id"], updatedIntegration.PlaidItemID)
	assert.Equal(t, updateData["access_token"], updatedIntegration.AccessToken)
}

// TestDeleteAIntegration tests deleting an integration
func TestDeleteAIntegration(t *testing.T) {
	err := refreshUserAndIntegrationTable()
	if err != nil {
		log.Fatal(err)
	}

	_, integration, err := seedOneUserAndOneIntegration()
	if err != nil {
		t.Fatal(err)
	}
	integrationModel := models.PlaidIntegration{}
	err = integrationModel.Delete(server.DB, integration.ID)
	if err != nil {
		t.Errorf("failed to delete integration: %v", err)
		return
	}
	_, err = integrationModel.FindByID(server.DB, integration.ID)
	assert.Error(t, err)
}

// TestDeleteUserIntegrations tests deleting all integrations for a user
func TestDeleteUserIntegrations(t *testing.T) {
	err := refreshUserAndIntegrationTable()
	if err != nil {
		log.Fatal(err)
	}

	user, _, err := seedOneUserAndOneIntegration()
	if err != nil {
		t.Fatal(err)
	}
	integrationModel := models.PlaidIntegration{}
	err = integrationModel.DeleteByUserID(server.DB, user.ID)
	if err != nil {
		t.Errorf("failed to delete user integrations: %v", err)
		return
	}
	integrations, err := integrationModel.FindByUserID(server.DB, user.ID)
	if err != nil {
		t.Errorf("failed to get user integrations: %v", err)
		return
	}
	assert.Equal(t, 0, len(integrations))
}
