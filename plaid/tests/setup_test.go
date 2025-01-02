package tests

import (
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"

	"github.com/tapfunds/tf/auth/api/models"
	"github.com/tapfunds/tf/plaid/api/controllers"
)

var server = controllers.Server{}
var userInstance = models.User{}
var tokenInstance = models.PlaidIntegration{}

func TestMain(m *testing.M) {
	//Since we add our .env in .gitignore, Circle CI cannot see it, so see the else statement
	if _, err := os.Stat("./../.env"); !os.IsNotExist(err) {
		var err error
		err = godotenv.Load(os.ExpandEnv("./../.env"))
		if err != nil {
			log.Fatalf("Error getting env %v\n", err)
		}
		Database()
	} else {
		CIBuild()
	}
	os.Exit(m.Run())
}

// When using CircleCI
func CIBuild() {
	var err error
	DBURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", "127.0.0.1", "5432", "qwelian", "forum_db_test", "password")
	server.DB, err = gorm.Open("postgres", DBURL)
	if err != nil {
		fmt.Printf("Cannot connect to %s database\n", "postgres")
		log.Fatal("This is the error:", err)
	} else {
		fmt.Printf("We are connected to the %s database\n", "postgres")
	}
}

func Database() {

	var err error

	TestDbDriver := os.Getenv("TEST_DB_DRIVER")
	if TestDbDriver == "postgres" {
		DBURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s", os.Getenv("TEST_DB_HOST"), os.Getenv("TEST_DB_PORT"), os.Getenv("TEST_DB_USER"), os.Getenv("TEST_DB_NAME"), os.Getenv("TEST_DB_PASSWORD"))
		server.DB, err = gorm.Open(TestDbDriver, DBURL)
		if err != nil {
			fmt.Printf("Cannot connect to %s database\n", TestDbDriver)
			log.Fatal("This is the error:", err)
		} else {
			fmt.Printf("We are connected to the %s database\n", TestDbDriver)
		}
	}
}

func refreshUserTable() error {
	err := server.DB.DropTableIfExists(&models.User{}).Error
	if err != nil {
		return err
	}
	err = server.DB.AutoMigrate(&models.User{}).Error
	if err != nil {
		return err
	}
	log.Printf("Successfully refreshed table")
	return nil
}

