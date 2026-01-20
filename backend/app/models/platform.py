from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class EcommercePlatform(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False) # Shopify, Magento, etc.
    url = Column(String, nullable=False)
    api_key = Column(String, nullable=True)
    platform_type = Column(String, nullable=False) # shopify, magento, demandware
    created_at = Column(DateTime(timezone=True), server_default=func.now())
