from typing import List
from datetime import datetime
import random
from app.adapters.base import BasePlatformAdapter
from app.models.schemas import MetricLog, UnifiedProduct

class MagentoAdapter(BasePlatformAdapter):
    
    async def fetch_metrics(self) -> List[MetricLog]:
        # MOCK: Magento gets slow under imaginary load
        latency = random.uniform(200, 1200) 
        
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
        # Pseudo-logic: AWS infrastructure cost (High fixed cost)
        return 150.0 
