package tests

import (
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"github.com/tapfunds/tf/auth/api/controllers"
	"github.com/tapfunds/tf/auth/api/models"
)

var server = controllers.Server{}

func TestMain(m *testing.M) {
	// Load environment variables
	if _, err := os.Stat("./../.env"); !os.IsNotExist(err) {
		if err := godotenv.Load(os.ExpandEnv("./../.env")); err != nil {
			log.Fatalf("Error loading env: %v", err)
		}
	} else if os.Getenv("CI") != "" { // Check for CI environment variable
		CIBuild()
	} else {
		log.Print("No .env file found and not in CI environment. Skipping environment loading.")
	}

	Database()

	// Run tests
	code := m.Run()

	// Close the database connection after all tests are done
	if server.DB != nil {
		defer server.DB.Close()
	}

	os.Exit(code)
}

// When using CircleCI or other CI environments
func CIBuild() {
	var err error
	DBURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s",
		os.Getenv("TEST_DB_HOST"), os.Getenv("TEST_DB_PORT"), os.Getenv("TEST_DB_USER"), os.Getenv("TEST_DB_NAME"), os.Getenv("TEST_DB_PASSWORD"))
	server.DB, err = gorm.Open("postgres", DBURL)
	if err != nil {
		log.Fatalf("Cannot connect to Postgres database: %v", err)
	}
	fmt.Println("Connected to Postgres database (CI)")
}

func Database() {
	TestDbDriver := os.Getenv("TEST_DB_DRIVER")
	if TestDbDriver == "postgres" {
		DBURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s",
			os.Getenv("TEST_DB_HOST"), os.Getenv("TEST_DB_PORT"), os.Getenv("TEST_DB_USER"), os.Getenv("TEST_DB_NAME"), os.Getenv("TEST_DB_PASSWORD"))
		var err error
		server.DB, err = gorm.Open(TestDbDriver, DBURL)
		if err != nil {
			log.Fatalf("Cannot connect to %s database: %v", TestDbDriver, err)
		}
		fmt.Printf("Connected to the %s database\n", TestDbDriver)
	} else {
		log.Printf("No valid TEST_DB_DRIVER set. Skipping database connection. Set TEST_DB_DRIVER to 'postgres'")
	}
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

func seedOneIntegration() (models.PlaidIntegration, error) {
	user := models.User{
		ID:       1,
		Username: "HannahArendt",
		Email:    "hannaharendt@example.com",
		Password: "password",
	}
	err := server.DB.Model(&models.User{}).Create(&user).Error
	if err != nil {
		return models.PlaidIntegration{}, err
	}
	plaidIntegration := models.PlaidIntegration{
		PlaidItemID: "This is the item",
		AccessToken: "This is the access token",
		UserID:      user.ID,
	}
	err = server.DB.Model(&models.PlaidIntegration{}).Create(&plaidIntegration).Error
	if err != nil {
		return models.PlaidIntegration{}, err
	}
	return plaidIntegration, nil
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
	plaidIntegration := models.PlaidIntegration{
		PlaidItemID: "This is the item",
		AccessToken: "This is the access token",
		UserID:      user.ID,
	}
	err = server.DB.Model(&models.PlaidIntegration{}).Create(&plaidIntegration).Error
	if err != nil {
		return models.User{}, models.PlaidIntegration{}, err
	}
	return user, plaidIntegration, nil
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
			PlaidItemID: "ItemID 1",
			AccessToken: "AccessToken 1",
		},
		models.PlaidIntegration{
			PlaidItemID: "ItemID 2",
			AccessToken: "AccessToken 2",
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

func seedUsersAndPlaidIntegrations() (models.User, []models.PlaidIntegration, error) {
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
	var plaidIntegration = []models.PlaidIntegration{
		models.PlaidIntegration{

			UserID:      user.ID,
			PlaidItemID: "Adorno made this ItemID",
			AccessToken: "Adorno made this AccessToken",
		},
		models.PlaidIntegration{
			UserID:      user.ID,
			PlaidItemID: "Adornomade this ItemID",
			AccessToken: "Adorno made this AccessToken too",
		},
	}
	for i, _ := range plaidIntegration {
		err = server.DB.Model(&models.PlaidIntegration{}).Create(&plaidIntegration[i]).Error
		if err != nil {
			log.Fatalf("cannot seed plaidIntegration table: %v", err)
		}
	}
	return user, plaidIntegration, nil
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

func refreshUserTable() error {
	err := server.DB.DropTableIfExists(&models.User{}).Error
	if err != nil {
		return err
	}
	err = server.DB.AutoMigrate(&models.User{}).Error
	if err != nil {
		return err
	}
	fmt.Println("Successfully refreshed user table")
	return nil
}

func refreshUserAndPlaidIntegrationTable() error {
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
