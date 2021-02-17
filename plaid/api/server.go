package api

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
	"github.com/tapfunds/tf/plaid/api/controllers"
)

var server = controllers.Server{}

func init() {

	if PLAID_PRODUCTS == "" {
		PLAID_PRODUCTS = "transactions"
	}

	if PLAID_COUNTRY_CODES == "" {
		PLAID_COUNTRY_CODES = "US"
	}

	if PLAID_ENV == "" {
		PLAID_ENV = "sandbox"
	}
}

func Run() {

	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatalf("Error getting env, %v", err)
	}

	server.Initialize()

	// This is for testing, when done, do well to comment
	// seed.Load(server.DB)

	apiPort := fmt.Sprintf(":%s", APP_PORT)

	server.Run(apiPort)
	fmt.Printf("Listening to port %s", apiPort)

}
