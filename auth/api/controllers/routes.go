package controllers

import (
	"github.com/tapfunds/tf/auth/api/middlewares"
)

func (s *Server) initializeRoutes() {

	v1 := s.Router.Group("/api/v1")
	{
		// API Status
		v1.GET("/status", s.Status)

		// Login Route
		v1.POST("/login", s.Login)

		// Reset password:
		v1.POST("/password/forgot", s.ForgotPassword)
		v1.POST("/password/reset", s.ResetPassword)

		//Users routes
		v1.POST("/users", s.CreateUser)

		// The user of the app have no business getting all the users.
		// v1.GET("/users", s.GetUsers)
		// v1.GET("/users/:id", s.GetUser)
		v1.PUT("/users/:id", middlewares.TokenAuthMiddleware(), s.UpdateUser)
		v1.PUT("/avatar/users/:id", middlewares.TokenAuthMiddleware(), s.UpdateAvatar)
		v1.DELETE("/users/:id", middlewares.TokenAuthMiddleware(), s.DeleteUser)


		//Integration Token routes
		v1.GET("/user_integrations/:id", middlewares.TokenAuthMiddleware(), s.GetUserIntegration)
		v1.POST("/new_integration", middlewares.TokenAuthMiddleware(), s.CreatePlaidInfo)      // create
		v1.PUT("/integrations/:id", middlewares.TokenAuthMiddleware(), s.UpdateIntegration)    // find by id
		v1.DELETE("/integrations/:id", middlewares.TokenAuthMiddleware(), s.DeleteIntegration) // delete by id
	}
}
