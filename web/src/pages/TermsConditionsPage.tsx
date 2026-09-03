import React from 'react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark py-12 md:py-24 px-4 sm:px-8 max-w-4xl mx-auto space-y-6 md:space-y-8 text-grey-light">
      <h1 className="text-3xl md:text-5xl font-bold text-[#d4af37] font-serif text-center mb-6 md:mb-12">Terms & Conditions</h1>
      
      <section className="bg-dark-lighter p-6 md:p-8 rounded-2xl border border-grey-dark">
        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
        <p className="leading-relaxed mb-4">
          By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
        </p>
      </section>

      <section className="bg-dark-lighter p-6 md:p-8 rounded-2xl border border-grey-dark">
        <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
        <p className="leading-relaxed mb-4">
          The service and its original content, features, and functionality are and will remain the exclusive property of HYVORA and its licensors.
        </p>
      </section>

      <section className="bg-dark-lighter p-6 md:p-8 rounded-2xl border border-grey-dark">
        <h2 className="text-2xl font-bold text-white mb-4">3. Governing Law</h2>
        <p className="leading-relaxed">
          These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>
      </section>
    </div>
  );
};
