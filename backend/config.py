from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MONGO_URI: str = os.getenv("MONGO_URI")
    MONGO_DB: str = os.getenv("MONGO_DB")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY")
settings = Settings()