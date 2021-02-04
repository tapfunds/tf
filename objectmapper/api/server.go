package api

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/tapfunds/tf/objectmapper/api/controllers"
)

var server = controllers.Server{}

func Run() {

	var err error
	// err = godotenv.Load()
	if err != nil {
		log.Fatalf("Error getting env, %v", err)
	}

	dbPort := fmt.Sprintf("%s", os.Getenv("DB_PORT"))
	dbp, err := strconv.Atoi(dbPort)
	server.Database(os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"), dbp)

	// This is for testing, when done, do well to comment
	// seed.Load(server.DB)

	apiPort := fmt.Sprintf(":%s", os.Getenv("API_PORT"))

	server.Run(apiPort)
	fmt.Printf("Listening to port %s", apiPort)

}
