from dotenv import load_dotenv
import os

load_dotenv()

# Debug check
print("Loaded API Key:", os.getenv("GOOGLE_API_KEY"))

print("GOOGLE_API_KEY:", os.getenv("GOOGLE_API_KEY"))