package main

import (
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	// "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

// Encrypt these values irl
// PlaidIntegration Table that stores plaid access info needed for requests to linked bank accounts
type PlaidIntegration struct {
	gorm.Model
	User        string
	ItemID      string
	AccessToken string
	PaymentID   string
}

// Transactions table stores user transactions over time for data modeling
type Transactions struct {
	gorm.Model
	User           string
	Name           string
	Value          float32
	Date           time.Time
	PaymentChannel string
}

var db *gorm.DB

var err error
var (
	APP_PORT = "8080"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	// dsn := "user=postgres password=*Grow dbname=tapfunds port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	// db, conFail := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	
	// if conFail != nil {
	// 	panic("failed to connect database")

	// }

	router.GET("/transactions", GetTransactions)


	err := router.Run(":" + APP_PORT)
	if err != nil {
		panic("unable to start server")
	}

}

// GetTransactions retreives all transactions
func GetTransactions(c *gin.Context) {

	// var transactions []Transactions

	// db.Find(&transactions)

	// json.NewEncoder(w).Encode(&transactions)
	c.JSON(http.StatusOK, gin.H{
		"status":  200,
		"message": "Welcome To API",
	})

}

// // GetTransaction retreives a transaction
// func GetTransaction(w http.ResponseWriter, r *http.Request) {

// 	params := mux.Vars(r)

// 	var transaction Transactions

// 	db.First(&transaction, params["id"])

// 	json.NewEncoder(w).Encode(&transaction)

// }

// // GetIntegration retrieves one integration from table
// func GetIntegration(w http.ResponseWriter, r *http.Request) {

// 	params := mux.Vars(r)

// 	var integration PlaidIntegration

// 	db.First(&integration, params["id"])


// 	json.NewEncoder(w).Encode(&integration)

// }


// // DeleteTransaction removes a transaction
// func DeleteTransaction(w http.ResponseWriter, r *http.Request) {

// 	params := mux.Vars(r)

// 	var transaction Transactions

// 	db.First(&transaction, params["id"])

// 	db.Delete(&transaction)

// 	var transactions []Transactions

// 	db.Find(&transactions)

// 	json.NewEncoder(w).Encode(&transactions)

// }
