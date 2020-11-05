package models

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/spf13/viper"
)

func SetupModels() *gorm.DB {

	//db, err := gorm.Open("sqlite3", "test.db")

	// Enable VIPER to read Environment Variables
	viper.AutomaticEnv()

	// To get the value from the config file using key

	// viper package read .env
	viper_user := viper.Get("DB_USER")
	viper_password := viper.Get("DB_PASSWORD")
	viper_db := viper.Get("DB_DBNAME")
	viper_host := viper.Get("DB_HOST")
	viper_port := viper.Get("DB_PORT")

	// https://gobyexample.com/string-formatting
	dsn := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v sslmode=disable", viper_host, viper_port, viper_user, viper_db, viper_password)

	fmt.Println("conname is\t\t", dsn)


	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	
	
	
	if err != nil {
		panic("Failed to connect to database!")
	}

	db.AutoMigrate(&Book{}, &PlaidIntegration{})

	// Initialize value
	// m := Book{Author: "author1", Title: "title1"}

	// db.Create(&m)

	return db
}