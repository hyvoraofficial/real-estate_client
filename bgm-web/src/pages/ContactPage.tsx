import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { submitEnquiry } from '../services/api';
import { useSettingsStore } from '../store/useSettingsStore';
import toast from 'react-hot-toast';

export const ContactPage: React.FC = () => {
  const { settings } = useSettingsStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('Entire Building');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Please provide your name and phone number");
      return;
    }

    try {
      setLoading(true);
      await submitEnquiry({
        name,
        phone,
        email,
        property_title: `Advisory Consultation (${propertyType})`,
        message: message || `Interested in discussing ${propertyType} purchase/sales opportunities with BGM Real Estate.`,
      });
      setSubmitted(true);
      toast.success("Thank you! Your enquiry has been received.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#2E060D] via-[#4A0E17] to-[#6B0F1A] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gold-500/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Corporate Consultation & Office Locations
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
            Contact BGM Real Estate
          </h1>
          <p className="text-xs sm:text-sm text-ivory-200 max-w-xl mx-auto leading-relaxed opacity-90">
            Reach out directly to our real estate advisory team for property valuations, site inspections, or investment acquisitions.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-ivory-300 shadow-luxury space-y-6">
              <h3 className="text-xl font-serif font-bold text-charcoal-900 border-b border-ivory-200 pb-4">
                Corporate Office
              </h3>

              <div className="space-y-5 text-xs text-charcoal-700">
                {/* Contact Person Highlight */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-burgundy-900 via-[#800020] to-burgundy-950 text-white flex items-center justify-between border border-gold-500/30 shadow-md">
                  <div>
                    <span className="text-[10px] text-gold-300 font-bold uppercase tracking-widest block">Principal Advisor</span>
                    <strong className="text-base font-serif font-black text-white">{settings.contact_person || 'Balaji'}</strong>
                    <span className="text-[11px] text-ivory-200 block">BGM Real Estate</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-gold-400/30">
                    <ShieldCheck className="w-5 h-5 text-gold-400" />
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-burgundy-50 text-[#6B0F1A] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-charcoal-900 font-bold mb-0.5">Physical Office Address</strong>
                    <span className="leading-relaxed font-medium text-charcoal-800">{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-burgundy-50 text-[#6B0F1A] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-charcoal-900 font-bold mb-0.5">Telephone Lines (Direct)</strong>
                    <div className="flex flex-col space-y-1">
                      <a href={`tel:${cleanPhone}`} className="text-[#6B0F1A] hover:underline font-bold text-sm">
                        {settings.phone}
                      </a>
                      {settings.secondary_phone && (
                        <a href={`tel:${settings.secondary_phone.replace(/[^0-9+]/g, '')}`} className="text-[#6B0F1A] hover:underline font-bold text-sm">
                          {settings.secondary_phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-burgundy-50 text-[#6B0F1A] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-charcoal-900 font-bold mb-0.5">Corporate Email</strong>
                    <a href={`mailto:${settings.email}`} className="text-[#6B0F1A] hover:underline font-bold">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-burgundy-50 text-[#6B0F1A] flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-charcoal-900 font-bold mb-0.5">Business Working Hours</strong>
                    <span>{settings.business_hours}</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-ivory-200">
                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Balaji%20(BGM%20Real%20Estate),%20I%20would%20like%20to%20enquire%20about%20property%20investments.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2.5 shadow-md transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white text-white" />
                  <span>Start WhatsApp Consultation with Balaji</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact & Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-ivory-300 shadow-luxury space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  Send Message
                </span>
                <h3 className="text-2xl font-serif font-bold text-charcoal-900 mt-1">
                  Schedule Private Property Walkthrough
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">
                  Fill out the form below and an authorized BGM representative will connect with you.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-emerald-900">Enquiry Received Successfully</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you, {name}. Our property director will contact you on {phone} within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-5 py-2 bg-[#6B0F1A] text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Anand Kulkarni"
                        required
                        className="w-full px-4 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98450 00000"
                        required
                        className="w-full px-4 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. anand@company.com"
                        className="w-full px-4 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">Interested Asset Class</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-4 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none font-medium"
                      >
                        <option value="Entire Commercial Building">🏢 Entire Commercial Building</option>
                        <option value="Residential Apartment Building">🏬 Residential Apartment Building</option>
                        <option value="Commercial Retail Showroom">💼 Commercial Retail Showroom</option>
                        <option value="BDA Approved Corner Site">📐 BDA Approved Corner Site</option>
                        <option value="Highway Development Land">🌳 Highway Development Land</option>
                        <option value="General Investment Advisory">💎 General Investment Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">Requirements / Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please mention your preferred location, budget range, or specific property query..."
                      className="w-full px-4 py-2.5 bg-ivory-50 border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#6B0F1A] hover:bg-[#800020] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending...' : 'Submit Consultation Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
