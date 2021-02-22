from typing import Optional
from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/")
async def read_root():

    # // not real 
    req = requests.post(url="http://localhost:8000/api/v1/identity", data={"access_token": "access-sandbox-1ebc4747-dde5-4ec0-b2ef-0c69983b9362"})
    
    lenth = len(req.json()["identity"])
    for i in range(lenth):
        print(req.json()["identity"][i]["owners"])
        print("\n")
    return {"WIIL IT KEEL": lenth}


