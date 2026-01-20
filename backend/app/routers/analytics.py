from fastapi import APIRouter
from typing import List
from app.services.finops import FinOpsEngine

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/cost-comparison")
async def get_cost_comparison():
    finops = FinOpsEngine()
    
    # Mock data for the scatter plot (Cost vs Performance)
    # Ideally should come from Service logic
    return [
        {"platform": "Shopify Plus", "cost_transaction": 0.05, "load_speed_ms": 120, "optimum": True},
        {"platform": "Magento (Self-Hosted)", "cost_transaction": 0.12, "load_speed_ms": 450, "optimum": False},
        {"platform": "Salesforce Commerce Cloud", "cost_transaction": 0.25, "load_speed_ms": 300, "optimum": False},
        {"platform": "BigCommerce", "cost_transaction": 0.07, "load_speed_ms": 140, "optimum": True},
    ]
