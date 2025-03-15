package main

import (
	"log"

	"github.com/tapfunds/tf/auth/api"
)

func main() {
	log.Println("Starting Authentication Service GAUTH")
	api.Run()
}
