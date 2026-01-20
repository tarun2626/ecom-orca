import { Bell, Shield, Save } from 'lucide-react';

const Settings = () => {
    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">System Settings</h2>
                <p className="text-slate-400">Configure notifications, API keys, and automation rules.</p>
            </div>

            {/* Config Sections */}
            <div className="space-y-6">

                {/* Profile / General */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Shield size={24} /></div>
                        <div>
                            <h3 className="text-lg font-bold text-white">API Configuration</h3>
                            <p className="text-sm text-slate-400">Manage connections to your external platforms.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Shopify API Key</label>
                                <input type="password" value="shpat_xxxxxxxxxxxx" readOnly className="glass-input w-full font-mono text-sm opacity-60" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Magento Bearer Token</label>
                                <input type="password" value="def456xxxxxxxxxx" readOnly className="glass-input w-full font-mono text-sm opacity-60" />
                            </div>
                        </div>
                        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">+ Add New Connector</button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Bell size={24} /></div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Alert Preferences</h3>
                            <p className="text-sm text-slate-400">Set thresholds for automated alerts.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: 'Latency Spikes (>200ms)', checked: true },
                            { label: 'Cost Overrun Warnings', checked: true },
                            { label: 'Auto-Scaling Events', checked: false }
                        ].map((item, i) => (
                            <label key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer">
                                <span className="text-slate-200">{item.label}</span>
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.checked ? 'bg-blue-600' : 'bg-slate-700'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${item.checked ? 'translate-x-6' : ''}`} />
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 flex items-center space-x-2 transition-transform active:scale-95 shadow-lg shadow-white/5">
                        <Save size={18} />
                        <span>Save Changes</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Settings;
