import { useState } from 'react';
import { LayoutDashboard, BarChart3, Shuffle, Settings, ChevronLeft, ChevronRight, Activity, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();

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
            className="h-screen bg-white border-r border-slate-200 text-slate-900 flex flex-col relative z-20"
        >
            <div className="p-4 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center shadow-md shadow-blue-900/10">
                            <Activity size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900">
                                OmniStack
                            </h1>
                            <p className="text-[10px] text-slate-500 tracking-wider">ORCHESTRATOR</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors absolute -right-3 top-6 bg-white border border-slate-200 shadow-sm"
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
                            "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ease-out relative group overflow-hidden",
                            location.pathname === item.path
                                ? "bg-slate-100 text-blue-700 font-medium"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        <div className={clsx("relative z-10", location.pathname === item.path ? "text-blue-700" : "group-hover:text-slate-900")}>
                            <item.icon size={20} strokeWidth={1.5} />
                        </div>
                        {!collapsed && (
                            <span className="text-sm relative z-10">{item.label}</span>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200">
                <div className={clsx("flex items-center space-x-3", collapsed ? "justify-center" : "")}>
                    <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 p-[1px]">
                        <div className="h-full w-full rounded-full bg-slate-50 p-0.5">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="User" className="rounded-full" />
                        </div>
                    </div>
                    {!collapsed && (
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">Admin User</p>
                            <p className="text-xs text-slate-500">View Profile</p>
                        </div>
                    )}

                    {!collapsed && (
                        <button
                            onClick={logout}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
