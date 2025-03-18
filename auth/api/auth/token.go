package auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// TokenResponse represents the standard response format for token operations
type TokenResponse struct {
	IsValid   bool   `json:"isValid"`
	UserID    uint32 `json:"userId,omitempty"`
	ExpiresIn int64  `json:"expiresIn,omitempty"`
	Error     string `json:"error,omitempty"`
}

// CustomClaims defines the structure for JWT claims
type CustomClaims struct {
	Authorized bool   `json:"authorized"`
	ID         uint32 `json:"id"`
	jwt.StandardClaims
}

// CreateToken generates a JWT token for a user
func CreateToken(uid uint32, remember bool) (string, error) {
	secret := os.Getenv("API_SECRET")
	if secret == "" {
		return "", fmt.Errorf("API_SECRET environment variable not set")
	}

	// Default is 3 days, remember me makes it 7 days
	expirationTime := time.Hour * 72
	if remember {
		expirationTime = time.Hour * 168 // 7 days
	}

	claims := CustomClaims{
		Authorized: true,
		ID:         uid,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(expirationTime).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// ParseToken is a core function that parses and validates any JWT token
func ParseToken(tokenString string) (*jwt.Token, jwt.MapClaims, error) {
	if tokenString == "" {
		return nil, nil, fmt.Errorf("missing token")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("API_SECRET")), nil
	})

	if err != nil {
		return nil, nil, fmt.Errorf("invalid token: %v", err)
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, nil, fmt.Errorf("invalid token claims")
	}

	// Check expiration
	exp, ok := claims["exp"].(float64)
	if !ok || int64(exp) < time.Now().Unix() {
		return nil, nil, fmt.Errorf("token has expired")
	}

	return token, claims, nil
}

// ValidateToken validates a token string and returns detailed information
func ValidateToken(tokenString string) TokenResponse {
	_, claims, err := ParseToken(tokenString)
	if err != nil {
		return TokenResponse{
			IsValid: false,
			Error:   err.Error(),
		}
	}

	// Extract user ID
	userIDFloat, ok := claims["id"].(float64)
	if !ok {
		return TokenResponse{
			IsValid: false,
			Error:   "invalid user ID in token",
		}
	}
	userID := uint32(userIDFloat)

	// Calculate remaining lifetime
	exp := int64(claims["exp"].(float64))
	expiresIn := exp - time.Now().Unix()

	return TokenResponse{
		IsValid:   true,
		UserID:    userID,
		ExpiresIn: expiresIn,
	}
}

// ExtractToken retrieves the token from the request header
func ExtractToken(r *http.Request) string {
	bearerToken := r.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}

// ExtractTokenID retrieves the user ID from the token in a request
func ExtractTokenID(r *http.Request) (uint32, error) {
	tokenString := ExtractToken(r)
	_, claims, err := ParseToken(tokenString)
	if err != nil {
		return 0, err
	}

	userIDFloat, ok := claims["id"].(float64)
	if !ok {
		return 0, fmt.Errorf("invalid id claim")
	}

	return uint32(userIDFloat), nil
}

// Pretty displays the claims nicely in the terminal
func Pretty(data interface{}) {
	b, err := json.MarshalIndent(data, "", " ")
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Println(string(b))
}

// GinHandler for token validation endpoints
func ValidateTokenHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Param("token")
		response := ValidateToken(token)

		if !response.IsValid {
			c.JSON(http.StatusUnauthorized, response)
			return
		}

		c.JSON(http.StatusOK, response)
	}
}

// TokenAuthMiddleware handles JWT authentication in Gin
func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := ExtractToken(c.Request)
		_, claims, err := ParseToken(tokenString)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"status": http.StatusUnauthorized,
				"error":  "Unauthorized: " + err.Error(),
			})
			return
		}

		userIDFloat, ok := claims["id"].(float64)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"status": http.StatusUnauthorized,
				"error":  "Unauthorized: invalid user ID",
			})
			return
		}

		c.Set("user_id", uint32(userIDFloat))
		c.Next()
	}
}
