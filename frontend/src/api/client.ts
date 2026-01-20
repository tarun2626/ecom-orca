import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxied by Vite
    timeout: 5000,
});

export interface DashboardSummary {
    active_tenants: number;
    system_health: string;
    total_cost_per_hour: number;
    active_alerts: number;
}

export interface MetricLog {
    metadata: {
        tenant_id: string;
        metric_type: string;
    };
    timestamp: string;
    value: number;
}

export const fetchSummary = async () => {
    const response = await api.get<DashboardSummary>('/dashboard/summary');
    return response.data;
};

export const fetchLiveMetrics = async () => {
    const response = await api.get<MetricLog[]>('/dashboard/live-metrics');
    return response.data;
};

export const fetchCostComparison = async () => {
    const response = await api.get('/analytics/cost-comparison');
    return response.data;
};

export const generateSmartLink = async (campaignSlug: string) => {
    const response = await api.post(`/router/generate-link?campaign_slug=${campaignSlug}`);
    return response.data;
};

export default api;
