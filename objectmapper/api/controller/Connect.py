import requests
from api.utils.errors import check_error_exist
from api.models import User, Institution, Account, Transactions, Balance, Name, Address, PhoneNumber, Email


def retrieve_identity(access_token):
    res = requests.post(url=f"{PLAID_SERVICE}/api/v1/identity", data={"access_token": "access-sandbox-1ebc4747-dde5-4ec0-b2ef-0c69983b9362"})
    return res

def retrieve_institution(access_token):
    res = requests.post(url=f"{PLAID_SERVICE}/api/v1/plaid/item", data={"access_token": "access-sandbox-1ebc4747-dde5-4ec0-b2ef-0c69983b9362"})
    return res

# Taps are unique to a item, meaning we've tapped the accounts at the authorized insatituion
def CreateTap(user_ID = None, access_token = None):
    
    # user id and access token will be passed to API
    # create user node
    # print("User ID:{user_ID}")
    
    tap_user = User(user_id = user_ID).save()
    print("User built...\n")

    # check identity error and send message somewhere to let some service know
    if check_error_exist(identity.json()["item"]["error"]):
        print(f"Address this error\n")
        # send message to user or service about error 
    else:
        print(f"No error\n")
        
    # capture available products so we know what endpoints are valid
    # since user does not have choice, we will ignore for now, but it may be necessary to get that info
    # if so just ad identity.json()["item"]["available_products"
    
    institution_res = retrieve_identity(access_token=access_token)
    
    # Each item belongs to an insitution node whose values never change across users
    # I need to check fpr institution in datbase or make a script to populate the DB a priori anything else
    # Institution node Information
    # put these in try blocks
    
    institution = Institution(
        id=institution_res.json()["item"]["institution_id"], 
        name=institution_res.json()["institution"]["name"], 
        color=institution_res.json()["institution"]["primary_color"], 
        logo=institution_res.json()["institution"]["logo"],
        link= institution_res.json()["institution"]["url"], 
    ).save()
    
    print("Institution built\n")
    
    identity = retrieve_identity(access_token=access_token)
    
    lenth = len(identity.json()["accounts"])
    for i in range(lenth):
    
        # Belongs to item node
        # account ingormation
        print("Account Name:", identity.json()["accounts"][i]["name"])
        print("Account ID:", identity.json()["accounts"][i]["account_id"])
        print("Account Subtype", identity.json()["accounts"][i]["subtype"])
        print("Account Type", identity.json()["accounts"][i]["type"])
        print("account info built...\n")
        
        # owner information
        # we should to some heavy lifting for account info
        print("Account Owner Name:", identity.json()["accounts"][i]["owners"][0]["names"])
        print("Account Owner Adress:", identity.json()["accounts"][i]["owners"][0]["addresses"])
        print("Account Owner Email:", identity.json()["accounts"][i]["owners"][0]["emails"])
        print("Account Owner Phone Number:", identity.json()["accounts"][i]["owners"][0]["phone_numbers"])
        print("account info built...\n")
        
        # best way to get balance is from endpoint for balance
        # same with transactions
        
        print("\n")
    pass
