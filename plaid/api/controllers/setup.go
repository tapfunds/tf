package controllers

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/tapfunds/tf/auth/api/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/tapfunds/tf/auth/api/models"

	// "github.com/spf13/viper"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)


type Server struct {
	Router *gin.Engine
}

var errList = make(map[string]string)


func (server *Server) Initialize() {

	var err error

	// https://gobyexample.com/string-formatting
	server.Router = gin.Default()
	server.Router.Use(middlewares.CORSMiddleware())

	server.initializeRoutes()
}

func (server *Server) Run(addr string) {
	log.Fatal(http.ListenAndServe(addr, server.Router))
}

func (server *Server) Status(c *gin.Context){

	_, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":      http.StatusBadRequest,
			"error": "The world has falllen and we are to slumber...",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
	})
}