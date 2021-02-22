from typing import Optional
from fastapi import FastAPI
import requests
from utils.errors import check_error_exist


app = FastAPI()



@app.get("/")
async def read_root():

    # // not real 
    req = requests.post(url="http://localhost:8000/api/v1/identity", data={"access_token": "access-sandbox-1ebc4747-dde5-4ec0-b2ef-0c69983b9362"})
    
    # check error and send message somewhere to let some service know
    if check_error_exist(req.json()["item"]["error"]):
        print(f"Address this error")
        # send message to user or service about error 
    else:
        print(f"No error")
        
    # capture available products so we know what endpoints are valid
    # since user does not have choice, we will ignore for now, but it may be necessary to get that info
    # if so just ad req.json()["item"]["available_products"]

    req2 = requests.post(url="http://localhost:8000/api/v1/plaid/item", data={"access_token": "access-sandbox-1ebc4747-dde5-4ec0-b2ef-0c69983b9362"})

    
    print("\n")
    
    lenth = len(req.json()["accounts"])
    
    
    
    # Institution node Information
    print("Instituition ID:",req.json()["item"]["institution_id"])
    print("Institution Name:", req2.json()["institution"]["name"])
    print("Institution Color:", req2.json()["institution"]["primary_color"])
    print("Institution Logo:", req2.json()["institution"]["logo"])
    print("Institution Name:", req2.json()["institution"]["url"])
    print("\n")

    # item information
    print("Item ID:",req.json()["item"]["item_id"])
    
    for i in range(lenth):
    
        # account ingormation
        print("Account Name:", req.json()["accounts"][i]["name"])
        print("Account ID:", req.json()["accounts"][i]["account_id"])
        print("Account Subtype", req.json()["accounts"][i]["subtype"])
        print("Account Type", req.json()["accounts"][i]["type"])
        
        # owner information
        print("Account Owner Name:", req.json()["accounts"][i]["owners"][0]["names"])
        print("Account Owner Adress:", req.json()["accounts"][i]["owners"][0]["addresses"])
        print("Account Owner Email:", req.json()["accounts"][i]["owners"][0]["emails"])
        print("Account Owner Phone Number:", req.json()["accounts"][i]["owners"][0]["phone_numbers"])
        
        
        print("\n")
    
    return {"WIIL IT KEEL": lenth}


