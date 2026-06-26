from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from schemas.schemas import WebhookPayload, WebhookResponse
from models.models import Log
from services.reel_service import get_reel_by_reel_id

router = APIRouter()

@router.post("", response_model=WebhookResponse)
def handle_webhook(payload: WebhookPayload, db: Session = Depends(get_db)):
    # Only process "PROMPT" comments (case-insensitive)
    if payload.comment.strip().upper() != "PROMPT":
        return WebhookResponse(success=False, message="Comment is not 'PROMPT'. No action taken.")

    reel = get_reel_by_reel_id(db, payload.reel_id)
    if not reel:
        return WebhookResponse(success=False, message=f"No reel found for reel_id: {payload.reel_id}")

    # Log the DM
    log = Log(
        instagram_username=payload.username,
        reel_id=payload.reel_id,
        prompt_sent=reel.prompt_content
    )
    db.add(log)
    db.commit()

    # TODO: Integrate Instagram Graph API to send actual DM here
    # instagram_service.send_dm(payload.username, reel.prompt_content)

    return WebhookResponse(
        success=True,
        prompt=reel.prompt_content,
        message=f"Prompt sent to @{payload.username} via DM"
    )
