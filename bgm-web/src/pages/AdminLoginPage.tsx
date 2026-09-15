import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { adminLogin } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAdminAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await adminLogin({ username, password });
      setAdminAuth(res.user || { name: 'Admin', email: username }, res.token);
      toast.success("Welcome, Administrator!");
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid administrator credentials");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setUsername('admin@bgmrealestate.in');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#0a0506] text-white">
      <div className="max-w-md w-full bg-[#17060a] border-2 border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-7 backdrop-blur-xl">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </Link>

        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-2xl bg-white p-2.5 flex items-center justify-center mx-auto shadow-xl border-2 border-gold-500/40">
            <img src="/logo.png" alt="BGM Real Estate" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
              BGM Admin Gateway
            </h2>
            <p className="text-xs text-ivory-200/80 mt-1">
              Secure management portal for BGM properties, leads & CMS.
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-ivory-100 uppercase tracking-wider mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-burgundy-800 absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@bgmrealestate.in"
                required
                className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 font-semibold text-sm rounded-xl border-2 border-slate-300 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 focus:outline-none placeholder-slate-400 shadow-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ivory-100 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-burgundy-800 absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 font-semibold text-sm rounded-xl border-2 border-slate-300 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 focus:outline-none placeholder-slate-400 shadow-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 hover:from-gold-300 hover:to-amber-300 text-[#2E060D] rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg hover:shadow-gold-500/30 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <KeyRound className="w-4 h-4 text-[#2E060D]" />
            <span>{loading ? 'Authenticating...' : 'Sign In as Admin'}</span>
          </button>
        </form>

        <div className="pt-3 border-t border-burgundy-900/50 text-center">
          <button
            type="button"
            onClick={fillDemo}
            className="px-4 py-2 rounded-lg bg-burgundy-950/80 border border-gold-500/40 text-xs text-gold-300 hover:text-gold-200 hover:bg-burgundy-900 font-medium transition-all inline-flex items-center space-x-1.5"
          >
            <span>⚡ Use Demo Admin Credentials (Quick Fill)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
