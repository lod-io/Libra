from fastapi import APIRouter
from . import handlers

api_router = APIRouter()
api_router.include_router(handlers.router, prefix="/chat", tags=["chat"])
