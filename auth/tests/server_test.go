package tests

import (
	"testing"

	testsetup "github.com/tapfunds/tf/auth/tests/setup"
)

func TestSetupDatabaseConnection(t *testing.T) {
	err := testsetup.SetupDatabase()
	if err != nil {
		t.Fatalf("Setup failed: %v", err)
	}
}
