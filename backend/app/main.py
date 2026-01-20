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

app = FastAPI(title="OmniStack Orchestrator", lifespan=lifespan)

from app.routers import dashboard, analytics, traffic

app.include_router(dashboard.router)
app.include_router(analytics.router)
app.include_router(traffic.router)

@app.get("/")
async def root():
    return {"message": "OmniStack Orchestrator API is running"}
