package controllers

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/plaid/plaid-go/plaid"
)

var (
	PLAID_CLIENT_ID     = os.Getenv("PLAID_CLIENT_ID")
	PLAID_SECRET        = os.Getenv("PLAID_SECRET")
	PLAID_ENV           = os.Getenv("PLAID_ENV")
	PLAID_PRODUCTS      = os.Getenv("PLAID_PRODUCTS")
	PLAID_COUNTRY_CODES = os.Getenv("PLAID_COUNTRY_CODES")
	PLAID_REDIRECT_URI  = os.Getenv("PLAID_REDIRECT_URI")
	APP_PORT            = os.Getenv("APP_PORT")
)

// If not testing in Sandbox, remove these four lines and instead use a publicToken obtained from Link
var (
	sandboxInstitution = "ins_109508"
	testProducts       = []string{"auth"}
)

var environments = map[string]plaid.Environment{
	"sandbox":     plaid.Sandbox,
	"development": plaid.Development,
	"production":  plaid.Production,
}

var client = func() *plaid.Client {
	client, err := plaid.NewClient(plaid.ClientOptions{
		PLAID_CLIENT_ID,
		PLAID_SECRET,
		environments[PLAID_ENV],
		&http.Client{},
	})
	if err != nil {
		panic(fmt.Errorf("unexpected error while initializing plaid client %w", err))
	}
	return client
}()

type httpError struct {
	errorCode int
	error     string
}

func (httpError *httpError) Error() string {
	return httpError.error
}

func renderError(c *gin.Context, err error) {
	if plaidError, ok := err.(plaid.Error); ok {
		// Return 200 and allow the front end to render the error.
		c.JSON(http.StatusOK, gin.H{"error": plaidError})
		return
	}
	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
}

func (server *Server) createLinkToken(c *gin.Context) {
	linkToken, err := linkTokenCreate(nil)
	if err != nil {
		renderError(c, err)
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"link_token": linkToken})
}

func linkTokenCreate(paymentInitiation *plaid.PaymentInitiation) (string, *httpError) {
	countryCodes := strings.Split(PLAID_COUNTRY_CODES, ",")
	products := strings.Split(PLAID_PRODUCTS, ",")
	redirectURI := PLAID_REDIRECT_URI
	configs := plaid.LinkTokenConfigs{
		User: &plaid.LinkTokenUser{
			// This should correspond to a unique id for the current user.
			ClientUserID: time.Now().String(),
		},
		ClientName:        "tapfunds",
		Products:          products,
		CountryCodes:      countryCodes,
		Language:          "en",
		RedirectUri:       redirectURI,
		PaymentInitiation: paymentInitiation,
	}
	resp, err := client.CreateLinkToken(configs)

	if err != nil {
		log.Println(err)
		return "", &httpError{
			errorCode: http.StatusBadRequest,
			error:     err.Error(),
		}
	}
	return resp.LinkToken, nil
}

func (server *Server) getAccessToken(c *gin.Context) {
	publicToken := c.PostForm("public_token")
	var accessToken string
	var itemID string
	var institutionAccessToken string

	// institution token for transfer. Can I just get this from the regular flow
	products := strings.Split(PLAID_PRODUCTS, ",")
	sandboxResp, err := client.CreateSandboxPublicToken(sandboxInstitution, products)
	publicTokenInst := sandboxResp.PublicToken

	// save this access token to DB
	tokenResp, err := client.ExchangePublicToken(publicTokenInst)

	response, err := client.ExchangePublicToken(publicToken)
	if err != nil {
		renderError(c, err)
		return
	}
	institutionAccessToken = tokenResp.AccessToken
	accessToken = response.AccessToken
	itemID = response.ItemID

	c.JSON(http.StatusOK, gin.H{
		"access_token":             accessToken,
		"item_id":                  itemID,
		"access_token_institution": institutionAccessToken,
	})
}

func (server *Server) authorize(c *gin.Context) {
	accessToken := c.PostForm("access_token")

	response, err := client.GetAuth(accessToken)
	if err != nil {
		renderError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"accounts": response.Accounts,
		"numbers":  response.Numbers,
	})
}

func (server *Server) balance(c *gin.Context) {
	accessToken := c.PostForm("access_token")

	response, err := client.GetBalances(accessToken)
	if err != nil {
		renderError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"accounts": response.Accounts,
	})
}

func (server *Server) accounts(c *gin.Context) {
	accessToken := c.PostForm("access_token")

	response, err := client.GetAccounts(accessToken)
	if err != nil {
		renderError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"accounts": response.Accounts,
	})
}

func (server *Server) item(c *gin.Context) {
	accessToken := c.PostForm("access_token")

	response, err := client.GetItem(accessToken)
	if err != nil {
		renderError(c, err)
		return
	}

	countryCodes := strings.Split(PLAID_COUNTRY_CODES, ",")
	options := plaid.GetInstitutionByIDOptions{
		IncludeOptionalMetadata: true,
		IncludeStatus          : false,
	}	
	institution, err := client.GetInstitutionByIDWithOptions(
		response.Item.InstitutionID, 
		countryCodes, 
		options)
	if err != nil {
		renderError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"item":        response.Item,
		"institution": institution.Institution,
	})
}

func (server *Server) identity(c *gin.Context) {
	accessToken := c.PostForm("access_token")

	response, err := client.GetIdentity(accessToken)
	if err != nil {
		renderError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"accounts": response.Accounts,
		"item": response.Item,
	})
}

func (server *Server) transactions(c *gin.Context) {
	accessToken := c.PostForm("access_token")

	// pull transactions for the past 30 days
	endDate := time.Now().Local().Format("2006-01-02")
	startDate := time.Now().Local().Add(-30 * 24 * time.Hour).Format("2006-01-02")

	response, err := client.GetTransactions(accessToken, startDate, endDate)

	if err != nil {
		renderError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"accounts":     response.Accounts,
		"transactions": response.Transactions,
	})
}

// this is new , get stripe token then do some stuff with stripe api
func (server *Server) transfer(c *gin.Context) {
	accessToken := c.PostForm("access_token_institution")
	account := c.PostForm("account")

	stripeTokenResp, err := client.CreateStripeToken(accessToken, account)
	stripeToken := stripeTokenResp.StripeBankAccountToken
	if err != nil {
		renderError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"stripe_token": stripeToken,
	})
}
