package models

import (
	"errors"
	"html"
	"log"
	"os"
	"strings"
	"time"


	"github.com/badoux/checkmail"
	"github.com/jinzhu/gorm"
)


// PlaidIntegration Table that stores plaid access info needed for requests to linked bank accounts
type PlaidIntegration struct {
	ID          uint     `gorm:"primary_key;auto_increment" json:"id"`
	UserID      string   `json:"userid"`
	ItemID      string   `json:"itemid"`
	AccessToken string   `json:"accesstoken"`
	PaymentID   string   `json:"paymentid"`
	CreatedAt  time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt  time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

// CreatePlaidIntegration create new entries in table
type CreatePlaidIntegration struct {
	UserID      string    `json:"userid" binding:"required"`
	ItemID      string    `json:"itemid" binding:"required"`
	AccessToken string    `json:"accesstoken" binding:"required"`
	PaymentID   string    `json:"paymentid" binding:"required"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}
