// Refactored Model
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
	UserID      uint32    `gorm:"not null" json:"user_id"`
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
	if err := db.Create(&i).Error; err != nil {
		return nil, err
	}
	return i, nil
}

// FindByUserID retrieves all PlaidIntegrations for a user.
func (i *PlaidIntegration) FindByUserID(db *gorm.DB, userID uint32) ([]PlaidIntegration, error) {
	var integrations []PlaidIntegration
	if err := db.Where("user_id = ?", userID).Order("created_at desc").Find(&integrations).Error; err != nil {
		return nil, err
	}
	return integrations, nil
}

// Update updates an existing PlaidIntegration.
func (i *PlaidIntegration) Update(db *gorm.DB) (*PlaidIntegration, error) {
	if err := db.Model(&PlaidIntegration{}).Where("id = ?", i.ID).Updates(i).Error; err != nil {
		return nil, err
	}
	return i, nil
}

// Delete removes a specific PlaidIntegration.
func (i *PlaidIntegration) Delete(db *gorm.DB) error {
	return db.Where("id = ?", i.ID).Delete(&PlaidIntegration{}).Error
}
