package main

import (
	"tfdb/controllers"
	"tfdb/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	db := models.SetupModels() // new

	// Provide db variable to controllers
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	r.GET("/tokens", controllers.FindPlaidInfos)
	r.POST("/tokens", controllers.CreatePlaidInfo) // create
	r.POST("/token", controllers.FindPlaidInfo) // find by id
	r.DELETE("/tokens/:id", controllers.DeletePlaidInfo) // delete by id

	r.Run()
}