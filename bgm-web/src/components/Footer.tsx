import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight, Clock } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';

export const Footer: React.FC = () => {
  const { settings } = useSettingsStore();

  return (
    <footer className="bg-[#2E060D] text-[#FAF9F6] border-t-2 border-[#C5A059]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <span className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-none block group-hover:text-gold-300 transition-colors">
                HYVORA
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-bold uppercase text-gold-400 mt-1 block">
                REAL ESTATES
              </span>
            </Link>

            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              Karnataka's trusted corporate real estate investment & sales consultancy. Specializing in entire commercial towers, high-yield residential blocks, prime corner sites, and extensive development land.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-gold-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>100% Clear Titles & Legally Diligent Assets</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 font-serif">
              Asset Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link to="/properties/buildings" className="hover:text-gold-400 transition-colors flex items-center group">
                  <span>Entire Buildings</span>
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/properties/commercial" className="hover:text-gold-400 transition-colors">
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link to="/properties/sites" className="hover:text-gold-400 transition-colors">
                  Sites & Layout Plots
                </Link>
              </li>
              <li>
                <Link to="/properties/land" className="hover:text-gold-400 transition-colors">
                  Development & Industrial Land
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-gold-400 transition-colors">
                  All Listed Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 font-serif">
              Corporate
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">
                  About HYVORA REAL ESTATES
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors">
                  Schedule Consultation
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gold-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gold-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-white/40 hover:text-gold-400 transition-colors">
                  Admin Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 font-serif">
              Head Office
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{settings.address}</span>
              </div>
              {settings.contact_person && (
                <div className="text-[11px] text-gold-300 font-semibold pl-6 -mt-1">
                  Contact: {settings.contact_person}
                </div>
              )}
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-gold-400 font-medium">
                    {settings.phone}
                  </a>
                  {settings.secondary_phone && (
                    <a href={`tel:${settings.secondary_phone.replace(/[^0-9+]/g, '')}`} className="hover:text-gold-400 font-medium">
                      {settings.secondary_phone}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-400">{settings.email}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{settings.business_hours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/60">
          <p>© 2026 HYVORA REAL ESTATES. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0 text-gold-400/80">
            Premium Corporate Real Estate & Asset Sales
          </p>
        </div>
      </div>
    </footer>
  );
};
