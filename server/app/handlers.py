from .models import ChatRequest, ChatResponse, SummaryRequest, ModelResponse
from .services import LLMService
from .dependencies import get_llm_service
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()


@router.post("/respond", response_model=ChatResponse)
async def respond(
    request: ChatRequest,
    llm_service: LLMService = Depends(get_llm_service),
) -> ChatResponse:
    try:
        content = await llm_service.respond(request.messages, request.model, request.system_prompt)
        return ChatResponse(content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/summarize", response_model=ChatResponse)
async def summarize(
    request: SummaryRequest,
    llm_service: LLMService = Depends(get_llm_service),
) -> ChatResponse:
    try:
        summary = await llm_service.summarize_chat(request.messages, request.kind)
        return ChatResponse(content=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/models", response_model=ModelResponse)
async def get_models(
    llm_service: LLMService = Depends(get_llm_service),
) -> ModelResponse:
    try:
        models = await llm_service.get_available_models()
        return ModelResponse(models=models)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
