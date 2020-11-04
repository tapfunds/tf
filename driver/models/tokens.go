package models


// PlaidIntegration Table that stores plaid access info needed for requests to linked bank accounts
type PlaidIntegration struct {
	ID          uint   `json:"id" gorm:"primary_key"`
	User        string `json:"user"`
	ItemID      string `json:"itemid"`
	AccessToken string `json:"accesstoken"`
	PaymentID   string `json:"paymentid"`
}