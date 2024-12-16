from app.models.chat import ChatRequest, ChatResponse, Message
from app.services.llm import LLMService
from app.dependencies import get_llm_service
from fastapi import APIRouter, Depends, HTTPException
from typing import List

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


@router.post("/summarize", response_model=ChatResponse)
async def summarize(
    messages: List[Message],
    llm_service: LLMService = Depends(get_llm_service),
) -> ChatResponse:
    try:
        summary = await llm_service.summarize_chat(messages)
        return ChatResponse(content=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
