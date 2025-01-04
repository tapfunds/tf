package tests

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/tapfunds/tf/auth/api/models"
	testsetup "github.com/tapfunds/tf/auth/tests/setup"
)

func TestFindAllUserIntegrations(t *testing.T) {
	testsetup.SetupDatabase()
	// Reset the database tables before the test
	err := testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{})
	assert.NoError(t, err)

	// Seed user
	user, err := testsetup.SeedUser("Dee", "dee@example.com", "password")
	assert.NoError(t, err)

	// Seed integration
	_, err = testsetup.SeedIntegration(user.ID, "test_item_id", "test_access_token")
	assert.NoError(t, err)

	// Fetch integrations for user
	integrations, err := user.GetIntegrations(testsetup.Server.DB)
	assert.NoError(t, err)
	assert.Len(t, integrations, 1)

	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}

}

func TestSaveIntegration(t *testing.T) {
	testsetup.SetupDatabase()

	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))

	user, err := testsetup.SeedUser("Dee", "dee@example.com", "password")
	assert.NoError(t, err)

	integration := models.PlaidIntegration{
		UserID:      user.ID,
		PlaidItemID: "new_item_id",
		AccessToken: "new_access_token",
	}

	savedIntegration, err := integration.Save(testsetup.Server.DB)
	assert.NoError(t, err)
	assert.Equal(t, integration.PlaidItemID, savedIntegration.PlaidItemID)
	assert.Equal(t, integration.AccessToken, savedIntegration.AccessToken)
	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}

func TestUpdateIntegration(t *testing.T) {
	testsetup.SetupDatabase()

	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))

	user, err := testsetup.SeedUser("Dee", "dee@example.com", "password")
	assert.NoError(t, err)

	integration, err := testsetup.SeedIntegration(user.ID, "old_item_id", "old_access_token")
	assert.NoError(t, err)

	updateData := map[string]interface{}{
		"plaid_item_id": "updated_item_id",
		"access_token":  "updated_access_token",
	}

	updatedIntegration, err := integration.Update(testsetup.Server.DB, updateData)
	assert.NoError(t, err)
	assert.Equal(t, updateData["plaid_item_id"], updatedIntegration.PlaidItemID)
	assert.Equal(t, updateData["access_token"], updatedIntegration.AccessToken)
	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}

func TestDeleteIntegration(t *testing.T) {
	testsetup.SetupDatabase()

	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))

	user, err := testsetup.SeedUser("Dee", "dee@example.com", "password")
	assert.NoError(t, err)

	integration, err := testsetup.SeedIntegration(user.ID, "item_id", "access_token")
	assert.NoError(t, err)

	err = integration.Delete(testsetup.Server.DB, integration.ID)
	assert.NoError(t, err)

	integrationModel := &models.PlaidIntegration{} // Create a pointer to PlaidIntegration
	_, err = integrationModel.FindByID(testsetup.Server.DB, integration.ID)
	assert.Error(t, err)
	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}

func TestDeleteUserIntegrations(t *testing.T) {
	testsetup.SetupDatabase()

	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))

	user, err := testsetup.SeedUser("Dee", "dee@example.com", "password")
	assert.NoError(t, err)

	_, err = testsetup.SeedIntegration(user.ID, "item_id", "access_token")
	assert.NoError(t, err)

	err = testsetup.Server.DB.Where("user_id = ?", user.ID).Delete(&models.PlaidIntegration{}).Error
	assert.NoError(t, err)

	var integrations []models.PlaidIntegration
	err = testsetup.Server.DB.Where("user_id = ?", user.ID).Find(&integrations).Error
	assert.NoError(t, err)
	assert.Empty(t, integrations)
	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}
