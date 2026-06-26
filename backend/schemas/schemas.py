from pydantic import BaseModel, validator
from datetime import datetime
from typing import Optional

# Reel Schemas
class ReelCreate(BaseModel):
    reel_id: str
    reel_title: str
    prompt_content: str

    @validator('reel_id')
    def reel_id_not_empty(cls, v):
        if not v.strip():
            raise ValueError('reel_id cannot be empty')
        return v.strip()

    @validator('prompt_content')
    def prompt_not_empty(cls, v):
        if not v.strip():
            raise ValueError('prompt_content cannot be empty')
        return v

class ReelUpdate(BaseModel):
    reel_title: Optional[str] = None
    prompt_content: Optional[str] = None

class ReelResponse(BaseModel):
    id: int
    reel_id: str
    reel_title: str
    prompt_content: str
    created_at: datetime

    class Config:
        from_attributes = True

# Webhook Schemas
class WebhookPayload(BaseModel):
    comment: str
    reel_id: str
    username: str

class WebhookResponse(BaseModel):
    success: bool
    prompt: Optional[str] = None
    message: Optional[str] = None

# Log Schemas
class LogResponse(BaseModel):
    id: int
    instagram_username: str
    reel_id: str
    prompt_sent: str
    sent_at: datetime

    class Config:
        from_attributes = True

# Stats Schema
class StatsResponse(BaseModel):
    total_reels: int
    total_prompts: int
    total_dms_sent: int
