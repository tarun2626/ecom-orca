import { useEffect, useState } from 'react';
import { fetchCostComparison } from '../api/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, Zap } from 'lucide-react';

const Analytics = () => {
    const [costData, setCostData] = useState<any[]>([]);

    useEffect(() => {
        fetchCostComparison().then(setCostData);
    }, []);

    // Mock data for latency comparison
    const latencyData = [
        { platform: 'Shopify Plus', latency: 120 },
        { platform: 'Magento', latency: 450 },
        { platform: 'Salesforce', latency: 300 },
        { platform: 'BigCommerce', latency: 140 },
    ];

    const COLORS = ['#3b82f6', '#a855f7', '#10b981', '#f59e0b'];

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Platform Analytics</h2>
                <p className="text-slate-400">Detailed cost and performance breakdown across stacks.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Cost Analysis Bar Chart */}
                <div className="glass-card p-6 h-[400px] flex flex-col">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <DollarSign size={18} className="text-purple-400" />
                            Transaction Cost Analysis
                        </h3>
                    </div>
                    <div className="flex-1 min-h-0 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={costData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                                <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(val) => `$${val}`} />
                                <YAxis dataKey="platform" type="category" stroke="#94a3b8" fontSize={12} width={100} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                />
                                <Bar dataKey="cost_transaction" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={30}>
                                    {costData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Latency Comparison Chart */}
                <div className="glass-card p-6 h-[400px] flex flex-col">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Zap size={18} className="text-yellow-400" />
                            Latency Benchmarks (ms)
                        </h3>
                    </div>
                    <div className="flex-1 min-h-0 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={latencyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="platform" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                />
                                <Bar dataKey="latency" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            {/* Recommendation Panel */}
            <div className="glass-card p-6 border-l-4 border-l-blue-500">
                <h3 className="text-lg font-bold text-white mb-2">💡 AI Recommendation</h3>
                <p className="text-slate-300">
                    Based on current traffic volume (High), <span className="font-semibold text-white">Shopify Plus</span> is currently
                    <span className="text-emerald-400 font-bold"> 40% more cost-effective</span> than Magento due to lower infrastructure overhead.
                    Recommended Action: <span className="underline decoration-blue-500 decoration-2 underline-offset-4">Route 80% of traffic to Shopify</span>.
                </p>
            </div>
        </div>
    );
};

export default Analytics;
