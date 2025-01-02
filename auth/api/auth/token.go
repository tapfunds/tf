package auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// CreateToken generates a JWT token for a user
func CreateToken(id uint32) (string, error) {
	claims := jwt.MapClaims{
		"authorized": true,
		"id":         id,
		"exp":        time.Now().Add(time.Hour * 24).Unix(), // Set token expiry to 24 hours
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("API_SECRET")))
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
		if claims["exp"].(int64) < time.Now().Unix() {
			return fmt.Errorf("token has expired")
		}
		Pretty(claims)
	}
	return nil
}

// ExtractToken retrieves the token from the request header or query params
func ExtractToken(r *http.Request) string {
	// Try to extract from query string
	bearerToken := r.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}

	// Try to extract from Authorization header
	keys := r.URL.Query()
	token := keys.Get("token")
	if token != "" {
		return token
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
		// Validate the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("API_SECRET")), nil
	})
	if err != nil {
		return 0, fmt.Errorf("invalid token: %v", err)
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		uid, err := strconv.ParseUint(fmt.Sprintf("%.0f", claims["id"]), 10, 32)
		if err != nil {
			return 0, err
		}
		return uint32(uid), nil
	}
	return 0, nil
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
