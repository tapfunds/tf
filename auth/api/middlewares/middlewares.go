package middlewares

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tapfunds/tf/auth/api/auth"
)

type contextKey string

const UserIDKey contextKey = "user_id"

// TokenAuthMiddleware handles placement of JWT in headers
func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if err := auth.TokenValid(c.Request); err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"status": http.StatusUnauthorized,
				"error":  "Unauthorized: invalid token",
			})
			return
		}

		userID, err := auth.ExtractTokenID(c.Request)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"status": http.StatusUnauthorized,
				"error":  "Unauthorized: invalid token",
			})
			return
		}
		c.Set(string(UserIDKey), userID)
		log.Println("Using Token Middleware")
		c.Next()
	}
}

// CORSMiddleware enables us interact with the NextJS Frontend
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		allowedOrigins := []string{"http://localhost:3000", "https://futurefrontend.com"}
		origin := c.Request.Header.Get("Origin")
		for _, allowedOrigin := range allowedOrigins {
			if origin == allowedOrigin {
				c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
				break
			}
		}
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
		c.Writer.Header().Set("Access-Control-Max-Age", "600") // Cache for 10 minutes

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent) // 204 status code for OPTIONS
			return
		}
		log.Println("Using CORS Middleware")
		c.Next()
	}
}

func LoggingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		start := time.Now()
		c.Next()
		duration := time.Since(start)
		log.Println("Using Logging Middleware")
		log.Printf("Method: %s | Path: %s | Status: %d | Duration: %v",
			c.Request.Method, c.Request.URL.Path, c.Writer.Status(), duration)
	}
}
