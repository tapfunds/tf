package routes

import (
	"tfdb/controllers"

	"github.com/gin-gonic/gin"
)

//SetupRouter ... Configure routes
func SetupRouter() *gin.Engine {
	r := gin.Default()
	tok := r.Group("/db")
	{
		tok.GET("token", controllers.GetPlaidInfo)
		tok.POST("user", controllers.CreatePlaidInfo)
		tok.GET("user/:id", controllers.GetPlaidInfoByID)
		tok.PUT("user/:id", controllers.UpdatePlaidInfo)
		tok.DELETE("user/:id", controllers.DeletePlaidInfo)
	}
	return r
}
