import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Inbox,
  Sliders,
  LogOut,
  ArrowLeft,
  PlusCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const AdminLayout: React.FC = () => {
  const { admin, logoutAdmin } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!admin) {
    navigate('/admin/login');
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Properties', path: '/admin/properties', icon: Building2 },
    { name: 'Enquiries (CRM)', path: '/admin/enquiries', icon: Inbox },
    { name: 'Website CMS Settings', path: '/admin/settings', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0506] border-r border-burgundy-900/40 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Logo */}
          <div className="h-24 px-6 border-b border-burgundy-900/30 flex items-center justify-between">
            <Link to="/admin/dashboard" className="block">
              <span className="font-serif font-black text-white text-lg tracking-wider block">HYVORA</span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-gold-400 block">
                REAL ESTATES
              </span>
              <span className="text-[9px] uppercase font-semibold text-rose-300/70 block mt-0.5">
                Admin Portal
              </span>
            </Link>
          </div>

          {/* Quick Action Button */}
          <div className="p-4 pb-2">
            <Link
              to="/admin/properties/new"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-burgundy-700 to-burgundy-900 hover:from-burgundy-600 hover:to-burgundy-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl border border-gold-500/30 shadow-md transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4 text-gold-400" />
              <span>Add New Property</span>
            </Link>
          </div>

          {/* Nav list */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-burgundy-900/60 text-gold-400 border border-gold-500/30 font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-burgundy-900/30 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xs text-slate-400 hover:text-gold-400 px-3 py-2 rounded-lg hover:bg-slate-800/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go to Public Website</span>
          </Link>
          
          <div className="px-3 py-2.5 bg-burgundy-950/40 rounded-xl border border-burgundy-900/40 flex items-center justify-between">
            <div className="truncate mr-2">
              <p className="text-xs font-semibold text-white truncate">{admin.name || 'HYVORA Administrator'}</p>
              <p className="text-[10px] text-gold-400/80 truncate">{admin.email || 'admin@hyvora.in'}</p>
            </div>
            <button
              onClick={() => {
                logoutAdmin();
                navigate('/admin/login');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#080b10]">
        {/* Top bar on mobile */}
        <div className="md:hidden h-16 bg-[#0a0506] border-b border-burgundy-900/30 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-white text-sm tracking-wide">HYVORA Admin</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-xs text-gold-400 font-medium">Public Site</Link>
            <button
              onClick={() => {
                logoutAdmin();
                navigate('/admin/login');
              }}
              className="text-slate-400 p-1 hover:text-rose-400"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Pills */}
        <div className="md:hidden flex overflow-x-auto gap-2 p-2 bg-[#0d1117] border-b border-slate-800">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive ? 'bg-burgundy-800 text-gold-400' : 'text-slate-400 bg-slate-800/60'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
