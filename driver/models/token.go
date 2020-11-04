package models

import (
	"fmt"
	"tfdb/config"

	_ "gorm.io/driver/postgres"
)

//GetPlaidInfo Fetch all user data
func GetPlaidInfo(user *[]PlaidIntegration) (err error) {
	if err = config.DB.Find(user).Error; err != nil {
		return err
	}
	return nil
}

//CreatePlaidInfo ... Insert New data
func CreatePlaidInfo(user *PlaidIntegration) (err error) {
	if err = config.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

//GetPlaidInfoByID ... Fetch only one user by Id
func GetPlaidInfoByID(user *PlaidIntegration, id string) (err error) {
	if err = config.DB.Where("id = ?", id).First(user).Error; err != nil {
		return err
	}
	return nil
}

//UpdatePlaidInfo ... Update user
func UpdatePlaidInfo(user *PlaidIntegration, id string) (err error) {
	fmt.Println(user)
	config.DB.Save(user)
	return nil
}

//DeletePlaidInfo ... Delete user
func DeletePlaidInfo(user *PlaidIntegration, id string) (err error) {
	config.DB.Where("id = ?", id).Delete(user)
	return nil
}
