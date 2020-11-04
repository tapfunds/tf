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
		tok.POST("token", controllers.CreatePlaidInfo)
		tok.GET("token/:id", controllers.GetPlaidInfoByID)
		tok.PUT("token/:id", controllers.UpdatePlaidInfo)
		tok.DELETE("token/:id", controllers.DeletePlaidInfo)
	}
	return r
}
