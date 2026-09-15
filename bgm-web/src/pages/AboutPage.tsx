import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Phone,
  Sparkles
} from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';

export const AboutPage: React.FC = () => {
  const { settings } = useSettingsStore();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#2E060D] via-[#4A0E17] to-[#6B0F1A] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-gold-500/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Corporate Real Estate Advisory</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white">
            About <span className="text-gold-400">BGM Real Estate</span>
          </h1>

          <p className="text-xs sm:text-base text-ivory-200 max-w-2xl mx-auto leading-relaxed opacity-90">
            Pioneering transparent high-value asset transactions, whole building sales, prime development sites, and commercial infrastructure investments across Karnataka.
          </p>
        </div>
      </section>

      {/* Main Story & Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Our Expertise & Legacy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-charcoal-900 leading-tight">
              Facilitating Strategic High-Value Real Estate Transactions
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {settings.about_content ||
                "BGM Real Estate is a premier corporate real estate consultancy and investment firm specializing in the sale and acquisition of entire commercial and residential buildings, prime layout plots, industrial land, and high-value property portfolios across Karnataka."}
            </p>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              Unlike generic residential listing portals, BGM Real Estate focuses on substantial physical real estate assets where legal compliance, clear title provenance, cashflow verification, and institutional-grade negotiation are paramount.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-bold text-charcoal-800">
              <div className="flex items-center space-x-2 p-3 bg-white border border-ivory-300 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Entire Commercial Towers</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white border border-ivory-300 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Multi-Unit Residential Blocks</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white border border-ivory-300 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>BDA Commercial Sites</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white border border-ivory-300 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Highway Development Land</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-ivory-300 bg-slate-900 h-96 lg:h-[460px]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              alt="BGM Corporate Real Estate"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2E060D] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 text-white p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <p className="text-xs uppercase tracking-wider font-bold text-gold-300">Corporate Integrity</p>
              <p className="text-sm font-serif font-bold text-white mt-1">Direct Negotiations • Zero Inflated Brokerage Markup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ivory-300 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-burgundy-50 text-[#6B0F1A] flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-charcoal-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              {settings.mission ||
                "To deliver uncompromising transparency, legal diligence, and maximum value creation for real estate investors, business owners, and land developers."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ivory-300 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-50 text-[#C5A059] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-charcoal-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              {settings.vision ||
                "To be Karnataka's most trusted corporate real estate advisory and high-value asset brokerage partner."}
            </p>
          </div>
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2E060D] rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 border border-gold-500/30">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Personalized Consultation
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Schedule a Confidential Real Estate Meeting
            </h3>
            <p className="text-xs text-ivory-200">
              Reach out to our principal advisory desk for building acquisitions or land parcel requirements.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-7 py-3.5 bg-[#6B0F1A] hover:bg-[#800020] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all border border-gold-500/30 text-center"
          >
            Contact BGM Real Estate
          </Link>
        </div>
      </section>
    </div>
  );
};
