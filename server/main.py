from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.routes import api_router

app = FastAPI(
    title="Libra"
)

# Get environment variables with defaults
PORT = int(os.getenv("PORT", 8000))
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=[
        "Content-Type",
        "Authorization"
    ],
    expose_headers=["Content-Type"]
)

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
