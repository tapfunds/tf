package tests

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/tapfunds/tf/auth/api/models"
)

// TestFindAllUserIntegrations retrieves all integrations for a user
func TestFindAllUserIntegrations(t *testing.T) {
	err := refreshUserAndPlaidIntegrationTable()
	assert.NoError(t, err)

	user, _, err := seedOneUserAndOneIntegration()
	assert.NoError(t, err)

	integrations, err := user.GetIntegrations(server.DB)
	assert.NoError(t, err)

	// Assert one integration for the seeded user
	assert.Equal(t, len(integrations), 1)
}

// TestSaveIntegration tests creating a new integration
func TestSaveIntegration(t *testing.T) {
	err := refreshUserAndPlaidIntegrationTable()
	assert.NoError(t, err)

	user, err := seedOneUser() // Seed a user for the integration
	assert.NoError(t, err)

	newIntegration := models.PlaidIntegration{
		UserID:      user.ID,
		PlaidItemID: "test_item_id",
		AccessToken: "test_access_token",
	}

	savedIntegration, err := newIntegration.Save(server.DB)
	assert.NoError(t, err)

	// Validate saved integration matches the input
	assert.Equal(t, newIntegration.UserID, savedIntegration.UserID)
	assert.Equal(t, newIntegration.PlaidItemID, savedIntegration.PlaidItemID)
	assert.Equal(t, newIntegration.AccessToken, savedIntegration.AccessToken)
}

// TestUpdateAIntegration tests updating an existing integration
func TestUpdateAIntegration(t *testing.T) {
	err := refreshUserAndPlaidIntegrationTable()
	assert.NoError(t, err)

	integration, err := seedOneIntegration()
	assert.NoError(t, err)

	updateData := map[string]interface{}{
		"item_id":      "updated_item_id",
		"access_token": "updated_access_token",
		"payment_id":   "updated_payment_id",
	}

	updatedIntegration, err := integration.Update(server.DB, updateData)
	assert.NoError(t, err)

	// Ensure ID remains the same
	assert.Equal(t, integration.ID, updatedIntegration.ID)
	assert.Equal(t, updateData["item_id"], updatedIntegration.PlaidItemID)
	assert.Equal(t, updateData["access_token"], updatedIntegration.AccessToken)
}

// TestDeleteAIntegration tests deleting an integration
func TestDeleteAIntegration(t *testing.T) {
	err := refreshUserAndPlaidIntegrationTable()
	assert.NoError(t, err)

	integration, err := seedOneIntegration()
	assert.NoError(t, err)

	// Ensure the integration exists before deletion
	integrationModel := models.PlaidIntegration{}
	foundIntegration, err := integrationModel.FindByID(server.DB, integration.ID)
	assert.NoError(t, err)
	assert.NotNil(t, foundIntegration) // Assert that the integration exists

	// Delete the integration
	err = integration.Delete(server.DB, integration.ID)
	assert.NoError(t, err)

	// Check that the integration no longer exists
	_, err = integrationModel.FindByID(server.DB, integration.ID)
	assert.Error(t, err) // Should return an error as integration no longer exists
}

// TestDeleteUserIntegrations tests deleting all integrations for a user
func TestDeleteUserIntegrations(t *testing.T) {
	err := refreshUserAndPlaidIntegrationTable()
	assert.NoError(t, err)

	user, _, err := seedOneUserAndOneIntegration()
	assert.NoError(t, err)

	// Delete all integrations for the user
	err = server.DB.Where("user_id = ?", user.ID).Delete(&models.PlaidIntegration{}).Error
	assert.NoError(t, err)

	// Check that no integrations exist for the user
	var integrations []models.PlaidIntegration
	err = server.DB.Where("user_id = ?", user.ID).Find(&integrations).Error
	assert.NoError(t, err)
	assert.Equal(t, 0, len(integrations), "Expected 0 integrations after deletion")
}
