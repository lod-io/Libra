from pydantic import BaseModel
from typing import List


class Message(BaseModel):
    model: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    model: str
    system_prompt: str


class ChatResponse(BaseModel):
    content: str


class SummaryRequest(BaseModel):
    kind: str
    messages: List[Message]


class ModelResponse(BaseModel):
    models: List[str]
