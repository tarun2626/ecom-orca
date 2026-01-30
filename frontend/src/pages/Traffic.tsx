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
        <div className="p-8 space-y-8 max-w-7xl mx-auto text-slate-900">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Traffic Steering</h2>
                    <p className="text-slate-500">Manage campaign routes and optimize profitability.</p>
                </div>
                <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center space-x-2 font-medium transition-colors shadow-sm">
                    <BarChart3 size={18} />
                    <span>View Routing Logs</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Generator Form */}
                <div className="lg:col-span-1 border border-slate-200 rounded-2xl p-6 bg-white shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Create Smart Link</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Campaign Slug</label>
                            <div className="relative">
                                <div className="absolute left-3 top-2.5 text-slate-400">/</div>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="e.g. mega-sale-2026"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-6 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-medium transition-all shadow-md shadow-blue-900/10 flex justify-center items-center space-x-2 group"
                        >
                            <span>Generate Smart Link</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        {generatedLink && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
                            >
                                <p className="text-xs text-emerald-700 font-semibold uppercase mb-1">Link Ready</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-emerald-900 font-mono text-sm truncate pr-2">{generatedLink}</p>
                                    <button className="text-emerald-600 hover:text-emerald-800">
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Campaign List */}
                <div className="lg:col-span-2 glass-card p-6 bg-white border border-slate-200 shadow-sm rounded-xl">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Active Campaigns</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-500 text-sm border-b border-slate-100">
                                    <th className="pb-4 font-medium pl-4">Campaign Name</th>
                                    <th className="pb-4 font-medium">Metric</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium">Current Route</th>
                                    <th className="pb-4 font-medium text-right pr-4">Est. Profit</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {campaigns.map((camp) => (
                                    <tr key={camp.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                                        <td className="py-4 pl-4">
                                            <p className="font-medium text-slate-900">{camp.name}</p>
                                            <p className="text-xs text-slate-500 font-mono">/{camp.slug}</p>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center space-x-2 text-slate-600">
                                                <MousePointer size={14} />
                                                <span>{camp.clicks.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={clsx("px-2.5 py-1 rounded-full text-xs font-semibold border",
                                                camp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                                            )}>
                                                {camp.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-blue-600">{camp.route}</td>
                                        <td className="py-4 text-right pr-4 text-emerald-600 font-medium">{camp.profit}</td>
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
