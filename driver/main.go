package main

import (
	"fmt"
	"tfdb/config"
	"tfdb/models"
	"tfdb/routes"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)

var err error

func main() {
	dsn := "user=postgres password=*Grow dbname=tapfunds port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	// db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	config.DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Status:", err)
	}
	config.DB.AutoMigrate(&models.PlaidIntegration{})
	r := routes.SetupRouter()
	//runnin
	r.Run()
}
