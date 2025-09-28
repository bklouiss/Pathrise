# app/routes/ai.py
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.services.ai_service import AIService

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    provider: Optional[str] = "claude"
    max_tokens: Optional[int] = 1000
    model: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    provider: str
    available: bool

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint supporting both AI providers"""
    try:
        kwargs = {"max_tokens": request.max_tokens}
        if request.model:
            kwargs["model"] = request.model
            
        result = await AIService.get_ai_response(
            request.message, 
            request.provider,
            **kwargs
        )
        return ChatResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@router.post("/claude")
async def claude_chat(request: ChatRequest):
    """Claude-specific endpoint"""
    kwargs = {"max_tokens": request.max_tokens}
    if request.model:
        kwargs["model"] = request.model
        
    response = await AIService.get_claude_response(request.message, **kwargs)
    return {"response": response, "provider": "claude"}

@router.post("/openai") 
async def openai_chat(request: ChatRequest):
    """OpenAI-specific endpoint"""
    kwargs = {"max_tokens": request.max_tokens}
    if request.model:
        kwargs["model"] = request.model
        
    response = await AIService.get_openai_response(request.message, **kwargs)
    return {"response": response, "provider": "openai"}

@router.get("/providers")
async def get_providers():
    """Get available AI providers"""
    return AIService.get_available_providers()

@router.get("/models")
async def get_available_models():
    """Get available models for each provider"""
    return {
        "claude": [
            "claude-3-5-sonnet-20241022",
            "claude-3-opus-20240229", 
            "claude-3-haiku-20240307"
        ],
        "openai": [
            "gpt-4",
            "gpt-4-turbo-preview",
            "gpt-3.5-turbo"
        ]
    }