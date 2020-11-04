package config

import (
	"fmt"
	"os"
    "gorm.io/gorm"
	"strconv"
)

var db *gorm.DB

var(
	DB_HOST = os.Getenv("DB_HOST")
	DB_PORT = os.Getenv("DB_PORT")
	dbPort, err  = strconv.Atoi(DB_PORT)
	DB_USER = os.Getenv("DB_USER")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
	DB_DBNAME = os.Getenv("DB_DBNAME")

)
// DBConfig represents db configuration
type DBConfig struct {
	Host     string
	Port     int
	User     string
	DBName   string
	Password string
   }


func BuildDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     DB_HOST,
		Port:     dbPort,
		User:     DB_USER,
		Password: DB_PASSWORD,
		DBName:   DB_DBNAME,
	}
	return &dbConfig
}

func DbURL(dbConfig *DBConfig) string {
	return fmt.Sprintf(
	 "user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=Local",
	 dbConfig.User,
	 dbConfig.Password,
	 dbConfig.DBName,
	 dbConfig.Port,
	)
   }