func seedOneUser() (models.User, error) {

	user := models.User{
		Username: "Dee",
		Email:    "dee@example.com",
		Password: "password",
	}

	err := server.DB.Model(&models.User{}).Create(&user).Error
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

func seedUsers() ([]models.User, error) {

	var err error
	if err != nil {
		return nil, err
	}
	users := []models.User{
		models.User{
			Username: "Qwelian",
			Email:    "qwelian@example.com",
			Password: "password",
		},
		models.User{
			Username: "Nala",
			Email:    "nala@example.com",
			Password: "password",
		},
	}

	for i, _ := range users {
		err := server.DB.Model(&models.User{}).Create(&users[i]).Error
		if err != nil {
			return []models.User{}, err
		}
	}
	return users, nil
}

func refreshUserAndIntegrationTable() error {

	err := server.DB.DropTableIfExists(&models.User{}, &models.PlaidIntegration{}).Error
	if err != nil {
		return err
	}
	err = server.DB.AutoMigrate(&models.User{}, &models.PlaidIntegration{}).Error
	if err != nil {
		return err
	}
	log.Printf("Successfully refreshed tables")
	return nil
}

func seedOneUserAndOneIntegration() (models.User, models.PlaidIntegration, error) {

	user := models.User{
		ID:       1,
		Username: "HannahArendt",
		Email:    "hannaharendt@example.com",
		Password: "password",
	}
	err := server.DB.Model(&models.User{}).Create(&user).Error
	if err != nil {
		return models.User{}, models.PlaidIntegration{}, err
	}
	token := models.PlaidIntegration{
		ItemID:      "This is the item",
		AccessToken: "This is the access token",
		PaymentID:   "This is the payment id",
		UserID:      user.ID,
	}
	err = server.DB.Model(&models.PlaidIntegration{}).Create(&token).Error
	if err != nil {
		return models.User{}, models.PlaidIntegration{}, err
	}
	return user, token, nil
}

func seedUsersAndIntegrations() ([]models.User, []models.PlaidIntegration, error) {

	var err error

	if err != nil {
		return []models.User{}, []models.PlaidIntegration{}, err
	}
	var users = []models.User{
		models.User{
			ID:       1,
			Username: "Qwelian",
			Email:    "qwelian@example.com",
			Password: "password",
		},
		models.User{
			ID:       2,
			Username: "Michele",
			Email:    "mfoucault@example.com",
			Password: "password",
		},
	}
	var tokens = []models.PlaidIntegration{
		models.PlaidIntegration{
			ItemID:      "ItemID 1",
			AccessToken: "AccessToken 1",
			PaymentID:   "PaymentID 1",
		},
		models.PlaidIntegration{
			ItemID:      "ItemID 2",
			AccessToken: "AccessToken 2",
			PaymentID:   "PaymentID 2",
		},
	}

	for i, _ := range users {
		err = server.DB.Model(&models.User{}).Create(&users[i]).Error
		if err != nil {
			log.Fatalf("cannot seed users table: %v", err)
		}
		tokens[i].UserID = users[i].ID

		err = server.DB.Model(&models.PlaidIntegration{}).Create(&tokens[i]).Error
		if err != nil {
			log.Fatalf("cannot seed tokens table: %v", err)
		}
	}
	return users, tokens, nil
}

func refreshUserPostAndLikeTable() error {
	err := server.DB.DropTableIfExists(&models.User{}, &models.PlaidIntegration{}).Error
	if err != nil {
		return err
	}
	err = server.DB.AutoMigrate(&models.User{}, &models.PlaidIntegration{}).Error
	if err != nil {
		return err
	}
	log.Printf("Successfully refreshed user, token and like tables")
	return nil
}

func refreshUserPostAndCommentTable() error {
	err := server.DB.DropTableIfExists(&models.User{}, &models.PlaidIntegration{}).Error
	if err != nil {
		return err
	}
	err = server.DB.AutoMigrate(&models.User{}, &models.PlaidIntegration{}).Error
	if err != nil {
		return err
	}
	log.Printf("Successfully refreshed user, token and comment tables")
	return nil
}

func seedUsersPostsAndComments() (models.User, []models.PlaidIntegration, error) {
	// The idea here is: one user can have two tokens
	var err error
	var user = models.User{
		Username: "Adorno",
		Email:    "tadorno@example.com",
		Password: "password",
	}

	err = server.DB.Model(&models.User{}).Create(&user).Error
	if err != nil {
		log.Fatalf("cannot seed users table: %v", err)
	}

	var tokens = []models.PlaidIntegration{
		models.PlaidIntegration{

			User:        user,
			UserID:      user.ID,
			ItemID:      "Adorno made this ItemID",
			AccessToken: "Adorno made this AccessToken",
			PaymentID:   "Adorno made this PaymentID",
		},
		models.PlaidIntegration{
			User:        user,
			UserID:      user.ID,
			ItemID:      "Adornomade this ItemID",
			AccessToken: "Adorno made this AccessToken",
			PaymentID:   "Adorno made this PaymentID",
		},
	}
	for i, _ := range tokens {
		err = server.DB.Model(&models.PlaidIntegration{}).Create(&tokens[i]).Error
		if err != nil {
			log.Fatalf("cannot seed tokens table: %v", err)
		}
	}
	return user, tokens, nil
}

func refreshUserAndResetPasswordTable() error {
	err := server.DB.DropTableIfExists(&models.User{}, &models.ResetPassword{}).Error
	if err != nil {
		return err
	}
	err = server.DB.AutoMigrate(&models.User{}, &models.ResetPassword{}).Error
	if err != nil {
		return err
	}
	log.Printf("Successfully refreshed user and resetpassword tables")
	return nil
}

// Seed the reset password table with the token
func seedResetPassword() (models.ResetPassword, error) {

	resetDetails := models.ResetPassword{
		Token: "awesometoken",
		Email: "dee@example.com",
	}
	err := server.DB.Model(&models.ResetPassword{}).Create(&resetDetails).Error
	if err != nil {
		return models.ResetPassword{}, err
	}
	return resetDetails, nil
}
