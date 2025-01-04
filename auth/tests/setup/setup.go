package testsetup

import (
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/jinzhu/gorm" // For older gorm versions
	"github.com/joho/godotenv"
	"github.com/tapfunds/tf/auth/api/controllers"
	"github.com/tapfunds/tf/auth/api/models"
)

var Server = controllers.Server{}

func TestMain(m *testing.M) {

	// Loading .env variables if available
	if _, err := os.Stat("./../.env"); err == nil {
		if err := godotenv.Load(os.ExpandEnv("./../.env")); err != nil {
			log.Fatalf("Error loading .env file: %v", err)
		}
	} else if os.Getenv("CI") != "" {
		setupCIBuild()
	} else {
		log.Print("No .env file found. Skipping environment loading.")
	}

	// Connect to the database or set up a mock DB before running tests
	SetupDatabase()

	// Run the tests
	code := m.Run()

	// Cleanup database connections
	if Server.DB != nil {
		Server.DB.Close()
	}

	os.Exit(code)
}

func setupCIBuild() {
	DBURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s",
		os.Getenv("TEST_DB_HOST"), os.Getenv("TEST_DB_PORT"), os.Getenv("TEST_DB_USER"), os.Getenv("TEST_DB_NAME"), os.Getenv("TEST_DB_PASSWORD"))
	var err error
	Server.DB, err = gorm.Open("postgres", DBURL)
	if err != nil {
		log.Fatalf("Cannot connect to the database: %v", err)
	}
	fmt.Println("Connected to CI database")
}

func SetupDatabase() error {
	TestDbDriver := os.Getenv("TEST_DB_DRIVER")
	if TestDbDriver == "postgres" {
		// Log the environment variables used in DB connection
		DBURL := fmt.Sprintf("host=localhost port=%s user=%s dbname=%s sslmode=disable password=%s",
			os.Getenv("TEST_POSTGRES_PORT"), os.Getenv("TEST_POSTGRES_USER"), os.Getenv("TEST_POSTGRES_DB"), os.Getenv("TEST_POSTGRES_PASSWORD"))

		// Logging the DB connection string (make sure no sensitive data like passwords are logged)
		log.Printf("Connecting to DB with URL: %s", DBURL)

		var err error
		Server.DB, err = gorm.Open("postgres", DBURL)
		if err != nil {
			log.Printf("Cannot connect to %s database: %v", TestDbDriver, err)
			return err
		}
		log.Printf("Connected to the %s database\n", TestDbDriver)

		// Ensure the DB connection is established before proceeding
		if Server.DB == nil {
			log.Printf("Failed to establish DB connection: DB is nil")
			return err
		}

		// Run migrations to ensure the tables are created
		err = Server.DB.AutoMigrate(&models.User{}, &models.PlaidIntegration{}).Error
		if err != nil {
			log.Fatalf("Error migrating database: %v", err)
			return err
		}
	} else {
		log.Print("TEST_DB_DRIVER not set or unsupported. Skipping database connection.")
	}
	return nil
}

func RefreshTables(tables ...interface{}) error {
	if Server.DB == nil {
		return fmt.Errorf("database connection is nil")
	}
	for _, table := range tables {
		err := Server.DB.DropTableIfExists(table).Error
		if err != nil {
			return err
		}
		err = Server.DB.AutoMigrate(table).Error
		if err != nil {
			return err
		}
	}
	return nil
}

func SeedUser(username, email, password string) (models.User, error) {
	user := models.User{
		Username: username,
		Email:    email,
		Password: password,
	}
	err := Server.DB.Create(&user).Error
	return user, err
}

func SeedIntegration(userID uint32, itemID, accessToken string) (models.PlaidIntegration, error) {
	integration := models.PlaidIntegration{
		UserID:      userID,
		PlaidItemID: itemID,
		AccessToken: accessToken,
	}
	err := Server.DB.Create(&integration).Error
	return integration, err
}
