from pydantic import BaseModel
from typing import List


class Message(BaseModel):
    model: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    model: str


class ChatResponse(BaseModel):
    content: str
