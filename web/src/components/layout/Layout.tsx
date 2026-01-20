import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-blade-900 text-blade-100 font-sans selection:bg-blade-500 selection:text-white">
            <Sidebar />
            <main className="ml-64 p-8 min-h-screen relative">
                {/* Ambient background glow */}
                <div className="absolute top-0 left-0 w-full h-96 bg-neon-glow pointer-events-none opacity-50"></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};
