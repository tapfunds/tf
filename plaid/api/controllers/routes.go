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
		v1.POST("/balance", s.balance)
		v1.POST("/auth", s.authorize)
		v1.POST("/accounts", s.accounts)
		v1.POST("/plaid/item", s.item)
		v1.POST("/identity", s.identity)
		v1.POST("/transactions", s.transactions)
		v1.POST("/transfer", s.transfer)
	}
}
