from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Marketplace Aggregator"
    DATABASE_URL: str
    SECRET_KEY: str
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    
    # OAuth settings
    FACEBOOK_CLIENT_ID: str
    FACEBOOK_CLIENT_SECRET: str
    ANIBIS_CLIENT_ID: str
    ANIBIS_CLIENT_SECRET: str
    TUTTI_CLIENT_ID: str
    TUTTI_CLIENT_SECRET: str
    RICARDO_CLIENT_ID: str
    RICARDO_CLIENT_SECRET: str

    class Config:
        env_file = ".env"

settings = Settings()