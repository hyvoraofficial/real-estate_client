import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Shield,
  Building2,
  Building,
  MapPin,
  Trees,
  Briefcase
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useSettingsStore } from '../store/useSettingsStore';
import { EnquiryModal } from './EnquiryModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdown, setPropertiesDropdown] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const { settings, loadSettings } = useSettingsStore();
  const location = useLocation();

  useEffect(() => {
    loadSettings();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Corporate Contact Strip */}
      <div className="bg-[#4A0E17] text-[#FAF9F6] text-xs py-2 px-4 sm:px-8 border-b border-[#6B0F1A]/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-5">
            {settings.contact_person && (
              <span className="text-gold-300 font-semibold text-[11px] uppercase tracking-wider">
                {settings.contact_person}
              </span>
            )}
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center space-x-1.5 hover:text-gold-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>{settings.phone}</span>
            </a>
            {settings.secondary_phone && (
              <a
                href={`tel:${settings.secondary_phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center space-x-1.5 hover:text-gold-400 transition-colors hidden xl:flex"
              >
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <span>{settings.secondary_phone}</span>
              </a>
            )}
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp Advisory</span>
            </a>
            <span className="text-white/40">|</span>
            <span className="text-white/80">{settings.business_hours}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gold-400 font-semibold tracking-wider uppercase text-[11px]">
              Corporate & High-Value Real Estate
            </span>
            <Link
              to="/admin/login"
              className="text-white/60 hover:text-white transition-colors flex items-center space-x-1 text-[11px]"
              title="Admin Portal"
            >
              <Shield className="w-3 h-3 text-gold-400" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-ivory-200'
            : 'bg-[#FAF9F6] border-b border-ivory-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Title */}
            <Link to="/" className="flex flex-col group py-1">
              <span className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#6B0F1A] leading-none group-hover:text-[#800020] transition-colors">
                HYVORA
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-bold text-[#800020] mt-1">
                REAL ESTATES
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/') ? 'text-[#6B0F1A] bg-burgundy-50' : 'text-charcoal-800 hover:text-[#6B0F1A] hover:bg-ivory-100'
                }`}
              >
                Home
              </Link>

              {/* Properties Mega / Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPropertiesDropdown(true)}
                onMouseLeave={() => setPropertiesDropdown(false)}
              >
                <Link
                  to="/properties"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1 ${
                    location.pathname.startsWith('/properties')
                      ? 'text-[#6B0F1A] bg-burgundy-50'
                      : 'text-charcoal-800 hover:text-[#6B0F1A] hover:bg-ivory-100'
                  }`}
                >
                  <span>All Properties</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>

                {propertiesDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-ivory-200 p-2 space-y-1 z-50">
                    <Link
                      to="/properties"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-burgundy-50 text-xs font-semibold text-charcoal-800 hover:text-[#6B0F1A] transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-[#6B0F1A]" />
                      <span>Browse All Properties</span>
                    </Link>
                    <Link
                      to="/properties/buildings"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-burgundy-50 text-xs font-semibold text-charcoal-800 hover:text-[#6B0F1A] transition-colors"
                    >
                      <Building className="w-4 h-4 text-[#C5A059]" />
                      <span>Entire Buildings (Commercial & Res)</span>
                    </Link>
                    <Link
                      to="/properties/commercial"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-burgundy-50 text-xs font-semibold text-charcoal-800 hover:text-[#6B0F1A] transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-[#6B0F1A]" />
                      <span>Commercial Properties & Plazas</span>
                    </Link>
                    <Link
                      to="/properties/sites"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-burgundy-50 text-xs font-semibold text-charcoal-800 hover:text-[#6B0F1A] transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-[#C5A059]" />
                      <span>Sites & Plots (Corner / BDA)</span>
                    </Link>
                    <Link
                      to="/properties/land"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-burgundy-50 text-xs font-semibold text-charcoal-800 hover:text-[#6B0F1A] transition-colors"
                    >
                      <Trees className="w-4 h-4 text-emerald-600" />
                      <span>Development & Industrial Land</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/properties/buildings"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/properties/buildings') ? 'text-[#6B0F1A] bg-burgundy-50' : 'text-charcoal-800 hover:text-[#6B0F1A] hover:bg-ivory-100'
                }`}
              >
                Buildings
              </Link>

              <Link
                to="/properties/sites"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/properties/sites') ? 'text-[#6B0F1A] bg-burgundy-50' : 'text-charcoal-800 hover:text-[#6B0F1A] hover:bg-ivory-100'
                }`}
              >
                Sites & Plots
              </Link>

              <Link
                to="/properties/land"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/properties/land') ? 'text-[#6B0F1A] bg-burgundy-50' : 'text-charcoal-800 hover:text-[#6B0F1A] hover:bg-ivory-100'
                }`}
              >
                Land
              </Link>

              <Link
                to="/about"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/about') ? 'text-[#6B0F1A] bg-burgundy-50' : 'text-charcoal-800 hover:text-[#6B0F1A] hover:bg-ivory-100'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/contact') ? 'text-[#6B0F1A] bg-burgundy-50' : 'text-charcoal-800 hover:text-[#6B0F1A] hover:bg-ivory-100'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider bg-[#6B0F1A] text-white hover:bg-[#800020] shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 border border-[#4A0E17]"
              >
                Enquire Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-charcoal-800 hover:bg-ivory-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-ivory-200 px-4 pt-3 pb-6 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-burgundy-50 hover:text-[#6B0F1A]"
            >
              Home
            </Link>
            <Link
              to="/properties"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-burgundy-50 hover:text-[#6B0F1A]"
            >
              All Properties
            </Link>
            <Link
              to="/properties/buildings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-burgundy-50 hover:text-[#6B0F1A]"
            >
              🏢 Entire Buildings
            </Link>
            <Link
              to="/properties/commercial"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-burgundy-50 hover:text-[#6B0F1A]"
            >
              💼 Commercial Properties
            </Link>
            <Link
              to="/properties/sites"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-burgundy-50 hover:text-[#6B0F1A]"
            >
              📐 Sites & Plots
            </Link>
            <Link
              to="/properties/land"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-burgundy-50 hover:text-[#6B0F1A]"
            >
              🌳 Development Land
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-burgundy-50 hover:text-[#6B0F1A]"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-800 hover:bg-burgundy-50 hover:text-[#6B0F1A]"
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-ivory-200 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full py-3 text-center bg-[#6B0F1A] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Enquire Now
              </button>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-xs text-charcoal-600 py-2 hover:text-[#6B0F1A]"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Reusable Lead Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
};
