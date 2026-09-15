import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-bgm-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-display font-extrabold text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            At BGM Real Estates, we take your privacy seriously. This Privacy Policy details how we collect, safeguard, and utilize your personal information.
          </p>
          <h3 className="text-base font-bold text-slate-900 pt-2">1. Information We Collect</h3>
          <p>
            We collect contact information (such as your phone number, full name), government identity documents for lease compliance, and booking logs.
          </p>
          <h3 className="text-base font-bold text-slate-900 pt-2">2. How Information is Secured</h3>
          <p>
            Uploaded verification documents are stored securely with strict role-based access control. We never share or sell tenant personal data to unauthorized third-party advertisers.
          </p>
        </div>
      </div>
    </div>
  );
};
