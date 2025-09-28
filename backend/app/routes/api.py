# app/routes/api.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any

router = APIRouter()

class HealthResponse(BaseModel):
    status: str
    message: str

@router.get("/health", response_model=HealthResponse)
async def api_health():
    return {"status": "healthy", "message": "API endpoints are working"}

@router.get("/test")
async def test_endpoint():
    return {"message": "Test endpoint working!", "data": {"test": True}}