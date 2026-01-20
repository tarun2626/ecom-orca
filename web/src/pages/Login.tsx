import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await api.post('/login/access-token', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            login(response.data.access_token);
            navigate('/');
        } catch (err: any) {
            console.error(err);
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blade-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blade-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-blade-800/80 backdrop-blur-md border border-blade-700 p-8 rounded-2xl shadow-2xl relative z-10 box-glow">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blade-500 tracking-widest uppercase mb-2 text-glow">NEXUS</h1>
                    <p className="text-blade-400 text-sm tracking-wide">Enter your credentials to access the system</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-900/20 border border-red-500/50 text-red-500 p-3 rounded flex items-center text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-blade-300 uppercase tracking-wider ml-1">Email Command</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-blade-600 group-hover:text-blade-500 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-blade-900 border border-blade-700 rounded-lg py-3 pl-10 pr-4 text-blade-100 placeholder-blade-700 focus:outline-none focus:border-blade-500 focus:ring-1 focus:ring-blade-500 transition-all font-mono"
                                placeholder="officer@lapd.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-blade-300 uppercase tracking-wider ml-1">Security Code</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-blade-600 group-hover:text-blade-500 transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-blade-900 border border-blade-700 rounded-lg py-3 pl-10 pr-4 text-blade-100 placeholder-blade-700 focus:outline-none focus:border-blade-500 focus:ring-1 focus:ring-blade-500 transition-all font-mono"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blade-500 hover:bg-blade-400 text-black font-bold py-3 rounded-lg uppercase tracking-widest transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-blade-500/20"
                    >
                        {loading ? 'Authenticating...' : 'Initialize Session'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-blade-600">Restricted Access. Unauthorized entry is a punishable offense.</p>
                </div>
            </div>
        </div>
    );
};
