from typing import List
from datetime import datetime
import random
from app.adapters.base import BasePlatformAdapter
from app.models.schemas import MetricLog, UnifiedProduct

class ShopifyAdapter(BasePlatformAdapter):
    
    async def fetch_metrics(self) -> List[MetricLog]:
        # MOCK: Simulate calling Shopify Admin API
        # Shopify is usually stable but expensive (higher transaction fees)
        latency = random.uniform(20, 150) # Fast
        
        return [
            MetricLog(
                metadata={"tenant_id": self.config.get("tenant_id"), "metric_type": "latency_ms"},
                timestamp=datetime.utcnow(),
                value=latency
            )
        ]

    async def fetch_catalog(self) -> List[UnifiedProduct]:
        return []

    async def calculate_cost(self) -> float:
        # Pseudo-logic: Base plan + variable transaction fee
        return 29.0 + (random.uniform(0, 50))
