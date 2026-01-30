import { useEffect, useState } from 'react';
import { fetchSummary, fetchLiveMetrics } from '../api/client';
import { Activity, Server, DollarSign, AlertTriangle, Zap } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [summary, setSummary] = useState<any>(null);
    const [liveMetrics, setLiveMetrics] = useState<any[]>([]);

    useEffect(() => {
        fetchSummary().then(setSummary);
        // Poll metrics every 2s for "Live" feel
        const interval = setInterval(() => {
            fetchLiveMetrics().then(setLiveMetrics);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!summary) return <div className="p-8 text-slate-500">Initializing Dashboard...</div>;

    const stats = [
        { label: 'Active Tenants', value: summary.active_tenants, icon: Server, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2' },
        { label: 'System Health', value: summary.system_health, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'Stable' },
        { label: 'Hourly Run Rate', value: `$${summary.total_cost_per_hour}`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50', trend: '-8%' },
        { label: 'Active Alerts', value: summary.active_alerts, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', trend: '0' },
    ];

    // Mock Chart Data if live metrics empty
    const chartData = liveMetrics.length > 0 ? liveMetrics : [
        { name: '00:00', traffic: 400, cost: 240 },
        { name: '04:00', traffic: 300, cost: 139 },
        { name: '08:00', traffic: 900, cost: 980 },
        { name: '12:00', traffic: 1200, cost: 390 },
        { name: '16:00', traffic: 1100, cost: 480 },
        { name: '20:00', traffic: 800, cost: 380 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 space-y-8 max-w-7xl mx-auto text-slate-900"
        >
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Command Center</h2>
                    <p className="text-slate-500">Real-time overview of your eCommerce infrastructure.</p>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-emerald-700">System Online</span>
                </div>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 relative overflow-hidden group hover:border-blue-200 transition-all bg-white border border-slate-200 shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={clsx("p-3 rounded-lg", stat.bg)}>
                                <stat.icon className={stat.color} size={24} />
                            </div>
                            <span className={clsx("text-xs font-medium px-2 py-1 rounded-full", stat.trend.startsWith('-') ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600')}>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 px-1">{stat.label}</p>
                            <p className="text-3xl font-bold mt-1 text-slate-900 tracking-tight">{stat.value}</p>
                        </div>
                    </motion.div>
                ))
                }
            </div >

            {/* Main Chart Section */}
            < div className="grid grid-cols-1 lg:grid-cols-3 gap-6" >
                {/* Large Chart */}
                < div className="lg:col-span-2 glass-card p-6 h-[400px] flex flex-col bg-white border border-slate-200 shadow-sm rounded-xl" >
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <Zap size={18} className="text-blue-600" />
                            Traffic Volumetrics
                        </h3>
                        <select className="bg-white border border-slate-200 rounded-lg text-xs text-slate-600 px-3 py-1 outline-none hover:border-slate-300">
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                        </select>
                    </div>
                    <div className="flex-1 min-h-0 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} className="stroke-slate-200" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--tw-prose-body)', borderColor: 'var(--tw-prose-invert-body)', color: '#0f172a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#2563EB' }}
                                />
                                <Area type="monotone" dataKey="traffic" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div >

                {/* Side Panel: Recent Alerts */}
                < div className="glass-card p-0 flex flex-col h-[400px] bg-white border border-slate-200 shadow-sm rounded-xl" >
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-900">Live Activity</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="h-2 w-2 mt-2 rounded-full bg-blue-600 shrink-0" />
                                <div>
                                    <p className="text-sm text-slate-700">High latency detected on <span className="text-blue-700 font-medium">Magento-01</span></p>
                                    <p className="text-xs text-slate-400 mt-1">2 mins ago • Auto-scaling triggered</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                        <button className="w-full py-2 text-sm text-center text-blue-600 hover:text-blue-700 font-medium">View All Logs</button>
                    </div>
                </div >
            </div >
        </motion.div >
    );
};

export default Dashboard;
