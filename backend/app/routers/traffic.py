from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
import random

router = APIRouter(tags=["Traffic Router"])

@router.post("/router/generate-link")
async def generate_smart_link(campaign_slug: str):
    # Retrieve base URL from config or use current host
    base_url = "http://localhost:8000" 
    return {"smart_url": f"{base_url}/redirect/{campaign_slug}"}

@router.get("/redirect/{campaign_slug}")
async def redirect_traffic(campaign_slug: str):
    # Logic: Check current system load to decide destination
    # Mock: 80% chance to go to Shopify (Cheaper/Faster), 20% to Magento (Legacy)
    
    load = random.random()
    
    destination_url = ""
    # In reality, fetch these URLs from TenantConfig based on the campaign
    if load > 0.8:
        # Send to Magento (Secondary / Fallback)
        destination_url = "https://magento.demo.com/sale"
        target = "Magento"
    else:
        # Send to Shopify (Primary)
        destination_url = "https://shopify.demo.com/sale"
        target = "Shopify"
        
    print(f"Routing user for '{campaign_slug}' to {target}")
    return RedirectResponse(url=destination_url)
