package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv"
	"github.com/tapfunds/tf/auth/api/controllers"
)

var server = controllers.Server{}

func init() {
	// loads values from .env into the system
	log.Println("Looking for environment variables")
	if err := godotenv.Load(); err != nil {
		log.Print("sad :(")
	}
	log.Println("Success!")

}

func Run() {
	server.Initialize(
		"postgres",
		getEnv("POSTGRES_USER", "user"),
		getEnv("POSTGRES_PASSWORD", "password"),
		getEnv("POSTGRES_PORT", "5432"),
		getEnv("POSTGRES_HOST", "localhost"),
		getEnv("POSTGRES_DB", "postgres"),
	)

	log.Println("Serving API routes")
	apiPort := getEnv("AUTH_API_PORT", "8080")
	server.HttpServer.Addr = fmt.Sprintf(":%s", apiPort)

	log.Printf("Serving at %s", apiPort)

	// Create a channel to listen for OS signals
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	// Run the server
	go func() {
		log.Printf("Server is running on %s", apiPort)
		if err := server.HttpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Error starting server: %v", err)
		}
	}()

	// Wait for termination signal
	<-quit
	log.Println("Shutting down server...")

	// Create a context with timeout for graceful shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Call a method to gracefully shutdown the server
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited gracefully")
}

// getEnv retrieves an environment variable or returns a default value if not set
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
