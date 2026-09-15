import React, { useState } from 'react';
import { X, Send, Phone, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { submitEnquiry } from '../services/api';
import toast from 'react-hot-toast';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId?: string;
  propertyTitle?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error('Name and phone number are required');
      return;
    }

    try {
      setLoading(true);
      await submitEnquiry({
        name,
        phone,
        email,
        property_id: propertyId,
        property_title: propertyTitle || 'General Corporate Advisory Enquiry',
        message: message || 'I am interested in exploring property investment opportunities with BGM Real Estate.',
      });
      setSubmitted(true);
      toast.success('Your enquiry has been submitted successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={handleResetAndClose}
        />

        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border border-ivory-300">
          {/* Header */}
          <div className="bg-[#6B0F1A] text-white p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                Direct Corporate Consultation
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                {propertyTitle ? `Enquire on ${propertyTitle}` : 'Connect with BGM Real Estate'}
              </h3>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 bg-[#FAF9F6]">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-serif font-bold text-charcoal-900">
                  Thank You, {name}!
                </h4>
                <p className="text-xs text-charcoal-600 max-w-xs mx-auto leading-relaxed">
                  Your enquiry has been received. Our senior property advisor will reach out to you at <span className="font-semibold">{phone}</span> shortly.
                </p>
                <button
                  onClick={handleResetAndClose}
                  className="mt-4 px-6 py-2.5 bg-[#6B0F1A] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#800020]"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Rajeshwar Sharma"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Phone / Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98450 12345"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. investor@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Message / Requirements
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify your investment budget, preferred location, or request for site walkthrough..."
                      className="w-full px-3.5 py-2.5 bg-white border border-ivory-300 rounded-xl text-xs text-charcoal-900 focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#6B0F1A] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-[#800020] transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Submit Advisory Request'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
