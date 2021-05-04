package api

import (
	"fmt"
	"log"
	"os"
	"github.com/joho/godotenv"
	"github.com/tapfunds/tf/plaid/api/controllers"
)

var server = controllers.Server{}

func init() {
	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatalf("Error getting env, %v", err)
	}
}

func Run() {



	server.Initialize()

	// This is for testing, when done, do well to comment
	// seed.Load(server.DB)

	apiPort := fmt.Sprintf(":%s", os.Getenv("PLAID_API_PORT"))

	server.Run(apiPort)
	fmt.Printf("Listening to port %s", apiPort)

}
