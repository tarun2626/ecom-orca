import { useState } from 'react';
import { LayoutDashboard, BarChart3, Shuffle, Settings, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Shuffle, label: 'Traffic Router', path: '/traffic' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <motion.div
            initial={{ width: 256 }}
            animate={{ width: collapsed ? 80 : 256 }}
            className="h-screen bg-slate-900/50 backdrop-blur-xl border-r border-white/10 text-white flex flex-col relative z-20"
        >
            <div className="p-4 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Activity size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                OmniStack
                            </h1>
                            <p className="text-[10px] text-slate-400 tracking-wider">ORCHESTRATOR</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors absolute -right-3 top-6 bg-slate-800 border border-white/10 shadow-lg"
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                            "flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden",
                            location.pathname === item.path
                                ? "bg-blue-600/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)] border border-blue-500/20"
                                : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                        )}
                    >
                        <div className={clsx("relative z-10", location.pathname === item.path ? "text-blue-400" : "group-hover:text-white")}>
                            <item.icon size={20} strokeWidth={1.5} />
                        </div>
                        {!collapsed && (
                            <span className="font-medium text-sm relative z-10">{item.label}</span>
                        )}
                        {location.pathname === item.path && (
                            <div className="absolute inset-0 bg-blue-400/5 blur-xl group-hover:bg-blue-400/10 transition-colors" />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className={clsx("flex items-center space-x-3", collapsed ? "justify-center" : "")}>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1px]">
                        <div className="h-full w-full rounded-full bg-slate-900 p-0.5">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="User" className="rounded-full" />
                        </div>
                    </div>
                    {!collapsed && (
                        <div>
                            <p className="text-sm font-medium text-white">Admin User</p>
                            <p className="text-xs text-slate-500">View Profile</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
