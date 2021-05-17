from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Tapfunds Neo4j Bank API"
    admin_email: str

    class Config:

        env_file = ".env"
