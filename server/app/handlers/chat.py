from app.models.chat import ChatRequest, ChatResponse
from app.services.llm import LLMService
from app.dependencies import get_llm_service
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()


@router.post("/respond", response_model=ChatResponse)
async def respond(
    request: ChatRequest,
    llm_service: LLMService = Depends(get_llm_service),
) -> ChatResponse:
    try:
        content = await llm_service.respond(request.messages, request.model)
        return ChatResponse(content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
