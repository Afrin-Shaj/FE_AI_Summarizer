from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os

app = FastAPI()

origins = [os.getenv("FRONTEND_URL", "http://localhost:5173")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Backend is running 🚀"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()  # raw bytes (PDF, DOCX, etc.)
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(contents),
    }