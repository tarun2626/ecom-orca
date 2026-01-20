import { useState } from 'react';
import { generateSmartLink } from '../api/client';
import { Copy, ArrowRight, MousePointer, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Traffic = () => {
    const [slug, setSlug] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');

    const handleGenerate = async () => {
        if (!slug) return;
        const res = await generateSmartLink(slug);
        setGeneratedLink(res.smart_url);
    };

    const campaigns = [
        { id: 1, name: 'Summer Sale 2026', slug: 'summer-sale-2026', clicks: 12450, status: 'Active', route: 'Shopify (80%)', profit: '+$4.2k' },
        { id: 2, name: 'Black Friday Teaser', slug: 'bf-teaser', clicks: 890, status: 'Paused', route: 'Magento', profit: '+$120' },
        { id: 3, name: 'Flash Deal: Shoes', slug: 'flash-shoes', clicks: 3400, status: 'Active', route: 'Salesforce', profit: '+$980' },
    ];

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Traffic Steering</h2>
                    <p className="text-slate-400">Manage campaign routes and optimize profitability.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center space-x-2 font-medium transition-colors">
                    <BarChart3 size={18} />
                    <span>View Routing Logs</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Generator Form */}
                <div className="lg:col-span-1 border border-white/10 rounded-2xl p-6 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                    <h3 className="text-xl font-bold text-white mb-6">Create Smart Link</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Campaign Slug</label>
                            <div className="relative">
                                <div className="absolute left-3 top-2.5 text-slate-500">/</div>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="e.g. mega-sale-2026"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-6 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 flex justify-center items-center space-x-2 group"
                        >
                            <span>Generate Smart Link</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        {generatedLink && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                            >
                                <p className="text-xs text-emerald-400 font-semibold uppercase mb-1">Link Ready</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-emerald-100 font-mono text-sm truncate pr-2">{generatedLink}</p>
                                    <button className="text-emerald-400 hover:text-emerald-300">
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Campaign List */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Active Campaigns</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-sm border-b border-white/10">
                                    <th className="pb-4 font-medium pl-4">Campaign Name</th>
                                    <th className="pb-4 font-medium">Metric</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium">Current Route</th>
                                    <th className="pb-4 font-medium text-right pr-4">Est. Profit</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {campaigns.map((camp) => (
                                    <tr key={camp.id} className="group hover:bg-white/[0.02] transition-colors border-b border-dashed border-white/5 last:border-0">
                                        <td className="py-4 pl-4">
                                            <p className="font-medium text-white">{camp.name}</p>
                                            <p className="text-xs text-slate-500 font-mono">/{camp.slug}</p>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center space-x-2 text-slate-300">
                                                <MousePointer size={14} />
                                                <span>{camp.clicks.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={clsx("px-2.5 py-1 rounded-full text-xs font-semibold border",
                                                camp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                            )}>
                                                {camp.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-blue-300">{camp.route}</td>
                                        <td className="py-4 text-right pr-4 text-emerald-400 font-medium">{camp.profit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Traffic;
