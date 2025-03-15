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
)

type CustomClaims struct {
	Authorized bool   `json:"authorized"`
	ID         uint32 `json:"id"`
	jwt.StandardClaims
}

// CreateToken generates a JWT token for a user
func CreateToken(uid uint32) (string, error) {
	secret := os.Getenv("API_SECRET")
	if secret == "" {
		return "", fmt.Errorf("API_SECRET environment variable not set")
	}
	claims := CustomClaims{
		Authorized: true,
		ID:         uid,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// func CreateToken(id uint32) (string, error) {
// 	claims := jwt.MapClaims{
// 		"authorized": true,
// 		"id":         id,
// 		"exp":        time.Now().Add(time.Hour * 24).Unix(), // Set token expiry to 24 hours
// 	}
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	return token.SignedString([]byte(os.Getenv("API_SECRET")))
// }

func IsTokenExpired(claims jwt.MapClaims) bool {
	exp, ok := claims["exp"].(float64)
	if !ok {
		return true
	}
	return time.Now().Unix() > int64(exp)
}

// TokenValid validates the JWT token in the request
func TokenValid(r *http.Request) error {
	tokenString := ExtractToken(r)
	if tokenString == "" {
		return fmt.Errorf("missing token")
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// is token.Method type HMAC?
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

		Pretty(claims)
	}

	return nil
}

// ExtractToken retrieves the token from the request header
func ExtractToken(r *http.Request) string {
	// Try to extract from Authorization header
	bearerToken := r.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}

// ExtractTokenID retrieves the user ID from the token
func ExtractTokenID(r *http.Request) (uint32, error) {
	tokenString := ExtractToken(r)
	if tokenString == "" {
		return 0, fmt.Errorf("missing token")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("API_SECRET")), nil
	})
	if err != nil {
		return 0, fmt.Errorf("invalid token: %v", err)
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return 0, fmt.Errorf("invalid token claims")
	}

	id, ok := claims["id"].(float64) // JWTs decode numbers as float64
	if !ok {
		return 0, fmt.Errorf("invalid id claim")
	}

	return uint32(id), nil
}

// Pretty display the claims licely in the terminal
func Pretty(data interface{}) {
	b, err := json.MarshalIndent(data, "", " ")
	if err != nil {
		log.Println(err)
		return
	}

	fmt.Println(string(b))
}
