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

	r.GET("/books", controllers.FindBooks)
	r.GET("/tokens", controllers.FindPlaidInfos)

	r.POST("/books", controllers.CreateBook) // create
	r.POST("/tokens", controllers.CreatePlaidInfo) // create

	r.GET("/books/:id", controllers.FindBook) // find by id
	r.GET("/tokens/:user", controllers.FindPlaidInfo) // find by id

	r.PATCH("/books/:id", controllers.UpdateBook) // update by id

	r.DELETE("/books/:id", controllers.DeleteBook) // delete by id
	r.DELETE("/tokens/:id", controllers.DeletePlaidInfo) // delete by id

	r.Run()
}