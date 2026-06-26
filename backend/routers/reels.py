from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from schemas.schemas import ReelCreate, ReelUpdate, ReelResponse, StatsResponse
from services import reel_service
from typing import List

router = APIRouter()

@router.post("", response_model=ReelResponse, status_code=201)
def create_reel(reel: ReelCreate, db: Session = Depends(get_db)):
    return reel_service.create_reel(db, reel)

@router.get("", response_model=List[ReelResponse])
def get_all_reels(db: Session = Depends(get_db)):
    return reel_service.get_all_reels(db)

@router.get("/stats", response_model=StatsResponse)
def get_stats(db: Session = Depends(get_db)):
    return reel_service.get_stats(db)

@router.get("/{reel_id}", response_model=ReelResponse)
def get_reel(reel_id: int, db: Session = Depends(get_db)):
    return reel_service.get_reel_by_id(db, reel_id)

@router.put("/{reel_id}", response_model=ReelResponse)
def update_reel(reel_id: int, reel_update: ReelUpdate, db: Session = Depends(get_db)):
    return reel_service.update_reel(db, reel_id, reel_update)

@router.delete("/{reel_id}")
def delete_reel(reel_id: int, db: Session = Depends(get_db)):
    return reel_service.delete_reel(db, reel_id)
