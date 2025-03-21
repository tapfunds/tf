package models

import (
	"errors"
	"fmt"
	"html"
	"os"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/jinzhu/gorm"
	"github.com/tapfunds/tf/auth/api/security"
)

type User struct {
	ID         uint32    `gorm:"primary_key;auto_increment" json:"id"`
	Firstname  string    `gorm:"size:255;not null" json:"firstname" validate:"required"`
	Lastname   string    `gorm:"size:255;not null" json:"lastname" validate:"required"`
	Email      string    `gorm:"size:100;not null;unique" json:"email" validate:"required,email"`
	Username   string    `gorm:"size:255;not null;unique" json:"username"`
	Password   string    `gorm:"size:100;not null" json:"password" validate:"required,min=6"`
	AvatarPath string    `gorm:"size:255" json:"avatar_path"`
	CreatedAt  time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt  time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
	Remember bool   `json:"remember"`
}

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func (u *User) AfterFind() (err error) {
	if u.AvatarPath != "" {
		u.AvatarPath = os.Getenv("DO_SPACES_URL") + u.AvatarPath
	}
	return nil
}

func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	hashedPassword, err := security.Hash(u.Password)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *User) Prepare() {
	u.Firstname = html.EscapeString(strings.TrimSpace(u.Firstname))
	u.Lastname = html.EscapeString(strings.TrimSpace(u.Lastname))
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
	u.Email = html.EscapeString(strings.TrimSpace(u.Email))
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()
}

func (u *User) Validate(action string) map[string]string {
	errorMessages := make(map[string]string)

	// Validate the user struct
	err := validate.Struct(u)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			errorMessages[err.Field()] = fmt.Sprintf("Invalid %s", err.Field())
		}
	}

	// Add action-specific validations if needed
	switch strings.ToLower(action) {
	case "login":
		// No additional validation needed for login (handled by LoginRequest)
	case "signup":
		// Add signup-specific validations if needed
	case "update":
		// Add update-specific validations if needed
	}

	return errorMessages
}

func (u *User) SaveUser(db *gorm.DB) (*User, error) {
	err := db.Create(&u).Error
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (u *User) FindAllUsers(db *gorm.DB) (*[]User, error) {
	var users []User
	err := db.Limit(100).Find(&users).Error
	if err != nil {
		return nil, err
	}
	return &users, nil
}

func (u *User) FindUserByID(db *gorm.DB, uid uint32) (*User, error) {
	err := db.Where("id = ?", uid).First(&u).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
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

	// Hash password if it's being updated
	if _, ok := updateData["password"]; ok {
		hashedPassword, err := security.Hash(updateData["password"].(string))
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		updateData["password"] = string(hashedPassword)
	}

	// Update user fields
	if err := tx.Model(&User{}).Where("id = ?", uid).Updates(updateData).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Retrieve updated user
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
