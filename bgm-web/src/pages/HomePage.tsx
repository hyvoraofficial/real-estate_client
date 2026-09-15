import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  Building,
  MapPin,
  Trees,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowRight,
  Phone,
  Sparkles,
  Layers,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { fetchProperties } from '../services/api';
import { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { useSettingsStore } from '../store/useSettingsStore';
import { EnquiryModal } from '../components/EnquiryModal';

export const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const { settings } = useSettingsStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties();
        if (Array.isArray(data)) {
          setAllProperties(data);
          const featured = data.filter((p) => p.featured || p.status === 'available');
          setFeaturedProperties(featured.slice(0, 6));
        }
      } catch (err) {
        console.error("Error loading properties:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchLocation) query.set('search', searchLocation);
    if (searchCategory !== 'all') query.set('category', searchCategory);
    navigate(`/properties?${query.toString()}`);
  };

  const categories = [
    {
      id: 'buildings',
      title: 'Entire Buildings',
      subtitle: 'Commercial & Residential Blocks',
      description: 'G+3 to G+8 standalone towers, fully occupied rental assets, and boutique residential complexes with high rental yields.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      link: '/properties/buildings',
      count: allProperties.filter((p) => p.category === 'buildings').length,
    },
    {
      id: 'commercial',
      title: 'Commercial Properties',
      subtitle: 'Office Towers & Retail Plazas',
      description: 'Grade-A corporate office suites, high-street retail showrooms, and commercial IT floor spaces in prime business districts.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      link: '/properties/commercial',
      count: allProperties.filter((p) => p.category === 'commercial').length,
    },
    {
      id: 'sites',
      title: 'Sites & Plots',
      subtitle: 'BDA / A-Khata Corner Layouts',
      description: 'Clear title commercial corner sites, gated residential layouts, and high FAR investment plots with immediate registration.',
      image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=800&q=80',
      link: '/properties/sites',
      count: allProperties.filter((p) => p.category === 'sites').length,
    },
    {
      id: 'land',
      title: 'Development Land',
      subtitle: 'Industrial, Logistics & Large Parcels',
      description: 'Highway frontage development land, DC converted industrial acreage, and expansive commercial parcels for major projects.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      link: '/properties/land',
      count: allProperties.filter((p) => p.category === 'land').length,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Grand Hero Section */}
      <section className="relative min-h-[620px] lg:min-h-[720px] flex items-center justify-center bg-[#100305] text-white px-4 sm:px-6 lg:px-8 overflow-hidden pt-12 pb-28">
        {/* Background High-res Architectural Image with increased clarity and transparent overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings.hero_image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80'}
            alt="HYVORA REAL ESTATES Hero"
            className="w-full h-full object-cover opacity-75 scale-105 transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100305]/90 via-[#100305]/40 to-[#100305]/30" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Decorative Luxury Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#6B0F1A]/80 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-luxury">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Karnataka's Premier Real Estate Investment Partner</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-lg">
            {settings.hero_headline || "Exceptional Real Estate. Extraordinary Opportunities."}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-ivory-100 font-normal leading-relaxed opacity-90">
            {settings.hero_subheading || "Discover premium buildings, commercial properties, sites and land opportunities curated by HYVORA REAL ESTATES."}
          </p>

          {/* Direct CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs uppercase font-bold tracking-widest bg-[#6B0F1A] text-white hover:bg-[#800020] shadow-xl hover:shadow-2xl transition-all border border-gold-500/30 transform hover:-translate-y-0.5"
            >
              Explore All Properties
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs uppercase font-bold tracking-widest bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/20"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Floating Search & Discovery Console */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <form
          onSubmit={handleHeroSearch}
          className="bg-white rounded-3xl shadow-2xl border border-ivory-300 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        >
          <div className="md:col-span-5 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B0F1A] mb-1">
              Location / Landmark
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="e.g. Bangalore, Koramangala, Hubballi..."
                className="w-full pl-10 pr-4 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-[#6B0F1A] font-medium"
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B0F1A] mb-1">
              Asset Category
            </label>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs sm:text-sm text-charcoal-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#6B0F1A] cursor-pointer"
            >
              <option value="all">🏢 All Asset Types</option>
              <option value="buildings">Entire Commercial & Res Buildings</option>
              <option value="commercial">Commercial Plazas & Showrooms</option>
              <option value="sites">Sites & Corner Plots</option>
              <option value="land">Development Land & Industrial</option>
            </select>
          </div>

          <div className="md:col-span-3 pt-4 md:pt-5">
            <button
              type="submit"
              className="w-full py-3 bg-[#6B0F1A] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#800020] transition-all flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Assets</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Core Property Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block">
            Specialized Asset Classes
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-charcoal-900">
            What We Specialize In
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            From standalone commercial headquarters to high-acreage development parcels, HYVORA REAL ESTATES curates premier property assets with verified legal compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative rounded-3xl overflow-hidden bg-white border border-ivory-300 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div className="h-52 w-full overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E060D] via-[#2E060D]/40 to-transparent" />
                <div className="absolute top-3 right-3 bg-[#6B0F1A]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold-500/30">
                  {cat.count} Listed
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-ivory-200 font-medium">{cat.subtitle}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-ivory-200 flex items-center justify-between text-xs font-bold text-[#6B0F1A] group-hover:text-[#800020]">
                  <span>Explore {cat.title}</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Properties Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ivory-300 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-charcoal-900 mt-1">
              Featured High-Value Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center space-x-1.5 text-xs uppercase font-bold tracking-wider text-[#6B0F1A] hover:text-[#800020] transition-colors"
          >
            <span>View Complete Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-ivory-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : featuredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-ivory-300 p-12 text-center text-charcoal-500 text-sm">
            No properties currently listed.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Corporate Real Estate Value Proposition */}
      <section className="bg-[#2E060D] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              The HYVORA Standard
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
              Why Institutional & Private Investors Choose HYVORA
            </h2>
            <p className="text-ivory-200 text-sm sm:text-base leading-relaxed opacity-90">
              We eliminate traditional real estate complexities with institutional-grade due diligence, clear title ownership, and personalized advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#4A0E17]/60 border border-gold-500/20 rounded-3xl p-8 backdrop-blur-md space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                100% Legal Title Diligence
              </h3>
              <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed">
                Every building, site, and land asset undergoes thorough documentation verification (Khata status, parent deeds, encumbrance clearances).
              </p>
            </div>

            <div className="bg-[#4A0E17]/60 border border-gold-500/20 rounded-3xl p-8 backdrop-blur-md space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                High Rental Yields & ROI
              </h3>
              <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed">
                We specialize in commercial and residential buildings with active tenancy, stable cash flows, and attractive net capitalization yields.
              </p>
            </div>

            <div className="bg-[#4A0E17]/60 border border-gold-500/20 rounded-3xl p-8 backdrop-blur-md space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                Direct Owner Negotiations
              </h3>
              <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed">
                Direct engagement with legitimate property owners and verified corporate sellers, ensuring transparent pricing with zero middleman inflated markups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Direct Contact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#6B0F1A] via-[#800020] to-[#4A0E17] rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-gold-500/30">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
              Private Real Estate Consultation
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-extrabold text-white">
              Looking to Buy or Liquidate a High-Value Property?
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200 leading-relaxed opacity-90">
              Speak directly with our senior corporate real estate advisors for confidential portfolio acquisition, building valuation, or land development consultations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="px-7 py-3.5 bg-white text-[#6B0F1A] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:bg-ivory-100 transition-all text-center"
            >
              Request Call Back
            </button>
            <a
              href={`tel:${settings.phone}`}
              className="px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-[#2E060D] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Reusable Lead Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </div>
  );
};
