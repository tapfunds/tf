package controllers

import (
	"github.com/tapfunds/tf/auth/api/auth"
)

const (
	AuthBasePath         = "/auth"
	UsersBasePath        = "/users"
	IntegrationsBasePath = "/integrations"
)

func (s *Server) initializeRoutes() {
	v1 := s.Router.Group("/api/v1")

	// Auth Routes: Handles user authentication and password resets.
	authRoutes := v1.Group(AuthBasePath)
	{
		authRoutes.POST("/signup", s.Signup)
		authRoutes.POST("/login", s.Login)
		authRoutes.POST("/password/forgot", s.ForgotPassword)
		authRoutes.POST("/password/reset", s.ResetPassword)
		authRoutes.GET("/validate/:token", auth.ValidateTokenHandler())
	}

	// User Routes: Manages user data and profiles
	users := v1.Group(UsersBasePath)
	users.Use(auth.TokenAuthMiddleware())
	{
		users.GET("/:id", s.GetUser)
		users.POST("/create", s.CreateUser)
		users.PUT("/:id", s.UpdateUser)
		users.PUT("/avatar/:id", s.UpdateAvatar)
		users.DELETE("/:id", s.DeleteUser)
	}

	// Integration Routes: Handles user integrations and tokens
	integrations := v1.Group(IntegrationsBasePath)
	integrations.Use(auth.TokenAuthMiddleware())
	{
		integrations.GET("/:id", s.GetUserIntegration)
		integrations.POST("/new", s.CreatePlaidInfo)
		integrations.PUT("/:id", s.UpdateIntegration)
		integrations.DELETE("/:id", s.DeleteIntegration)
	}

	// Status Route: General health check endpoint
	v1.GET("/status", s.Status)
}
