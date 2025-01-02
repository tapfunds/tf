package security

import "golang.org/x/crypto/bcrypt"

// receives a string and returns an bytestring representation of a sting
func Hash(password string) ([]byte, error) {

	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

// looks at hash and verify the correct password
func VerifyPassword(hashedPassword, password string) error {

	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))

}
