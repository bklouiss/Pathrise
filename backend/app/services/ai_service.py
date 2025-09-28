# app/services/ai_service.py
import os
from typing import Optional, Dict, Any
from app.config import settings

# Import both AI providers
try:
    import anthropic
    anthropic_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    ANTHROPIC_AVAILABLE = bool(settings.ANTHROPIC_API_KEY)
except ImportError:
    ANTHROPIC_AVAILABLE = False
    anthropic_client = None

try:
    from openai import OpenAI
    openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
    OPENAI_AVAILABLE = bool(settings.OPENAI_API_KEY)
except ImportError:
    OPENAI_AVAILABLE = False
    openai_client = None

class AIService:
    @staticmethod
    async def get_claude_response(
        message: str, 
        model: str = "claude-3-5-sonnet-20241022",
        max_tokens: int = 1000
    ) -> str:
        """Get response from Anthropic Claude"""
        if not ANTHROPIC_AVAILABLE or not anthropic_client:
            return "Claude API not available. Check your API key."
        
        try:
            response = anthropic_client.messages.create(
                model=model,
                max_tokens=max_tokens,
                messages=[{"role": "user", "content": message}]
            )
            return response.content[0].text
        except Exception as e:
            return f"Claude Error: {str(e)}"

    @staticmethod
    async def get_openai_response(
        message: str,
        model: str = "gpt-3.5-turbo",
        max_tokens: int = 1000
    ) -> str:
        """Get response from OpenAI GPT"""
        if not OPENAI_AVAILABLE or not openai_client:
            return "OpenAI API not available. Check your API key."
        
        try:
            response = openai_client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": message}],
                max_tokens=max_tokens
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"OpenAI Error: {str(e)}"

    @staticmethod
    async def get_ai_response(
        message: str, 
        provider: str = "claude",
        **kwargs
    ) -> Dict[str, Any]:
        """Flexible AI response function"""
        if provider == "claude":
            response = await AIService.get_claude_response(message, **kwargs)
            return {
                "response": response,
                "provider": "claude",
                "available": ANTHROPIC_AVAILABLE
            }
        elif provider == "openai":
            response = await AIService.get_openai_response(message, **kwargs)
            return {
                "response": response,
                "provider": "openai", 
                "available": OPENAI_AVAILABLE
            }
        else:
            return {
                "response": "Invalid provider. Choose 'claude' or 'openai'",
                "provider": provider,
                "available": False
            }

    @staticmethod
    def get_available_providers() -> Dict[str, bool]:
        """Check which AI providers are available"""
        return {
            "claude": ANTHROPIC_AVAILABLE,
            "openai": OPENAI_AVAILABLE
        }