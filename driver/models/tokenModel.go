package models

// Encrypt these values irl
// PlaidIntegration Table that stores plaid access info needed for requests to linked bank accounts
type PlaidIntegration struct {
	User        string `json:"user"`
	ItemID      string `json:"itemid"`
	AccessToken string `json:"accesstoken"`
	PaymentID   string `json:"paymentid"`
}

func (b *PlaidIntegration) TableName() string {
 return "auth"
}