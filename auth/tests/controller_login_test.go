package tests

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/tapfunds/tf/auth/api/models"
	testsetup "github.com/tapfunds/tf/auth/tests/setup"
	// Import your models package
)

func setupTest(t *testing.T) {
	gin.SetMode(gin.TestMode)
	testsetup.SetupDatabase()
	assert.NoError(t, testsetup.RefreshTables(&models.User{}, &models.PlaidIntegration{}))
}

func teardownTest() {
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}

func TestLogin(t *testing.T) {
	setupTest(t)
	defer teardownTest() // Ensure teardown is always called

	user, err := testsetup.SeedUser("Nala", "nala@example.com", "password")
	if err != nil {
		t.Fatalf("Error seeding user: %v", err)
	}
	assert.NoError(t, err)
	user2, err := testsetup.SeedUser("Damali", "damali@example.com", "password")
	if err != nil {
		t.Fatalf("Error seeding user: %v", err)
	}

	samples := []struct {
		name       string // Add a name for each test case
		inputJSON  string
		statusCode int
		username   string
		email      string
		wantErr    bool   // Flag for expected errors
		errMessage string // Expected error message
	}{
		{
			name:       "Valid Login",
			inputJSON:  fmt.Sprintf(`{"email": "%s", "password": "password"}`, user.Email),
			statusCode: 200,
			username:   user.Username,
			email:      user.Email,
			wantErr:    false,
		},
		// {
		// 	name:       "Invalid Password",
		// 	inputJSON:  fmt.Sprintf(`{"email": "%s", "password": "wrong password"}`, user.Email),
		// 	statusCode: 401, // Use 401 Unauthorized for bad credentials
		// 	wantErr:    true,
		// 	errMessage: "Authentication_failed",
		// },
		// {
		// 	name:       "User Not Found",
		// 	inputJSON:  `{"email": "frank@example.com", "password": "password"}`,
		// 	statusCode: 401, // Use 401 Unauthorized
		// 	wantErr:    true,
		// 	errMessage: "Authentication_failed",
		// },
		// {
		// 	name:       "Invalid Email Format",
		// 	inputJSON:  `{"email": "kanexample.com", "password": "password"}`,
		// 	statusCode: 422,
		// 	wantErr:    true,
		// 	errMessage: "Invalid_email",
		// },
		// {
		// 	name:       "Missing Email",
		// 	inputJSON:  `{"email": "", "password": "password"}`,
		// 	statusCode: 422,
		// 	wantErr:    true,
		// 	errMessage: "Required_email",
		// },
		// {
		// 	name:       "Missing Password",
		// 	inputJSON:  `{"email": "kan@example.com", "password": ""}`,
		// 	statusCode: 422,
		// 	wantErr:    true,
		// 	errMessage: "Required_password",
		// },
		// {
		// 	name:       "Duplicate Username",
		// 	inputJSON:  fmt.Sprintf(`{"username": "%s", "email": "duplicate@example.com", "password": "password"}`, user.Username),
		// 	statusCode: 422,
		// 	wantErr:    true,
		// 	errMessage: "username", // or a more specific message if you have one
		// },
		// {
		// 	name:       "Duplicate Email",
		// 	inputJSON:  fmt.Sprintf(`{"username": "duplicate_user", "email": "%s", "password": "password"}`, user.Email),
		// 	statusCode: 422,
		// 	wantErr:    true,
		// 	errMessage: "email", // Or a more specific message
		// },
		// {
		// 	name:       "Short Password",
		// 	inputJSON:  `{"username": "shortpass", "email": "shortpass@example.com", "password": "pass"}`,
		// 	statusCode: 422,
		// 	wantErr:    true,
		// 	errMessage: "password",
		// },
		{
			name:       "Valid Login another user",
			inputJSON:  fmt.Sprintf(`{"email": "%s", "password": "password"}`, user2.Email),
			statusCode: 200,
			username:   user2.Username,
			email:      user2.Email,
			wantErr:    false,
		},
	}

	for _, v := range samples {
		t.Run(v.name, func(t *testing.T) { // Use t.Run for subtests
			r := gin.Default()
			r.POST("/login", testsetup.Server.Login)
			req, err := http.NewRequest(http.MethodPost, "/login", bytes.NewBufferString(v.inputJSON))
			if err != nil {
				t.Fatalf("Error creating request: %v", err)
			}
			rr := httptest.NewRecorder()
			r.ServeHTTP(rr, req)

			// Parse the response body
			responseInterface := make(map[string]interface{})
			err = json.Unmarshal([]byte(rr.Body.Bytes()), &responseInterface)
			if err != nil && v.statusCode != 204 { // Ignore unmarshal error on 204 No Content
				t.Fatalf("Cannot convert to json: %v, Body: %s", err, rr.Body.String())
			}

			// Assert the status code
			assert.Equal(t, v.statusCode, rr.Code)
			t.Log("THIS A LOGGGG")
			t.Log(responseInterface)
			// Handle successful response (status code 200)
			if v.statusCode == 200 {
				responseMap, ok := responseInterface["response"].(map[string]interface{})
				if !ok {
					t.Fatalf("Response is not a map: %v", responseInterface["response"])
				}
				// Assert username, email, and token
				assert.Equal(t, v.username, responseMap["username"])
				assert.Equal(t, v.email, responseMap["email"])
				// Validate that token is not empty
				token, ok := responseMap["token"].(string)
				if !ok || token == "" {
					t.Fatalf("Expected non-empty token, got: %v", token)
				}
			} else if v.wantErr {
				// Handle error response
				responseMap, ok := responseInterface["error"].(map[string]interface{})
				if !ok {
					t.Fatalf("Error response is not a map: %v", responseInterface)
				}
				if v.errMessage != "" {
					// Ensure that the error contains the expected message
					assert.Contains(t, responseMap, v.errMessage)
				}
			}

			// Check if the status code indicates an internal error
			if v.statusCode >= 500 {
				t.Error("Unexpected internal server error")
			}
		})
	}

	// Cleanup database connections
	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}
