package controllers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/tapfunds/tfapi/api/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/tapfunds/tfapi/api/models"

	// "github.com/spf13/viper"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/jinzhu/gorm"
)


type Server struct {
	DB     *gorm.DB
	Router *gin.Engine
}

var errList = make(map[string]string)



func (server *Server) Initialize(Dbdriver, DbUser, DbPassword, DbPort, DbHost, DbName string) {

	var err error
	// // Enable VIPER to read Environment Variables
	// viper.AutomaticEnv()

	// // To get the value from the config file using key

	// // viper package read .env
	// viper_user := viper.Get("DB_USER")
	// viper_password := viper.Get("DB_PASSWORD")
	// viper_db := viper.Get("DB_NAME")
	// viper_host := viper.Get("DB_HOST")
	// viper_port := viper.Get("DB_PORT")

	// https://gobyexample.com/string-formatting
	DBURL  := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v TimeZone=America/New_York", DbHost, DbPort, DbUser, DbName, DbPassword)


	server.DB, err = gorm.Open(Dbdriver, DBURL)

	if err != nil {
		panic("Failed to connect to database!")
		log.Fatal("This is the error connecting to postgres:", err)
	} else {
		fmt.Printf("We are connected to the %s database", Dbdriver)
	}

	server.DB.Debug().AutoMigrate(
		&models.PlaidIntegration{},
		&models.User{},
		&models.ResetPassword{},	
	)


	server.Router = gin.Default()
	server.Router.Use(middlewares.CORSMiddleware())

	server.initializeRoutes()
}

func (server *Server) Run(addr string) {
	log.Fatal(http.ListenAndServe(addr, server.Router))
}