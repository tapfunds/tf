from typing import Optional
from fastapi import FastAPI
from neomodel import config
from pydantic import BaseModel
from api.models.Models import CreateTap
from fastapi.middleware.cors import CORSMiddleware
import os
from api.utils import DB_USER, DB_PASSWORD, DB_HOST, DB_PORT

# from neomodel import config
config.DATABASE_URL = f"bolt://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}"

app = FastAPI()

class User(BaseModel):
    uid: str
    access_token: str
    output: str

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:80",
    "http://127.0.0.1:80",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
     
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST","GET"],
    allow_headers=["*"],
)

@app.post("/")
async def read_root(user: User):
    
    CreateTap(user_id=user.uid, access_token=user.access_token)    
    user.output = "uccess"
    return {"Status": user.output}