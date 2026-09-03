import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark py-12 md:py-24 px-4 sm:px-8 max-w-4xl mx-auto space-y-6 md:space-y-8 text-grey-light">
      <h1 className="text-3xl md:text-5xl font-bold text-[#d4af37] font-serif text-center mb-6 md:mb-12">Privacy Policy</h1>
      
      <section className="bg-dark-lighter p-6 md:p-8 rounded-2xl border border-grey-dark">
        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
        <p className="leading-relaxed mb-4">
          We collect information that you provide directly to us, including when you create an account, update your profile, use the interactive features of our services, or communicate with us.
        </p>
      </section>

      <section className="bg-dark-lighter p-6 md:p-8 rounded-2xl border border-grey-dark">
        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Information</h2>
        <p className="leading-relaxed mb-4">
          We use the information we collect to provide, maintain, and improve our services, to process transactions and send related information, and to monitor and analyze trends and usage.
        </p>
      </section>

      <section className="bg-dark-lighter p-6 md:p-8 rounded-2xl border border-grey-dark">
        <h2 className="text-2xl font-bold text-white mb-4">3. Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at hyvora.official@gmail.com.
        </p>
      </section>
    </div>
  );
};
