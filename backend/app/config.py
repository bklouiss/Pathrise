# app/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # API Keys
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./hackathon.db")
    MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017/hackathon")
    
    # API Settings
    API_V1_PREFIX = "/api/v1"
    PROJECT_NAME = "Hackathon API"
    
    # CORS
    ALLOWED_ORIGINS = [
        "http://localhost:3000",  # React dev server
        "http://localhost:3001",  # Alternative React port
        "http://127.0.0.1:3000",
    ]

settings = Settings()