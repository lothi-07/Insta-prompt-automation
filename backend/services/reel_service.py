from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from models.models import Reel, Log
from schemas.schemas import ReelCreate, ReelUpdate

def create_reel(db: Session, reel: ReelCreate):
    db_reel = Reel(
        reel_id=reel.reel_id,
        reel_title=reel.reel_title,
        prompt_content=reel.prompt_content
    )
    try:
        db.add(db_reel)
        db.commit()
        db.refresh(db_reel)
        return db_reel
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Reel with reel_id '{reel.reel_id}' already exists")

def get_all_reels(db: Session):
    return db.query(Reel).order_by(Reel.created_at.desc()).all()

def get_reel_by_id(db: Session, reel_id: int):
    reel = db.query(Reel).filter(Reel.id == reel_id).first()
    if not reel:
        raise HTTPException(status_code=404, detail="Reel not found")
    return reel

def get_reel_by_reel_id(db: Session, reel_id: str):
    return db.query(Reel).filter(Reel.reel_id == reel_id).first()

def update_reel(db: Session, reel_id: int, reel_update: ReelUpdate):
    reel = get_reel_by_id(db, reel_id)
    if reel_update.reel_title is not None:
        reel.reel_title = reel_update.reel_title
    if reel_update.prompt_content is not None:
        if not reel_update.prompt_content.strip():
            raise HTTPException(status_code=400, detail="prompt_content cannot be empty")
        reel.prompt_content = reel_update.prompt_content
    db.commit()
    db.refresh(reel)
    return reel

def delete_reel(db: Session, reel_id: int):
    reel = get_reel_by_id(db, reel_id)
    db.delete(reel)
    db.commit()
    return {"message": f"Reel '{reel.reel_title}' deleted successfully"}

def get_stats(db: Session):
    total_reels = db.query(Reel).count()
    total_prompts = total_reels
    total_dms_sent = db.query(Log).count()
    return {
        "total_reels": total_reels,
        "total_prompts": total_prompts,
        "total_dms_sent": total_dms_sent
    }
