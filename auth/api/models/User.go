package models

import (
	"errors"
	"html" // Use net/mail for more robust email validation
	"net/mail"
	"os"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/tapfunds/tf/auth/api/security"
	// Explicitly import bcrypt
)

type User struct {
	ID         uint32    `gorm:"primary_key;auto_increment" json:"id"`
	Firstname  string    `gorm:"size:255;not null;" json:"firstname"`
	Lastname   string    `gorm:"size:255;not null;" json:"lastname"`
	Username   string    `gorm:"size:255;not null;unique_index" json:"username"` // Add unique index
	Email      string    `gorm:"size:100;not null;unique_index" json:"email"`    // Add unique index
	Password   string    `gorm:"size:100;not null;" json:"password"`             // Don't expose password in JSON responses
	AvatarPath string    `gorm:"size:255;null;" json:"avatar_path"`
	CreatedAt  time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt  time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (u *User) AfterFind() (err error) {
	if u.AvatarPath != "" {
		u.AvatarPath = os.Getenv("DO_SPACES_URL") + u.AvatarPath
	}
	return nil
}

func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	hashedPassword, err := security.Hash(u.Password) // Use your existing hashing function
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *User) Prepare() {
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
	u.Email = html.EscapeString(strings.TrimSpace(u.Email))
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()
}

func validateEmail(email string, errors map[string]string) {
	if email == "" {
		errors["email"] = "Email is required"
	} else if _, err := mail.ParseAddress(email); err != nil {
		errors["email"] = "Please enter a valid email address"
	}
}

func validateUsername(username string, errors map[string]string) {
	if username == "" {
		errors["username"] = "Username is required"
	}
}

func validatePassword(password string, errors map[string]string) {
	if password == "" {
		errors["password"] = "Password is required"
	} else if len(password) < 6 {
		errors["password"] = "Password must be at least 6 characters long"
	}
}

func (u *User) Validate(action string) map[string]string {
	var errorMessages = make(map[string]string)

	// Common validations
	validateEmail(u.Email, errorMessages)

	switch strings.ToLower(action) {
	case "update", "login", "forgotpassword":
		if action == "login" && u.Password == "" {
			errorMessages["password"] = "Password is required for login hoe. password"
		}

	default: // Default is for create/register
		validateUsername(u.Username, errorMessages)
		validatePassword(u.Password, errorMessages)
	}

	return errorMessages
}

func (u *User) SaveUser(db *gorm.DB) (*User, error) {
	err := db.Create(&u).Error // Removed .Debug() for production
	if err != nil {
		return nil, err // Return nil, error for consistency
	}
	return u, nil
}

func (u *User) FindAllUsers(db *gorm.DB) (*[]User, error) {
	var users []User
	err := db.Limit(100).Find(&users).Error // Removed .Debug()
	if err != nil {
		return nil, err
	}
	return &users, nil
}

func (u *User) FindUserByID(db *gorm.DB, uid uint32) (*User, error) {
	err := db.Where("id = ?", uid).First(&u).Error // Use First() for single record retrieval
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) { // Use errors.Is for better error checking
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return u, nil
}

func (u *User) UpdateAUser(db *gorm.DB, uid uint32, updateData map[string]interface{}) (*User, error) {
	tx := db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()
	if err := tx.Error; err != nil {
		return nil, err
	}
	if _, ok := updateData["password"]; ok {
		hashedPassword, err := security.Hash(updateData["password"].(string))
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		updateData["password"] = string(hashedPassword)
	}

	if err := tx.Model(&User{}).Where("id = ?", uid).Updates(updateData).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Where("id = ?", uid).First(&u).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	return u, tx.Commit().Error
}

func (u *User) UpdateAUserAvatar(db *gorm.DB, uid uint32) (*User, error) {
	return u.UpdateAUser(db, uid, map[string]interface{}{"avatar_path": u.AvatarPath})
}

func (u *User) DeleteAUser(db *gorm.DB, uid uint32) (int64, error) {
	// Delete associated integrations first
	if err := u.DeleteIntegrationsByUserID(db); err != nil {
		return 0, err
	}
	result := db.Where("id = ?", uid).Delete(&User{})
	return result.RowsAffected, result.Error
}

func (u *User) UpdatePassword(db *gorm.DB) error {
	hashedPassword, err := security.Hash(u.Password)
	if err != nil {
		return err
	}

	result := db.Model(&User{}).Where("email = ?", u.Email).Update("password", string(hashedPassword))
	return result.Error
}

// GetIntegrations retrieves all PlaidIntegrations associated with a user.
func (u *User) GetIntegrations(db *gorm.DB) ([]PlaidIntegration, error) {
	var integrations []PlaidIntegration
	err := db.Model(&PlaidIntegration{}).Where("user_id = ?", u.ID).Find(&integrations).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("no integrations found for this user")
		}
		return nil, err
	}
	return integrations, nil
}

// DeleteIntegrationsByUserID deletes all PlaidIntegrations associated with a user ID.
func (u *User) DeleteIntegrationsByUserID(db *gorm.DB) error {
	result := db.Where("user_id = ?", u.ID).Delete(&PlaidIntegration{})
	return result.Error
}
