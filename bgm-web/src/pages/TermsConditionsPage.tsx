import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-[#6B0F1A]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-display font-extrabold text-slate-900">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Welcome to HYVORA REAL ESTATES. By accessing our portal, browsing properties, or submitting rental/purchase bookings, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h3 className="text-base font-bold text-slate-900 pt-2">1. Booking & Lease Verification</h3>
          <p>
            All unit reservations made through this portal are subject to administrative review, KYC verification (valid Aadhaar/Passport), and execution of a legally binding lease agreement.
          </p>
          <h3 className="text-base font-bold text-slate-900 pt-2">2. Security Deposits & Rent Payments</h3>
          <p>
            Security advances and monthly rent amounts must be paid according to the scheduled due dates agreed upon during lease approval.
          </p>
          <h3 className="text-base font-bold text-slate-900 pt-2">3. Property Usage & Conduct</h3>
          <p>
            Tenants agree to use the allotted properties strictly for residential or specified commercial purposes in accordance with municipal laws and society guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
