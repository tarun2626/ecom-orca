import random
from datetime import datetime, timedelta
from app.models.schemas import MetricLog

class MockDataGenerator:
    @staticmethod
    def generate_historical_traffic(days=30):
        data = []
        base_time = datetime.utcnow() - timedelta(days=days)
        
        for i in range(days * 24): # Hourly data
            current_time = base_time + timedelta(hours=i)
            # Create a wave pattern
            hour = current_time.hour
            traffic = 100 + (50 * (1 if 9 <= hour <= 21 else 0.2)) + random.randint(-20, 50)
            
            data.append({
                "timestamp": current_time,
                "traffic_volume": traffic
            })
        return data
