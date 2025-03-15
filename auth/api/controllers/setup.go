package controllers

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/tapfunds/tf/auth/api/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/tapfunds/tf/auth/api/models"

	// "github.com/spf13/viper"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Server struct {
	DB         *gorm.DB
	Router     *gin.Engine
	HttpServer *http.Server
}

var errList = make(map[string]string)

func (server *Server) Initialize(Dbdriver, DbUser, DbPassword, DbPort, DbHost, DbName string) {
	log.Println("Intializing DB connection")

	var err error

	// https://gobyexample.com/string-formatting
	DBURL := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v TimeZone=America/New_York", DbHost, DbPort, DbUser, DbName, DbPassword)

	log.Println("Attempting to open a connection to the db")

	server.DB, err = gorm.Open(Dbdriver, DBURL)

	if err != nil {
		log.Fatal("Error connecting to postgres:", err)
	}

	log.Println("Migrating tables")

	server.DB.Debug().AutoMigrate(
		&models.PlaidIntegration{}, // using a generic Oauth table is more declaritive https://pkg.go.dev/golang.org/x/oauth2
		&models.User{},
		&models.ResetPassword{},
	)

	log.Println("Creating server")

	server.Router = gin.Default()
	server.Router.Use(middlewares.CORSMiddleware())
	server.initializeRoutes()

	// HTTP server configuration
	server.HttpServer = &http.Server{
		Handler:      server.Router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	log.Println("Serving 🤌")
}

// Shutdown gracefully shuts down the server and cleans up resources.
func (server *Server) Shutdown(ctx context.Context) error {
	// Close database connection
	if server.DB != nil {
		if err := server.DB.Close(); err != nil {
			log.Printf("Error closing database connection: %v", err)
		}
	}

	// Shut down HTTP server
	return server.HttpServer.Shutdown(ctx)
}

func (server *Server) Status(c *gin.Context) {
	_, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  "The world has falllen and we are to slumber...",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
	})
}
