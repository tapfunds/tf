package tests

import (
	"net/http"
	"os"
	"testing"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/tapfunds/tf/auth/api/auth"
)

func TestExpiredToken(t *testing.T) {
	// Set the API_SECRET environment variable
	os.Setenv("API_SECRET", "your-secret-key")

	claims := auth.CustomClaims{
		Authorized: true,
		ID:         123,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Second * 1).Unix(), // 1 second expiry
		},
	}
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(os.Getenv("API_SECRET")))
	if err != nil {
		t.Fatalf("Failed to create token: %v", err)
	}

	time.Sleep(time.Second * 2) // Wait for token to expire

	// Create a mock request with the token
	req := &http.Request{
		Header: http.Header{
			"Authorization": []string{"Bearer " + token},
		},
	}

	// Validate the token
	err = auth.TokenValid(req)
	if err == nil {
		t.Fatal("Token should have expired")
	} else {
		t.Logf("Token validation failed as expected: %v", err)
	}
}

func TestValidToken(t *testing.T) {
	// Set the API_SECRET environment variable
	os.Setenv("API_SECRET", "your-secret-key")

	claims := auth.CustomClaims{
		Authorized: true,
		ID:         123,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 1).Unix(), // 1 hour expiry
		},
	}
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(os.Getenv("API_SECRET")))
	if err != nil {
		t.Fatalf("Failed to create token: %v", err)
	}

	// Create a mock request with the token
	req := &http.Request{
		Header: http.Header{
			"Authorization": []string{"Bearer " + token},
		},
	}

	// Validate the token
	err = auth.TokenValid(req)
	if err != nil {
		t.Fatalf("Token should be valid: %v", err)
	} else {
		t.Log("Token is valid as expected")
	}
}
