from typing import Optional
from fastapi import FastAPI
from neomodel import config

# from neomodel import config
config.DATABASE_URL = f"bolt://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}"

app = FastAPI()



@app.get("/")
async def read_root():

    
    return {"Status": "Success"}


