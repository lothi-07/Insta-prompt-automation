from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database.db import Base

class Reel(Base):
    __tablename__ = "reels"

    id = Column(Integer, primary_key=True, index=True)
    reel_id = Column(String(100), unique=True, nullable=False, index=True)
    reel_title = Column(String(255), nullable=False)
    prompt_content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    instagram_username = Column(String(100), nullable=False)
    reel_id = Column(String(100), nullable=False)
    prompt_sent = Column(Text, nullable=False)
    sent_at = Column(DateTime(timezone=True), server_default=func.now())
