import requests
from api.utils.constants import PLAID_SERVICE

def check_error_exist(dict):
    error = False
    for _, val in dict.items():
        if val == '' or val == 0:
             continue
        else:
            error = True
            return error
    return error

def retrieve_identity(access_token):
    res = requests.post(url=f"http://localhost:8000/api/v1/identity", data={"access_token": access_token})
    return res

def retrieve_institution(access_token):
    res = requests.post(url=f"http://localhost:8000/api/v1/plaid/item", data={"access_token": access_token})
    return res