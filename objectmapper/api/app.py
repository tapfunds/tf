from typing import Optional
from fastapi import FastAPI
from neomodel import config
from pydantic import BaseModel
from api.controller.neo4j_controller import CreateTap, ReadTap
from fastapi.middleware.cors import CORSMiddleware
from api.utils.constants import DB_USER, DB_PASSWORD, DB_HOST, DB_PORT

# from neomodel import config
config.DATABASE_URL = "bolt://neo4j:changeme@localhost:7687"

app = FastAPI()

class User(BaseModel):
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
]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["POST", "GET"],
#     allow_headers=["*"],
# )

@app.post("/")
async def create_user(user: User):
    CreateTap(user_ID=user.uid, access_token=user.access_token)
    user.output = "200"
    return {"Status": user.output}

@app.get("/get")
def get_user(user: User):
    
    # user.output = ReadTap(user_ID=user.uid)
    return {"Status": "user.output"}