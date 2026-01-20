from pydantic import BaseModel, Field
from typing import Optional, Dict, Literal
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class TenantConfig(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    platform_type: Literal["shopify", "magento", "salesforce"]
    api_config: Dict[str, str]  # Stores API keys, URLs, secrets
    base_cost_per_hour: float

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True


class UnifiedProduct(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    tenant_id: str
    sku: str
    name: str
    price: float
    platform_origin: str

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class MetricLog(BaseModel):
    # Uses MongoDB Time Series
    metadata: Dict[str, str] # e.g. {"tenant_id": "123", "metric_type": "latency"}
    timestamp: datetime
    value: float


class MLPrediction(BaseModel):
    tenant_id: str
    prediction_date: datetime
    predicted_traffic_score: float
    recommended_action: str
