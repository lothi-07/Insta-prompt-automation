from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import engine, Base
from routers import reels, webhook, logs

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Instagram Prompt Automation API",
    description="Backend for Instagram Comment-to-DM Automation System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reels.router, prefix="/reels", tags=["Reels"])
app.include_router(webhook.router, prefix="/webhook", tags=["Webhook"])
app.include_router(logs.router, prefix="/logs", tags=["Logs"])

@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "Instagram Prompt Automation API is running"}

@app.get("/health", tags=["Health"])
def health():
    return {"status": "healthy"}
