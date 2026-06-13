import React from 'react';
import { Building2, Home, Users, Clock, Target, Eye, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { Card } from '../components/Card';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* 1. About SK Buildings Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] font-serif">About SK Buildings</h1>
        <p className="text-grey-light max-w-3xl mx-auto text-lg leading-relaxed">
          Building the foundation of tomorrow with trust, quality, and unparalleled excellence in real estate and property management.
        </p>
      </div>

      {/* 2. Our Story */}
      <section className="bg-dark-lighter p-8 md:p-12 rounded-2xl border border-[#d4af37]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <h2 className="text-3xl font-bold text-white mb-6 font-serif">Our Story</h2>
        <div className="space-y-4 text-grey-light leading-relaxed">
          <p>
            The SK Buildings journey began in 2008 when our founder, Sunil M, developed his very first project on his own land. This foundational step sparked a career dedicated to creating high-quality, reliable, and accessible living and commercial spaces.
          </p>
          <p>
            A unique hallmark of SK Buildings is our unyielding commitment to ownership and quality. To this day, every single project we develop is built exclusively on our own land—we rely on no external land acquisitions. In addition to our own developments, we have also successfully participated in Joint Developments (JD) using our own land. This deep-rooted ownership ensures that our core values of integrity, trust, and superior architecture are never compromised.
          </p>
        </div>
      </section>

      {/* 3. Statistics */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-dark-lighter p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
            <Building2 className="mx-auto text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-3xl font-bold text-white mb-1">10+</h3>
            <p className="text-grey-light text-sm font-semibold tracking-wider uppercase">Projects</p>
          </div>
          <div className="bg-dark-lighter p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
            <Home className="mx-auto text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-3xl font-bold text-white mb-1">125+</h3>
            <p className="text-grey-light text-sm font-semibold tracking-wider uppercase">Properties</p>
          </div>
          <div className="bg-dark-lighter p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
            <Users className="mx-auto text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-3xl font-bold text-white mb-1">1000+</h3>
            <p className="text-grey-light text-sm font-semibold tracking-wider uppercase">Tenants</p>
          </div>
          <div className="bg-dark-lighter p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
            <Clock className="mx-auto text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-3xl font-bold text-white mb-1">15+</h3>
            <p className="text-grey-light text-sm font-semibold tracking-wider uppercase">Years of Experience</p>
          </div>
        </div>
      </section>

      {/* 4. Founder Section */}
      <section className="bg-gradient-to-br from-dark-lighter to-dark p-8 md:p-12 rounded-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          {/* Placeholder for Founder Photo */}
          <div className="w-full h-full bg-grey-dark flex items-center justify-center">
            <Users size={64} className="text-grey-light" />
          </div>
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white font-serif">Sunil M</h2>
          <p className="text-[#d4af37] font-semibold tracking-wider uppercase text-sm">Founder & Chairman</p>
          
          <div className="bg-dark/50 p-6 rounded-xl border-l-4 border-[#d4af37] my-6 text-left">
            <p className="text-grey-light italic leading-relaxed">
              "When I built our very first project back in 2008, my vision was to create more than just four walls. We wanted to build communities where trust is absolute. That is why I maintain a direct connection with all my tenants. No middlemen—just direct, transparent communication and complete peace of mind."
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-2">Experience & Vision</h4>
            <p className="text-grey-light text-sm leading-relaxed">
              With over 15 years of hands-on experience, Sunil M has transformed his personal land investments into a prominent real estate portfolio of over 10 major projects. His visionary approach bypasses the traditional landlord-tenant barriers, treating every one of our 1000+ tenants like extended family with direct, open access to ownership.
            </p>
          </div>
        </div>
      </section>

      {/* 5 & 6. Vision and Mission */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="bg-dark-lighter border-t-4 border-t-[#d4af37] hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#d4af37]/10 p-3 rounded-xl">
              <Eye className="text-[#d4af37]" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white font-serif">Our Vision</h2>
          </div>
          <p className="text-grey-light leading-relaxed">
            To be the most trusted and innovative real estate developer in the region, recognized for our commitment to quality, sustainable building practices, and creating spaces that significantly enhance the quality of life for our residents and business partners.
          </p>
        </Card>

        <Card className="bg-dark-lighter border-t-4 border-t-[#d4af37] hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#d4af37]/10 p-3 rounded-xl">
              <Target className="text-[#d4af37]" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white font-serif">Our Mission</h2>
          </div>
          <p className="text-grey-light leading-relaxed">
            To deliver exceptional property management and development services by prioritizing transparency, architectural excellence, and tenant satisfaction. We aim to build enduring relationships with our clients by consistently exceeding their expectations.
          </p>
        </Card>
      </section>

      {/* 7. Why Choose SK Buildings */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-serif">Why Choose SK Buildings?</h2>
          <p className="text-grey-light max-w-2xl mx-auto">
            We don't just rent out spaces; we provide complete peace of mind. Here is what sets us apart from the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="bg-[#d4af37]/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
              <HeartHandshake className="text-[#d4af37]" size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">Direct Owner Access</h3>
            <p className="text-grey-light text-sm leading-relaxed">
              No middlemen, no frustrating management companies. Every single tenant has the ability to directly contact the owner, ensuring rapid responses and genuine care.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="bg-[#d4af37]/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
              <Award className="text-[#d4af37]" size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">Built on Owned Land</h3>
            <p className="text-grey-light text-sm leading-relaxed">
              Every project is constructed exclusively on land owned directly by SK Buildings. This deep-rooted ownership guarantees absolute stability and zero legal ambiguity for our tenants.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="bg-[#d4af37]/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
              <ShieldCheck className="text-[#d4af37]" size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">Uncompromised Security</h3>
            <p className="text-grey-light text-sm leading-relaxed">
              Our properties are equipped with 24/7 security, modern surveillance systems, and safe access protocols to ensure you and your family always feel secure.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
