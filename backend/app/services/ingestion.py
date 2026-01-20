import asyncio
from typing import List
from app.adapters.shopify import ShopifyAdapter
from app.adapters.magento import MagentoAdapter
from app.database import get_database
from app.models.schemas import MetricLog

class IngestionService:
    def __init__(self):
        self.db = get_database()
        # In a real app, we'd load these from the DB
        self.adapters = [
            ShopifyAdapter({"tenant_id": "tenant_a_shopify", "platform": "shopify"}),
            MagentoAdapter({"tenant_id": "tenant_b_magento", "platform": "magento"})
        ]

    async def collect_metrics(self):
        """
        Polls all adapters for current metrics and saves to MongoDB.
        """
        print("Starting metrics collection cycle...")
        for adapter in self.adapters:
            try:
                metrics: List[MetricLog] = await adapter.fetch_metrics()
                if metrics:
                    # Convert Pydantic models to dicts for insertion
                    docs = [m.dict(by_alias=True) for m in metrics]
                    await self.db["metrics_timeseries"].insert_many(docs)
                    print(f"Ingested {len(docs)} metrics from {adapter.__class__.__name__}")
            except Exception as e:
                print(f"Error collecting from {adapter.__class__.__name__}: {e}")

    async def start_background_loop(self):
        while True:
            await self.collect_metrics()
            await asyncio.sleep(60) # Run every 60 seconds
