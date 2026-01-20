from fastapi import APIRouter, Depends
from typing import List, Dict
from datetime import datetime, timedelta
from app.database import get_database
from app.models.schemas import MetricLog

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
async def get_dashboard_summary():
    db = get_database()
    
    # 1. Get recent metrics for all tenants
    # For now, just a simple count or latest value
    tenant_count = await db["tenants"].count_documents({})
    
    # Mock summary data
    return {
        "active_tenants": 2, # Mocked since we haven't seeded tenants
        "system_health": "OPTIMAL",
        "total_cost_per_hour": 179.5, # Mock sum
        "active_alerts": 0
    }

@router.get("/live-metrics")
async def get_live_metrics():
    db = get_database()
    # Get last 5 minutes of data
    cursor = db["metrics_timeseries"].find(
        {"timestamp": {"$gte": datetime.utcnow() - timedelta(minutes=5)}}
    ).sort("timestamp", -1).limit(50)
    
    metrics = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        metrics.append(doc)
        
    return metrics
