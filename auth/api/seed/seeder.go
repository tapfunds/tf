package seed

import (
	"log"

	"github.com/jinzhu/gorm"
	"github.com/tapfunds/tf/auth/api/models"
)

var users = []models.User{
	{
		Username: "qwelian",
		Email:    "qwelian@example.com",
		Password: "password", // Remember to hash password before storing in production!
	},
	{
		Username: "malcolm",
		Email:    "x@example.com",
		Password: "password", // Remember to hash password before storing in production!
	},
}

var integrations = []models.PlaidIntegration{
	{
		AccessToken: "Token 1",
		PlaidItemID: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	},
	{
		AccessToken: "Token 2",
		PlaidItemID: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	},
}

func Load(db *gorm.DB) {

	// Drop tables (if exist) in reverse order to avoid foreign key constraints
	err := db.Debug().DropTableIfExists(&models.PlaidIntegration{}, &models.User{}).Error
	if err != nil {
		log.Fatalf("cannot drop table: %v", err)
	}

	// Migrate tables
	err = db.Debug().AutoMigrate(&models.User{}, &models.PlaidIntegration{}).Error
	if err != nil {
		log.Fatalf("cannot migrate table: %v", err)
	}

	// Create users first
	for _, user := range users {
		err = db.Debug().Create(&user).Error
		if err != nil {
			log.Fatalf("cannot seed users table: %v", err)
		}
	}

	// Now create integrations with user IDs
	for i, integration := range integrations {
		integration.UserID = users[i].ID
		err = db.Debug().Create(&integration).Error
		if err != nil {
			log.Fatalf("cannot seed integrations table: %v", err)
		}
	}
}
