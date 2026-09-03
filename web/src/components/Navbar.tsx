import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, LogOut, Bell, Menu, Info, FolderHeart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/dashboard', label: 'My Dashboard', icon: User },
    { to: '/notifications', label: 'Notifications', icon: Bell },
  ];

  const handleTenantClick = () => {
    setIsMenuOpen(false);
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="h-14 lg:h-16 bg-dark-light border-b border-primary/30 sticky top-0 z-[999] backdrop-blur-sm shadow-sm">
      <div className="w-full pl-4 lg:pl-0 pr-4 lg:pr-8 relative">
        <div className="flex items-center justify-between h-14 lg:h-16">

          {/* Left Side: Hamburger Menu & Company Name */}
          <div className="flex items-center lg:w-1/4 lg:justify-center space-x-4">
            {/* Hamburger Menu Button */}
            {!isAdminRoute && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hidden lg:block text-white hover:text-primary transition-colors p-1 rounded-lg hover:bg-dark"
                title="Menu"
              >
                <Menu size={24} />
              </button>
            )}

            {/* Company Name / Brand Typography */}
            <Link
              to="/"
              className="flex items-center gap-2 z-50 py-1 hover:opacity-90 transition-opacity"
            >
              <div className="flex flex-col text-left">
                <span className="text-xl md:text-2xl text-primary tracking-wider uppercase leading-none font-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  HYVORA
                </span>
                <span className="text-[9px] text-gray-300 font-semibold tracking-widest uppercase mt-0.5">
                  Property Management
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          {!isAdminRoute && (
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive(link.to)
                      ? 'bg-primary text-dark font-semibold'
                      : 'text-grey-light hover:text-white hover:bg-dark-lighter'
                    }`}
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu Button (Mobile/Tablet only) */}
            {!isAdminRoute && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:text-primary transition-colors p-1 rounded-lg hover:bg-dark"
                title="Menu"
              >
                <Menu size={24} />
              </button>
            )}

            {isAuthenticated && user?.role !== 'admin' ? (
              <>
                <div className="hidden lg:block text-right">
                  <p className="text-white font-semibold">{user?.name}</p>
                  <p className="text-grey text-sm">{user?.phone}</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-grey-light hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : !isAdminRoute ? (
              <Link to="/login">
                <button className="btn-primary">Login</button>
              </Link>
            ) : null}
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-14 lg:top-16 right-4 lg:left-4 lg:right-auto w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
          >
            <div className="p-2">
              <button
                onClick={handleTenantClick}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-slate-50 transition-colors group"
              >
                {!isAuthenticated ? (
                  <>
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors text-primary">
                      <Info size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Tenant Information</p>
                      <p className="text-xs text-slate-500 font-medium">Click to Login</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors text-primary">
                      <FolderHeart size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">My Properties</p>
                      <p className="text-xs text-slate-500 font-medium">View & manage documents</p>
                    </div>
                  </>
                )}
              </button>

              {/* Mobile/Tablet Only: Standard Nav Links */}
              <div className="lg:hidden mt-2 pt-2 border-t border-slate-100">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
                  >
                    <link.icon size={20} className="text-slate-400" />
                    <span className="font-semibold">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
