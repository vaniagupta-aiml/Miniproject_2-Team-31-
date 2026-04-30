import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load sign language gestures from an editable JSON file
with open("signs.json", "r", encoding="utf-8") as f:
    signs = json.load(f)

class SpeechRequest(BaseModel):
    text: str

@app.post("/speech-to-sign")
async def speech_to_sign(request: SpeechRequest):
    text = request.text.lower()
    
    # Find matching sign
    for sign_name, sign_data in signs.items():
        for keyword in sign_data["keywords"]:
            if keyword in text:
                return {"word": sign_name, "sign": sign_data["gesture"], "recognized_text": text}
    
    return {"word": "unknown", "sign": "No matching sign found", "recognized_text": text}

frontend_dist = Path(__file__).resolve().parent.parent / "sign-language-frontend" / "dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")
