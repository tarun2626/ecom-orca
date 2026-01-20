import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, ShoppingBag, Users } from 'lucide-react';
import clsx from 'clsx';

const data = [
    { name: 'Mon', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Tue', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Wed', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Thu', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Fri', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Sat', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Sun', uv: 3490, pv: 4300, amt: 2100 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <div className="bg-blade-800/50 border border-blade-700 p-6 rounded-lg backdrop-blur-sm hover:border-blade-500/50 transition-colors duration-300 group">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-blade-400 text-xs font-bold uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl font-bold text-blade-100 mt-2 text-glow">{value}</h3>
            </div>
            <div className={clsx("p-2 rounded-lg bg-blade-900 border border-blade-800 group-hover:border-blade-500/30 transition-colors")}>
                <Icon className="w-5 h-5 text-blade-500" />
            </div>
        </div>
        <div className="mt-4 flex items-center">
            <span className={clsx("text-xs font-bold flex items-center", trend === 'up' ? 'text-green-500' : 'text-red-500')}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {change}
            </span>
            <span className="text-blade-400 text-xs ml-2">vs last week</span>
        </div>
    </div>
);

export const Overview: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-blade-800 pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-blade-100 uppercase tracking-tight text-glow">System Overview</h2>
                    <p className="text-blade-400 text-sm mt-1">Real-time performance metrics across all nodes</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blade-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-blade-400 transition-colors">
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$124,592.00" change="+14.5%" icon={DollarSign} trend="up" />
                <StatCard title="Active Sessions" value="2,845" change="+5.2%" icon={Users} trend="up" />
                <StatCard title="Avg. Load Time" value="0.8s" change="-12.3%" icon={Activity} trend="up" />
                <StatCard title="Conversion Rate" value="3.2%" change="-0.8%" icon={ShoppingBag} trend="down" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-blade-800/30 border border-blade-700 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blade-100 mb-6 uppercase tracking-wider">Traffic & Revenue</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff4500" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ff4500" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d1b1b" />
                                <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666' }} />
                                <YAxis stroke="#666" tick={{ fill: '#666' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #2d1b1b', color: '#e0e0e0' }}
                                    itemStyle={{ color: '#ff4500' }}
                                />
                                <Area type="monotone" dataKey="uv" stroke="#ff4500" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-blade-800/30 border border-blade-700 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blade-100 mb-6 uppercase tracking-wider">AI Recommendations</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 bg-blade-900 border border-blade-800 rounded hover:border-blade-500/50 transition-colors cursor-pointer group">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-blade-500 uppercase">Optimization</span>
                                    <span className="text-[10px] text-blade-400">2m ago</span>
                                </div>
                                <p className="text-sm text-blade-300 group-hover:text-blade-100 transition-colors">
                                    Shift traffic to Node B to reduce latency by 15%.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
