import { type ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
            {/* Background Gradients removed for cleaner professional look */}

            <Sidebar />

            <main className="flex-1 overflow-auto relative z-10 scrollbar-hide">
                {children}
            </main>
        </div>
    );
};

export default Layout;
