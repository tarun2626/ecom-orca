import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // Login Logic
                const formData = new FormData();
                formData.append('username', email); // FastAPI OAuth2PasswordRequestForm expects 'username'
                formData.append('password', password);

                const response = await axios.post('http://127.0.0.1:8000/auth/token', formData);
                login(response.data.access_token);
                navigate('/');
            } else {
                // Registration Logic
                await axios.post('http://127.0.0.1:8000/auth/register', {
                    email,
                    password,
                    full_name: fullName
                });

                // Auto-login after registration
                const formData = new FormData();
                formData.append('username', email);
                formData.append('password', password);

                const response = await axios.post('http://127.0.0.1:8000/auth/token', formData);
                login(response.data.access_token);
                navigate('/');
            }
        } catch (err: any) {
            console.error(err);
            if (isLogin) {
                setError('Invalid email or password');
            } else {
                setError(err.response?.data?.detail || 'Registration failed. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 p-4 relative overflow-hidden">
            {/* Background Gradients removed */}

            <div className="w-full max-w-md relative z-10">
                <div className="glass-card p-8 bg-white border border-slate-200 shadow-xl rounded-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-slate-500 mt-2">
                            {isLogin ? 'Sign in to access your dashboard' : 'Join us to get started'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                }}
                                className="text-blue-700 font-semibold hover:underline"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
