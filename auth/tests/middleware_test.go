package tests

import (
	"net/http"
	"os"
	"testing"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/tapfunds/tf/auth/api/auth" // Import your auth package
)

func TestExpiredToken(t *testing.T) {
	// Set the API_SECRET environment variable
	os.Setenv("API_SECRET", "your-secret-key")

	// Create an expired token
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

	// Extract the token from the request
	tokenString := auth.ExtractToken(req)

	// Validate the token using ParseToken
	_, _, err = auth.ParseToken(tokenString)
	if err == nil {
		t.Fatal("Token should have expired")
	} else {
		t.Logf("Token validation failed as expected: %v", err)
	}
}

func TestValidToken(t *testing.T) {
	// Set the API_SECRET environment variable
	os.Setenv("API_SECRET", "your-secret-key")

	// Create a valid token
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

	// Extract the token from the request
	tokenString := auth.ExtractToken(req)

	// Validate the token using ParseToken
	_, _, err = auth.ParseToken(tokenString)
	if err != nil {
		t.Fatalf("Token should be valid: %v", err)
	} else {
		t.Log("Token is valid as expected")
	}
}

func TestTokenValidation(t *testing.T) {
	// Set the API_SECRET environment variable
	os.Setenv("API_SECRET", "your-secret-key")

	// Create a valid token
	userID := uint32(456)
	token, err := auth.CreateToken(userID, false)
	if err != nil {
		t.Fatalf("Failed to create token: %v", err)
	}

	// Test the ValidateToken function directly
	response := auth.ValidateToken(token)
	if !response.IsValid {
		t.Fatalf("Token should be valid but got error: %s", response.Error)
	}

	if response.UserID != userID {
		t.Fatalf("Expected user ID %d but got %d", userID, response.UserID)
	}

	t.Log("Token validation successful with correct user ID")
}

func TestExtractTokenID(t *testing.T) {
	// Set the API_SECRET environment variable
	os.Setenv("API_SECRET", "your-secret-key")

	// Create a valid token with a specific user ID
	userID := uint32(789)
	token, err := auth.CreateToken(userID, false)
	if err != nil {
		t.Fatalf("Failed to create token: %v", err)
	}

	// Create a mock request with the token
	req := &http.Request{
		Header: http.Header{
			"Authorization": []string{"Bearer " + token},
		},
	}

	// Extract the user ID from the token
	extractedID, err := auth.ExtractTokenID(req)
	if err != nil {
		t.Fatalf("Failed to extract token ID: %v", err)
	}

	if extractedID != userID {
		t.Fatalf("Expected user ID %d but got %d", userID, extractedID)
	}

	t.Log("Successfully extracted correct user ID from token")
}
