from typing import Optional
from fastapi import FastAPI
from neomodel import config
from pydantic import BaseModel
from api.controller.neo4j_controller import CreateTap, ReadTap, DeleteTap, UpdateTap
from fastapi.middleware.cors import CORSMiddleware
from api.utils.constants import DB_USER, DB_PASSWORD, DB_HOST, DB_PORT

# from neomodel import config
config.DATABASE_URL = "bolt://neo4j:changeme@localhost:7687"

app = FastAPI()

class Tap(BaseModel):
    uid: str 
    access_token: Optional[str] = None
    output: Optional[str] = None

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:80",
    "http://127.0.0.1:80",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:7687",
    "http://127.0.0.1:7687",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

@app.post("/")
async def create_user(tap: Tap):
    CreateTap(user_ID=tap.uid, access_token=tap.access_token)
    tap.output = "200"
    return {"Status": tap.output}

@app.get("/get")
def get_user(tap: Tap):
    tap.output = ReadTap(user_ID=tap.uid)
    print(tap.output[0], tap.output[1][0].account_id)
    tap = {
        "tap": tap.output[0].user_id,
        "accnt_id":tap.output[1][0].account_id,
        "accnt_nm":tap.output[1][0].account_name,
        "accnt_tp":tap.output[1][0].type,
        "accnt_sb":tap.output[1][0].subtype,
    }
    return tap

# since a tap can not delete just one account, we will just delete all taps for a use
@app.post("/update")
def update_tap(tap: Tap):
    tap.output = UpdateTap(user_ID=tap.uid)
    return tap.output

# since a tap can not delete just one account, we will just delete all taps for a use
@app.post("/delete")
def delete_tap(tap: Tap):
    tap.output = DeleteTap(user_ID=tap.uid)
    return tap.output