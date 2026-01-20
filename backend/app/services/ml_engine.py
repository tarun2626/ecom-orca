import numpy as np
from datetime import datetime, timedelta
from app.database import get_database
from app.models.schemas import MLPrediction

class MLEngine:
    def __init__(self):
        self.db = get_database()

    async def predict_traffic(self, tenant_id: str) -> MLPrediction:
        """
        Fetch last 24h metrics and predict next hour traffic.
        Simple Linear Regression (Mocked for speed if no sufficient data).
        """
        # Fetch last 24h data
        cursor = self.db["metrics_timeseries"].find({
            "metadata.tenant_id": tenant_id,
            "timestamp": {"$gte": datetime.utcnow() - timedelta(hours=24)}
        })
        
        data_points = []
        async for doc in cursor:
            # check if metric type is latency or a traffic proxy
            if doc["metadata"].get("metric_type") == "latency_ms":
                data_points.append(doc["value"])

        if len(data_points) < 5:
            # Not enough data, return a default prediction
            return MLPrediction(
                tenant_id=tenant_id,
                prediction_date=datetime.utcnow(),
                predicted_traffic_score=50.0, # Neutral score
                recommended_action="MONITOR"
            )

        # Simple logic: If trend is rising, predict higher
        avg_value = np.mean(data_points)
        trend = data_points[-1] - data_points[0]
        
        predicted_score = avg_value + (trend * 0.5)
        
        action = "STAY"
        if predicted_score > 200: # Arbitrary high latency threshold
            action = "SCALE_UP"
        elif predicted_score < 50:
            action = "SCALE_DOWN"

        return MLPrediction(
            tenant_id=tenant_id,
            prediction_date=datetime.utcnow(),
            predicted_traffic_score=predicted_score,
            recommended_action=action
        )
