from api.utils.helpers import check_error_exist, retrieve_identity, retrieve_institution
from api.models.Models import User, Institution, Account, Name, Address, PhoneNumber, Email
from neomodel import db

# Taps are unique to a item, meaning we've tapped the accounts at the authorized insatituion
def CreateTap(user_ID = None, access_token = None):
    db.set_connection("bolt://neo4j:changeme@localhost:7687")
    # user id and access token will be passed to API
    # create user node
    # print("User ID:{user_ID}")
    
    tap_user = User(user_id = user_ID).save()
    print("user built...\n")

    identity = retrieve_identity(access_token=access_token)

    # check identity error and send message somewhere to let some service know
    if check_error_exist(identity.json()["item"]["error"]):
        print(f"Address this error\n")
        # send message to user or service about error 
    else:
        print(f"No error\n")
        
    # capture available products so we know what endpoints are valid and restrict user calls with that info
    # add identity.json()["item"]["available_products"] -needs way of effecting roles....
    
    institution_res = retrieve_institution(access_token=access_token)
    
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
    
    print("institution info built\n")
    
    # lenth = len(identity.json()["accounts"])
    
    # for i in range(lenth):
    
    #     # Belongs to accnt node
    #     # account ingormation
    #     account = Account(
    #         account_ID = identity.json()["accounts"][i]["account_id"], 
    #         account_name =identity.json()["accounts"][i]["name"], 
    #         subtype = identity.json()["accounts"][i]["subtype"], 
    #         type = identity.json()["accounts"][i]["type"],
    #     ).save()

    #     print("account info built...\n")
        
    #     # owner information
    #     # we should to some heavy lifting for owner info
    #     name = Name(
    #         name = identity.json()["accounts"][i]["owners"][0]["names"], 
    #     ).save()
        
    #     address = Address(
    #         address = identity.json()["accounts"][i]["owners"][0]["addresses"], 
    #     ).save()
        
    #     phone_number = PhoneNumber(
    #         phone = identity.json()["accounts"][i]["owners"][0]["phone_numbers"], 
    #     ).save()
        
    #     email = Email(
    #         email = identity.json()["accounts"][i]["owners"][0]["emails"], 
    #     ).save()
        
    #     print("owner info built...\n")
        
    #     # best way to get balance is from endpoint for balance
    #     # same with transactions
        
    #     # connect nodes
    #     # account to owner information 
        
    #     account.name.connect(name)
    #     account.address.connect(address)
    #     account.phone_number.connect(phone_number)
    #     account.email.connect(email)
        
    #     # link user to account
    #     tap_user.accounts.connect(account)
    #     # link institution to account
    #     institution.accounts.connect(account)


    ("Finished node creattion. Bye")

# returns a dict of key based info about a user
# e.g.
"""
[{
  account_id : a,
    
}]
"""        
def ReadTap():
    pass

# requires more thinking about how a user might update an account
def UpdateTap():
    pass

# requires more thinking about how a user might delete an account
def DeleteTap():
    pass