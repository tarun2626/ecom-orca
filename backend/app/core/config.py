from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "eCommerce Orchestrator"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:mysecretpassword@127.0.0.1:5433/ecommerce_db"
    SECRET_KEY: str = "CHANGE_ME_IN_PROD"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
