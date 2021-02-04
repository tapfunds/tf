package controllers

//// create user object in DB

//// client gets account info vis identity plaid endpoint from plaid service after linking
//// client will then send info to backend
//// user model gets created on server
//// client will query db for user with matching ID and return:
//// 	item model
import (
	"fmt"
	"encoding/json"
	"log"
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
)

func (server *Server) CreateUserItem(c *gin.Context) {
	// this will handle POST method for creating new user item
	// we will call two endpoints on the plaid service
	// one, the institution endpoint
	// two, the identity endpoint
	// the repsone from the institution endpoint will be used to fill out info for the institution node
	// we need to call the identity endpoint first however to receive the instituion ID for a given users bank
	// with the inst. information, we  want basic bank information like clor name and logo. Side note: we could also just make a DB of the institutions
	// we then need to unpack the response object into the structs for our node
	// to build a graph object, it should flow like this for each account:
	// get access token from context
	// use access token to call identity endpoint
	// instantiate user model
	// set id to user id
	// create empty slice of item structs
	// make an item struct
	// set item user to appropriate value for relationship
	// create a empty slice of accounts
	// make instituion struct
	// set instituion relationship with item
	// set institution values
	// loop through account array
	// unpack using njson for golang
	// send user off to neo4j with the right depth

	userID := c.PostForm("user")
	accessToken := c.PostForm("accesstoken")

	log.Printf("User:", userID, "access token:", accessToken)

	data := url.Values{}
	data.Set("access_token",accessToken)

	resp, err := http.PostForm("http://localhost:8000/api/identity", data)
	if err != nil {
		log.Fatal(err)
	}

	var res map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&res)

	fmt.Println(res["identity"])

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
	})
}

// func (server *Server) ReadUserItem(c *gin.Context) {
// 	// must pass in user id

// 	return nil
// }

// func (server *Server) UpdateUserItem(c *gin.Context) {
// 	// must pass in user id

// 	return nil
// }

// func (server *Server) DeleteUserItem(c *gin.Context) {
// 	// must pass in user id

// 	return nil
// }
