from abc import ABC, abstractmethod
from typing import List, Dict
from app.models.schemas import UnifiedProduct, MetricLog

class BasePlatformAdapter(ABC):
    
    def __init__(self, config: Dict):
        self.config = config

    @abstractmethod
    async def fetch_metrics(self) -> List[MetricLog]:
        """Fetch real-time metrics (latency, orders, etc.)"""
        pass

    @abstractmethod
    async def fetch_catalog(self) -> List[UnifiedProduct]:
        """Fetch and normalize product catalog"""
        pass
    
    @abstractmethod
    async def calculate_cost(self) -> float:
        """Calculate current hourly run rate based on load"""
        pass
