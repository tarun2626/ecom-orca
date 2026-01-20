import React from 'react';
import { LayoutDashboard, ShoppingCart, BarChart3, Settings, Users, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/' },
    { name: 'Platforms', icon: ShoppingCart, path: '/platforms' },
    { name: 'Performance', icon: BarChart3, path: '/performance' },
    { name: 'Cost AI', icon: Database, path: '/cost-ai' },
    { name: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="h-screen w-64 bg-blade-900 border-r border-blade-800 flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
            <div className="p-6 flex items-center justify-center border-b border-blade-800/10">
                <h1 className="text-2xl font-bold tracking-widest uppercase text-blade-500 text-glow">
                    NEXUS
                </h1>
            </div>

            <nav className="flex-1 py-6 space-y-2 px-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={clsx(
                                "flex items-center px-4 py-3 rounded-lg transition-all duration-300 group",
                                isActive
                                    ? "bg-blade-500/10 text-blade-500 border border-blade-500/20 box-glow"
                                    : "text-blade-100 hover:bg-blade-800 hover:text-blade-300"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5 mr-3", isActive ? "animate-pulse" : "group-hover:text-blade-300")} />
                            <span className="font-medium tracking-wide uppercase text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-blade-800/50">
                <div className="flex items-center space-x-3 px-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-blade-700 border border-blade-500"></div>
                    <div>
                        <p className="text-xs text-blade-100 font-bold">DECKARD</p>
                        <p className="text-[10px] text-blade-400">Blade Runner Unit</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
