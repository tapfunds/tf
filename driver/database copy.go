package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/rs/cors"

)

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

// Encrypt these values irl
var (
	integrations = []PlaidIntegration{

		{User: "H4W6B564B57W647W467W4N", ItemID: "jtyuju7ir56u6u56u5", AccessToken: "HSR54NY465U7R6", PaymentID: "OMUTYI76I5455N"},

		{User: "M87TO7T87UFKUR8I76I6RC", ItemID: "thety343544rthgngn", AccessToken: "AWT4ANNY54NY45", PaymentID: "Y45Y4MMMM67Q45"},

		{User: "5WY45T4HRSHRTYJYPQAEGN", ItemID: "hyjtyjyzsbfghm6ayh", AccessToken: "4TW3B4T5Y6NNCN", PaymentID: "ATAERY54Y4W5NY"},
	}

	transactions = []Transactions{
		{User: "H4W6B564B57W647W467W4N", Name: "best buy",  Value: 123.00, Date: time.Now(), PaymentChannel: "in store"},

		{User: "M87TO7T87UFKUR8I76I6RC", Name: "apple",  Value: 67853.67, Date: time.Now(), PaymentChannel: "in store"},

		{User: "5WY45T4HRSHRTYJYPQAEGN", Name: "kroger",  Value: 12.43, Date: time.Now(), PaymentChannel: "in store"},

		{User: "5WY45T4HRSHRTYJYPQAEGN", Name: "wal mart",  Value: 3242.78, Date: time.Now(), PaymentChannel: "online"},

		{User: "H4W6B564B57W647W467W4N", Name: "geaorgia power", Value: 34.65, Date: time.Now(), PaymentChannel: "online"},
	}
)

func main() {

	router := mux.NewRouter()

	dsn := "user=postgres password=*Grow dbname=tapfunds port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	
	if err != nil {
		panic("failed to connect database")

	}
	// db.AutoMigrate(&PlaidIntegration{})

	// db.AutoMigrate(&Transactions{})

	// for index := range transactions {

	// 	db.Create(&transactions[index])

	// }

	// for index := range integrations {

	// 	db.Create(&integrations[index])

	// }

	router.HandleFunc("/integrations", GetIntegration).Methods("GET")

	router.HandleFunc("/transactions/{id}", GetTransaction).Methods("GET")

	router.HandleFunc("/integrations/{id}", GetIntegration).Methods("GET")

	router.HandleFunc("/transactions/{id}", DeleteTransaction).Methods("DELETE")

	handler := cors.Default().Handler(router)

	log.Fatal(http.ListenAndServe(":8080", handler))

}

// GetTransactions retreives all transactions
func GetTransactions(w http.ResponseWriter, r *http.Request) {

	var transactions []Transactions

	db.Find(&transactions)

	json.NewEncoder(w).Encode(&transactions)

}

// GetTransaction retreives a transaction
func GetTransaction(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	var transaction Transactions

	db.First(&transaction, params["id"])

	json.NewEncoder(w).Encode(&transaction)

}

// GetIntegration retrieves one integration from table
func GetIntegration(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	var integration PlaidIntegration

	db.First(&integration, params["id"])


	json.NewEncoder(w).Encode(&integration)

}


// DeleteTransaction removes a transaction
func DeleteTransaction(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	var transaction Transactions

	db.First(&transaction, params["id"])

	db.Delete(&transaction)

	var transactions []Transactions

	db.Find(&transactions)

	json.NewEncoder(w).Encode(&transactions)

}
