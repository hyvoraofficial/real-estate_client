import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const [showEnquiry, setShowEnquiry] = useState(false);
  return (
    <>
      <footer className="bg-[#1c1a17] text-gray-300 py-12 md:py-16 px-6 md:px-8 lg:px-16 border-t border-[#d4af37]/20 relative z-10 overflow-hidden">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

          {/* Column 1: Reach Us */}
          <div className="space-y-6">
            <h3 className="text-[#d4af37] text-xl font-serif mb-4">Reach Us</h3>

            <div>
              <p className="font-bold text-gray-200 mb-1">Corporate Address:</p>
              <p className="text-sm leading-relaxed text-gray-400">
                HYVORA Property Management<br />
                Bengaluru, Karnataka 560066<br />
                India
              </p>
            </div>

            <div>
              <p className="font-bold text-gray-200 mb-1">For enquiries:</p>
              <a href="tel:8217512581" className="text-sm font-semibold text-white hover:text-primary transition-colors">
                +91 8217512581
              </a>
            </div>

            <div>
              <p className="font-bold text-gray-200 mb-1">Email:</p>
              <a href="mailto:hyvora.official@gmail.com" className="text-sm hover:text-[#d4af37] transition-colors">
                hyvora.official@gmail.com
              </a>
            </div>

            <div className="flex gap-4 pt-2">
              <a href="https://hyvora.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><Facebook size={20} /></a>
              <a href="https://hyvora.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><Instagram size={20} /></a>
              <a href="https://hyvora.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><Twitter size={20} /></a>
              <a href="https://hyvora.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><Linkedin size={20} /></a>
              <a href="https://hyvora.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Menu */}
          <div>
            <h3 className="text-[#d4af37] text-xl font-serif mb-6">Quick Menu</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/properties" className="hover:text-[#d4af37] transition-colors block">Properties</Link></li>
              <li><Link to="/login" className="hover:text-[#d4af37] transition-colors block">Customer Login</Link></li>
              <li><a href="https://hyvora.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors block">HYVORA Official</a></li>
            </ul>
            {!isAboutPage && (
              <div className="mt-8 inline-block">
                <Link to="/about" className="inline-block bg-gradient-to-r from-[#d4af37] to-[#a88c3a] hover:from-[#e5c354] hover:to-[#b89b43] text-[#1c1a17] font-bold text-sm py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  About Us
                </Link>
              </div>
            )}
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-[#d4af37] text-xl font-serif mb-6">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/privacy-policy" className="hover:text-[#d4af37] transition-colors block">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-[#d4af37] transition-colors block">Terms & Conditions</Link></li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500">
              <p>Build. Automate. Conquer.</p>
              <p className="mt-1">A HYVORA Product Demonstration</p>
            </div>
          </div>
        </div>

        {/* Copyright and backlink */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} HYVORA Property Management. All rights reserved.</p>
          <p>
            Powered by{' '}
            <a href="https://hyvora.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
              HYVORA
            </a>
          </p>
        </div>
      </footer>

      {/* Floating Enquire Now Section */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
        {showEnquiry && (
          <div className="bg-white shadow-2xl rounded-l-xl p-4 md:p-6 border-y border-l border-[#d4af37]/30 mr-0 w-64 md:w-72 relative">
            <button
              onClick={() => setShowEnquiry(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
            <h4 className="text-xl font-bold text-[#1c1a17] mb-5 border-b pb-2">Contact Us</h4>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <a href="mailto:hyvora.official@gmail.com" className="bg-[#d4af37]/10 p-2 rounded-lg text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
                  <a href="mailto:hyvora.official@gmail.com" className="text-sm font-medium text-gray-800 hover:text-[#d4af37]">hyvora.official@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <a href="tel:8217512581" className="bg-[#d4af37]/10 p-2 rounded-lg text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">
                  <Phone size={20} />
                </a>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</p>
                  <a href="tel:8217512581" className="text-sm font-medium text-gray-800 hover:text-[#d4af37]">8217512581</a>
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setShowEnquiry(!showEnquiry)}
          className="bg-[#a88c3a] hover:bg-[#d4af37] text-white py-3 px-1.5 md:py-4 md:px-2 font-semibold tracking-wider text-xs md:text-sm shadow-lg transition-colors rounded-l-md cursor-pointer"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Enquire Now
        </button>
      </div>
    </>
  );
};
