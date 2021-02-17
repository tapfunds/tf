from typing import Optional

from fastapi import FastAPI
import requests

app = FastAPI()


@app.get("/")
async def read_root():
    req = requests.post(url="http://localhost:8000/api/v1/identity", data={"access_token": "access-sandbox-1ebc4747-dde5-4ec0-b2ef-0c69983b9362"})
    print(req.text)
    return {"Ok, so like I finished, but.>>":"WEEL IT KEEL"}


