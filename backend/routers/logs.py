from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from schemas.schemas import LogResponse
from models.models import Log
from typing import List

router = APIRouter()

@router.get("", response_model=List[LogResponse])
def get_all_logs(db: Session = Depends(get_db)):
    return db.query(Log).order_by(Log.sent_at.desc()).all()

@router.delete("")
def clear_logs(db: Session = Depends(get_db)):
    db.query(Log).delete()
    db.commit()
    return {"message": "All logs cleared"}
