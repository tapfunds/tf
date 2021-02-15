package controllers

import (
	"github.com/tapfunds/tf/auth/api/middlewares"
)

func (s *Server) initializeRoutes() {

	v1 := s.Router.Group("/api/v1")
	{
		// API Status
		v1.GET("/status", s.Status)

		//Plaid routes
		v1.POST("/create_link_token", middlewares.TokenAuthMiddleware(), s.createLinkToken)
		v1.POST("/set_access_token", middlewares.TokenAuthMiddleware(), s.getAccessToken)
		v1.POST("/balance", middlewares.TokenAuthMiddleware(), s.balance)
		v1.POST("/auth", middlewares.TokenAuthMiddleware(), s.authorize)
		v1.POST("/accounts", middlewares.TokenAuthMiddleware(), s.accounts)
		v1.POST("/plaid/item", middlewares.TokenAuthMiddleware(), s.item)
		v1.POST("/identity", middlewares.TokenAuthMiddleware(), s.identity)
		v1.POST("/transactions", middlewares.TokenAuthMiddleware(), s.transactions)
		v1.POST("/transfer", middlewares.TokenAuthMiddleware(), s.transfer)
	}
}
