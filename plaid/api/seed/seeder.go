package seed

import (
	"log"

	"github.com/jinzhu/gorm"
	"github.com/tapfunds/tf/auth/api/models"
)

var users = []models.User{
	models.User{
		Username: "qwelian",
		Email:    "qwelian@example.com",
		Password: "password",
	},
	models.User{
		Username: "malcolm",
		Email:    "x@example.com",
		Password: "password",
	},
}

var integrations = []models.PlaidIntegration{
	models.PlaidIntegration{
		AccessToken: "Token 1",
		ItemID:      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	},
	models.PlaidIntegration{
		AccessToken: "Token 2",
		ItemID:      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	},
}

func Load(db *gorm.DB) {

	err := db.Debug().DropTableIfExists(&models.PlaidIntegration{}, &models.User{}).Error
	if err != nil {
		log.Fatalf("cannot drop table: %v", err)
	}
	err = db.Debug().AutoMigrate(&models.User{}, &models.PlaidIntegration{}).Error
	if err != nil {
		log.Fatalf("cannot migrate table: %v", err)
	}

	err = db.Debug().Model(&models.PlaidIntegration{}).AddForeignKey("user_id", "users(id)", "cascade", "cascade").Error
	if err != nil {
		log.Fatalf("attaching foreign key error: %v", err)
	}

	for i, _ := range users {
		err = db.Debug().Model(&models.User{}).Create(&users[i]).Error
		if err != nil {
			log.Fatalf("cannot seed users table: %v", err)
		}
		integrations[i].UserID = users[i].ID

		err = db.Debug().Model(&models.PlaidIntegration{}).Create(&integrations[i]).Error
		if err != nil {
			log.Fatalf("cannot seed posts table: %v", err)
		}
	}
}
