// models/plaid_integration.go
package models

import (
	"html"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
)

// PlaidIntegration represents a user's linked bank account via Plaid.
type PlaidIntegration struct {
	ID          uint32    `gorm:"primary_key;auto_increment" json:"id"`
	UserID      uint32    `gorm:"not null;index" json:"user_id"` // Add index for faster queries
	PlaidItemID string    `gorm:"not null" json:"plaid_item_id"`
	AccessToken string    `gorm:"not null" json:"access_token"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

// Prepare sanitizes input and initializes timestamps.
func (i *PlaidIntegration) Prepare() {
	i.PlaidItemID = html.EscapeString(strings.TrimSpace(i.PlaidItemID))
	i.AccessToken = html.EscapeString(strings.TrimSpace(i.AccessToken))
	i.CreatedAt = time.Now()
	i.UpdatedAt = time.Now()
}

// Save creates a new PlaidIntegration record.
func (i *PlaidIntegration) Save(db *gorm.DB) (*PlaidIntegration, error) {
	err := db.Create(&i).Error
	if err != nil {
		return nil, err
	}
	return i, nil
}

// FindByUserID retrieves all PlaidIntegrations for a user.
func (i *PlaidIntegration) FindByUserID(db *gorm.DB, userID uint32) ([]PlaidIntegration, error) {
	var integrations []PlaidIntegration
	err := db.Where("user_id = ?", userID).Order("created_at desc").Find(&integrations).Error
	if err != nil {
		return nil, err
	}
	return integrations, nil
}

// FindByID retrieves a specific PlaidIntegration by its ID.
func (i *PlaidIntegration) FindByID(db *gorm.DB, id uint32) (*PlaidIntegration, error) {
	err := db.Where("id = ?", id).First(i).Error
	if err != nil {
		return nil, err
	}
	return i, nil
}

// Update updates an existing PlaidIntegration.
func (i *PlaidIntegration) Update(db *gorm.DB, updateData map[string]interface{}) (*PlaidIntegration, error) {
	err := db.Model(&PlaidIntegration{}).Where("id = ?", i.ID).Updates(updateData).Error
	if err != nil {
		return nil, err
	}
	return i.FindByID(db, i.ID)
}

// Delete removes a specific PlaidIntegration.
func (i *PlaidIntegration) Delete(db *gorm.DB, id uint32) error {
	return db.Where("id = ?", id).Delete(&PlaidIntegration{}).Error
}

// DeleteByUserID removes all PlaidIntegrations for a given UserID.
func (i *PlaidIntegration) DeleteByUserID(db *gorm.DB, userID uint32) error {
	return db.Where("user_id = ?", userID).Delete(&PlaidIntegration{}).Error
}
