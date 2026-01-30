from fastapi import FastAPI
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()

from app.database import connect_to_mongo, close_mongo_connection
from app.services.ingestion import IngestionService
import asyncio

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to DB
    await connect_to_mongo()
    
    # Start Ingestion Service Background Task
    ingestion = IngestionService()
    task = asyncio.create_task(ingestion.start_background_loop())
    
    print("Starting up OmniStack Orchestrator...")
    yield
    # Shutdown: Disconnect DB
    task.cancel()
    await close_mongo_connection()
    print("Shutting down...")

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="OmniStack Orchestrator", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import dashboard, analytics, traffic, auth

app.include_router(dashboard.router)
app.include_router(analytics.router)
app.include_router(traffic.router)
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "OmniStack Orchestrator API is running"}
