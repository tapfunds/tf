package controllers

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// TokenValid validates the JWT token in the request
func TokenValid(tokenString string) error {
	if tokenString == "" {
		return fmt.Errorf("missing token")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Check if the token's signing method is HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("API_SECRET")), nil
	})
	if err != nil {
		return fmt.Errorf("invalid token: %v", err)
	}

	// Ensure token is valid and claims are properly extracted
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		exp, ok := claims["exp"].(float64)
		if !ok {
			return fmt.Errorf("invalid exp claim")
		}

		// Compare the expiration time (float64) with the current time (int64)
		if int64(exp) < time.Now().Unix() {
			return fmt.Errorf("token has expired")
		}
	}
	return nil
}

func (server *Server) CheckToken(c *gin.Context) {
	token := c.Param("token")
	fmt.Printf("Parsing Token")
	if err := TokenValid(token); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"isValid": false, "error": err.Error()})
		return
	}
	fmt.Printf("Succesfully Token")

	c.JSON(http.StatusOK, gin.H{"isValid": true})
}
