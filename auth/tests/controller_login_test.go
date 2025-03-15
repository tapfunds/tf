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
	defer teardownTest()

	user, err := testsetup.SeedUser("Nala", "nala@example.com", "password")
	assert.NoError(t, err, "Failed to seed user")

	user2, err := testsetup.SeedUser("Damali", "damali@example.com", "password")
	assert.NoError(t, err, "Failed to seed user2")
	t.Log(user, user2)

	samples := []struct {
		name       string
		inputJSON  string
		statusCode int
		username   string
		email      string
		wantErr    bool
		errMessage string // Update this to match the validator's error messages
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
			statusCode: 401,
			wantErr:    true,
			errMessage: "Authentication_failed",
		},
		{
			name:       "User Not Found",
			inputJSON:  `{"email": "frank@example.com", "password": "password"}`,
			statusCode: 401,
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
			errMessage: "Email", // Updated to match the validator's error message
		},
		{
			name:       "Invalid Email Format",
			inputJSON:  `{"email": "kanexample.com", "password": "password"}`,
			statusCode: 422,
			wantErr:    true,
			errMessage: "Email", // Updated to match the validator's error message
		},
		{
			name:       "Missing Password",
			inputJSON:  `{"email": "kan@example.com", "password": ""}`,
			statusCode: 422,
			wantErr:    true,
			errMessage: "Password", // Updated to match the validator's error message
		},
	}

	for _, v := range samples {
		t.Run(v.name, func(t *testing.T) {
			router := gin.Default()
			router.POST("/login", testsetup.Server.Login)
			req, err := http.NewRequest(http.MethodPost, "/login", bytes.NewBufferString(v.inputJSON))
			assert.NoError(t, err, "Error creating request")
			responseRecorder := httptest.NewRecorder()

			router.ServeHTTP(responseRecorder, req)
			if v.wantErr == false {
				var response map[string]interface{}
				assert.NoError(t, json.Unmarshal(responseRecorder.Body.Bytes(), &response), "Failed to parse response body")
				_, errorExists := response["error"]
				assert.False(t, errorExists, "Response contains an unexpected error: %v\nResponse: %s\n", response["error"], responseRecorder.Body.Bytes())
			}

			assert.Equal(t, v.statusCode, responseRecorder.Code, "Unexpected status code")

			if v.wantErr {
				var response map[string]interface{}
				assert.NoError(t, json.Unmarshal(responseRecorder.Body.Bytes(), &response), "Failed to parse error response")
				errorMap, ok := response["error"].(map[string]interface{})
				assert.True(t, ok, "'error' key is missing or not a valid map")
				// Check that the error message is present
				assert.Contains(t, errorMap, v.errMessage, fmt.Sprintf("Expected error message for %s", v.errMessage))
			} else if responseRecorder.Code == 200 {
				var response map[string]interface{}
				err := json.Unmarshal(responseRecorder.Body.Bytes(), &response)
				assert.NoError(t, err, "Failed to parse response body")

				data, ok := response["response"].(map[string]interface{})
				assert.True(t, ok, "Failed to access 'response' key in JSON")

				assert.Equal(t, v.username, data["username"], "Username mismatch")
				assert.Equal(t, v.email, data["email"], "Email mismatch")

				token, ok := data["token"].(string)
				assert.True(t, ok, "Token is missing or invalid")
				assert.NotEmpty(t, token, "Token should not be empty")
			}

			if v.statusCode >= 500 {
				t.Error("Unexpected internal server error")
			}
		})
	}

	if testsetup.Server.DB != nil {
		testsetup.Server.DB.Close()
	}
}
