import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Building,
  MapPin,
  Maximize2,
  Layers,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Phone,
  ArrowLeft,
  Calendar,
  Compass,
  FileText,
  Car,
  Trees,
  Check,
  Zap,
  Droplets
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { fetchPropertyBySlugOrId, submitEnquiry } from '../services/api';
import { Property } from '../types';
import { useSettingsStore } from '../store/useSettingsStore';
import toast from 'react-hot-toast';

export const PropertyDetailsPage: React.FC = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const identifier = slug || id || '';
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lead Enquiry Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const { settings } = useSettingsStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!identifier) return;
    const loadProperty = async () => {
      try {
        setLoading(true);
        const data = await fetchPropertyBySlugOrId(identifier);
        setProperty(data);
      } catch (err) {
        console.error("Error loading property:", err);
        toast.error("Failed to load property asset details");
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [identifier]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-8">
        <div className="h-96 bg-ivory-200 rounded-3xl" />
        <div className="h-10 bg-ivory-200 w-1/3 rounded" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <Building2 className="w-16 h-16 text-charcoal-300 mx-auto" />
        <h2 className="text-2xl font-serif font-bold text-charcoal-900">
          Property Asset Not Found
        </h2>
        <p className="text-xs text-charcoal-500">
          The requested listing may have been moved or unlisted.
        </p>
        <Link
          to="/properties"
          className="inline-block px-6 py-2.5 bg-[#6B0F1A] text-white text-xs font-bold rounded-xl shadow-md"
        >
          Explore Available Properties
        </Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Property link copied to clipboard!");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Please enter your name and phone number");
      return;
    }

    try {
      setSubmittingLead(true);
      await submitEnquiry({
        name,
        phone,
        email,
        property_id: property.id,
        property_title: property.title,
        message: message || `Interested in discussing details for ${property.title}.`,
      });
      setLeadSubmitted(true);
      toast.success("Thank you! Your enquiry has been received.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit enquiry");
    } finally {
      setSubmittingLead(false);
    }
  };

  const isAvailable = property.status === 'available';
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/properties"
          className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-[#6B0F1A] hover:text-[#800020]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold bg-white border border-ivory-300 rounded-xl text-charcoal-700 hover:bg-ivory-100 shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5 text-[#6B0F1A]" />
          <span>Share Property</span>
        </button>
      </div>

      {/* Main Top Section: Gallery & Sticky Valuation Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative h-[380px] sm:h-[500px] rounded-3xl overflow-hidden bg-slate-950 border border-ivory-300 shadow-xl">
            <img
              src={images[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2E060D]/90 text-white border border-gold-500/40 backdrop-blur-md">
                {property.property_type || property.category.toUpperCase()}
              </span>
            </div>

            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                  isAvailable
                    ? 'bg-emerald-600 text-white'
                    : property.status === 'under_negotiation'
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#6B0F1A] text-white'
                }`}
              >
                {property.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-18 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#6B0F1A] scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Valuation & Enquiry Box */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-xl space-y-6 sticky top-28">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                Asset Valuation
              </span>
              <div className="mt-1">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#6B0F1A]">
                  {property.price_type === 'price_on_request'
                    ? 'Price on Request'
                    : property.price_display || `₹${(property.price / 10000000).toFixed(2)} Cr`}
                </span>
                {property.price_type === 'negotiable' && (
                  <span className="ml-2 text-xs text-[#C5A059] font-bold uppercase tracking-wider block mt-1">
                    (Negotiable with Owner)
                  </span>
                )}
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${cleanPhone}`}
                className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#6B0F1A] text-white hover:bg-[#800020] transition-colors flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Phone className="w-4 h-4 text-gold-300" />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Balaji%20(BGM%20Real%20Estate),%20I%20am%20interested%20in%20discussing%20${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors flex items-center justify-center space-x-1.5 shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Lead Form Inside Box */}
            <div className="pt-4 border-t border-ivory-200">
              <h4 className="text-sm font-serif font-bold text-charcoal-900 mb-3">
                Send Direct Enquiry
              </h4>

              {leadSubmitted ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900">Enquiry Received</p>
                  <p className="text-[11px] text-emerald-700">
                    Our corporate advisory executive will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name *"
                    required
                    className="w-full px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none font-medium"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Number *"
                    required
                    className="w-full px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none font-medium"
                  />
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message or requested walkthrough date..."
                    className="w-full px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none font-medium"
                  />
                  <button
                    type="submit"
                    disabled={submittingLead}
                    className="w-full py-3 bg-[#6B0F1A] hover:bg-[#800020] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
                  >
                    {submittingLead ? 'Submitting...' : 'Request Private Callback'}
                  </button>
                </form>
              )}
            </div>

            <p className="text-center text-[10px] text-charcoal-500 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct owner negotiation with clear legal titles</span>
            </p>
          </div>
        </div>
      </div>

      {/* Property Information & Category-Specific Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        <div className="lg:col-span-8 space-y-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-charcoal-900 leading-tight">
              {property.title}
            </h1>
            <p className="mt-2 text-sm text-charcoal-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-[#6B0F1A] flex-shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          {/* Core Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {property.built_up_area && (
              <div className="p-4 rounded-2xl bg-white border border-ivory-300 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-charcoal-500 block">
                  Built-Up Area
                </span>
                <span className="text-base font-serif font-bold text-charcoal-900 mt-1 block">
                  {property.built_up_area}
                </span>
              </div>
            )}
            {property.plot_area && (
              <div className="p-4 rounded-2xl bg-white border border-ivory-300 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-charcoal-500 block">
                  Plot / Land Area
                </span>
                <span className="text-base font-serif font-bold text-charcoal-900 mt-1 block">
                  {property.plot_area}
                </span>
              </div>
            )}
            {property.road_width && (
              <div className="p-4 rounded-2xl bg-white border border-ivory-300 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-charcoal-500 block">
                  Road Width
                </span>
                <span className="text-base font-serif font-bold text-charcoal-900 mt-1 block">
                  {property.road_width}
                </span>
              </div>
            )}
            {property.facing && (
              <div className="p-4 rounded-2xl bg-white border border-ivory-300 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-charcoal-500 block">
                  Facing
                </span>
                <span className="text-base font-serif font-bold text-charcoal-900 mt-1 block">
                  {property.facing}
                </span>
              </div>
            )}
          </div>

          {/* Dynamic Category-Specific Spec Sheet */}
          {property.category === 'buildings' && property.category_details && (
            <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-charcoal-900 flex items-center space-x-2">
                <Building className="w-5 h-5 text-[#6B0F1A]" />
                <span>Building & High-Yield Asset Specifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                {property.category_details.total_floors && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Total Floors:</span>
                    <strong className="text-charcoal-900">{property.category_details.total_floors} Floors</strong>
                  </div>
                )}
                {property.category_details.total_units && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Total Units / Flats:</span>
                    <strong className="text-charcoal-900">{property.category_details.total_units} Units</strong>
                  </div>
                )}
                {property.category_details.parking_spaces && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Car Parking Spaces:</span>
                    <strong className="text-charcoal-900">{property.category_details.parking_spaces} Vehicles</strong>
                  </div>
                )}
                {property.category_details.rental_income_monthly && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Monthly Rental Income:</span>
                    <strong className="text-emerald-700 font-bold">{property.category_details.rental_income_monthly}</strong>
                  </div>
                )}
                {property.category_details.expected_roi_percent && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Expected Net Yield / ROI:</span>
                    <strong className="text-emerald-700 font-bold">{property.category_details.expected_roi_percent}</strong>
                  </div>
                )}
                {property.category_details.occupancy_status && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Occupancy Status:</span>
                    <strong className="text-charcoal-900">{property.category_details.occupancy_status}</strong>
                  </div>
                )}
                {property.category_details.year_built && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Year Built:</span>
                    <strong className="text-charcoal-900">{property.category_details.year_built}</strong>
                  </div>
                )}
                {property.category_details.lift_available && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Lift / Elevators:</span>
                    <strong className="text-charcoal-900">{property.category_details.lift_available}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {property.category === 'sites' && property.category_details && (
            <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-charcoal-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
                <span>Site & Layout Plot Specifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                {property.category_details.plot_dimensions && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Plot Dimensions:</span>
                    <strong className="text-charcoal-900">{property.category_details.plot_dimensions}</strong>
                  </div>
                )}
                {property.category_details.corner_plot && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Corner Site:</span>
                    <strong className="text-charcoal-900">{property.category_details.corner_plot}</strong>
                  </div>
                )}
                {property.category_details.khata_type && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Khata / Title:</span>
                    <strong className="text-charcoal-900">{property.category_details.khata_type}</strong>
                  </div>
                )}
                {property.category_details.approval_authority && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Approval Authority:</span>
                    <strong className="text-charcoal-900">{property.category_details.approval_authority}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {property.category === 'land' && property.category_details && (
            <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-charcoal-900 flex items-center space-x-2">
                <Trees className="w-5 h-5 text-emerald-600" />
                <span>Land & Development Acreage Specifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                {property.category_details.total_land_area && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Total Land Area:</span>
                    <strong className="text-charcoal-900">{property.category_details.total_land_area}</strong>
                  </div>
                )}
                {property.category_details.land_type && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Land Type / Zoning:</span>
                    <strong className="text-charcoal-900">{property.category_details.land_type}</strong>
                  </div>
                )}
                {property.category_details.road_access && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Road Frontage Access:</span>
                    <strong className="text-charcoal-900">{property.category_details.road_access}</strong>
                  </div>
                )}
                {property.category_details.conversion_status && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Conversion Status:</span>
                    <strong className="text-charcoal-900">{property.category_details.conversion_status}</strong>
                  </div>
                )}
                {property.category_details.water_source && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Water Source:</span>
                    <strong className="text-charcoal-900">{property.category_details.water_source}</strong>
                  </div>
                )}
                {property.category_details.electricity_sanction && (
                  <div className="flex justify-between p-3 bg-ivory-50 rounded-xl">
                    <span className="text-charcoal-600">Power Sanction:</span>
                    <strong className="text-charcoal-900">{property.category_details.electricity_sanction}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-lg font-serif font-bold text-charcoal-900">
              Detailed Property Overview
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities & Highlights */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-charcoal-900">
                Key Amenities & Features
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-charcoal-800 p-2.5 bg-ivory-50 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
