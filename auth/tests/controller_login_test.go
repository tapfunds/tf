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
	assert.NoError(t, err, "Failed to seed user")

	user2, err := testsetup.SeedUser("Damali", "damali@example.com", "password")
	assert.NoError(t, err, "Failed to seed user2")
	t.Log(user, user2)

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
		{
			name:       "Invalid Password",
			inputJSON:  fmt.Sprintf(`{"email": "%s", "password": "wrong password"}`, user.Email),
			statusCode: 401, // Use 401 Unauthorized for bad credentials
			wantErr:    true,
			errMessage: "Authentication_failed",
		},
		{
			name:       "User Not Found",
			inputJSON:  `{"email": "frank@example.com", "password": "password"}`,
			statusCode: 401, // Use 401 Unauthorized
			wantErr:    true,
			errMessage: "Authentication_failed",
		},
		{
			name:       "Valid Login another user",
			inputJSON:  fmt.Sprintf(`{"email": "%s", "password": "password"}`, user2.Email),
			statusCode: 200,
			username:   user2.Username,
			email:      user2.Email,
			wantErr:    false,
		},
		{
			name:       "Missing Email",
			inputJSON:  `{"email": "", "password": "password"}`,
			statusCode: 422,
			wantErr:    true,
			errMessage: "email",
		},
		{
			name:       "Invalid Email Format",
			inputJSON:  `{"email": "kanexample.com", "password": "password"}`,
			statusCode: 422,
			wantErr:    true,
			errMessage: "email",
		},
		{
			name:       "Missing Password",
			inputJSON:  `{"email": "kan@example.com", "password": ""}`,
			statusCode: 422,
			wantErr:    true,
			errMessage: "password",
		},
	}

	for _, v := range samples {
		t.Run(v.name, func(t *testing.T) { // Use t.Run for subtests
			router := gin.Default()
			router.POST("/login", testsetup.Server.Login)
			req, err := http.NewRequest(http.MethodPost, "/login", bytes.NewBufferString(v.inputJSON))
			assert.NoError(t, err, "Error creating request")
			responseRecorder := httptest.NewRecorder()

			router.ServeHTTP(responseRecorder, req)
			if v.wantErr == false {
				var response map[string]interface{}
				assert.NoError(t, json.Unmarshal(responseRecorder.Body.Bytes(), &response), "Failed to parse response body")
				// Ensure there's no error in the response
				_, errorExists := response["error"]
				assert.False(t, errorExists, "Response contains an unexpected error: %v\nResponse: %s\n", response["error"], responseRecorder.Body.Bytes())
			}

			assert.Equal(t, v.statusCode, responseRecorder.Code, "Unexpected status code")

			if v.wantErr {
				var response map[string]interface{}
				assert.NoError(t, json.Unmarshal(responseRecorder.Body.Bytes(), &response), "Failed to parse error response")
				// Ensure the "error" key exists and is a map
				errorMap, ok := response["error"].(map[string]interface{})
				assert.True(t, ok, "'error' key is missing or not a valid map")

				// Check that the error message is present
				assert.Contains(t, errorMap, v.errMessage, v.errMessage)
			} else if responseRecorder.Code == 200 { // Handle successful response
				var response map[string]interface{}
				err := json.Unmarshal(responseRecorder.Body.Bytes(), &response)
				assert.NoError(t, err, "Failed to parse response body")

				// Access nested "response" key
				data, ok := response["response"].(map[string]interface{})
				assert.True(t, ok, "Failed to access 'response' key in JSON")

				// Validate fields
				assert.Equal(t, v.username, data["username"], "Username mismatch")
				assert.Equal(t, v.email, data["email"], "Email mismatch")

				// Validate that the token is present and not empty
				token, ok := data["token"].(string)
				assert.True(t, ok, "Token is missing or invalid")
				assert.NotEmpty(t, token, "Token should not be empty")
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
