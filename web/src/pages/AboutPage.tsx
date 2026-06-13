import React from 'react';
import { Building2, Home, Users, Clock, Target, Eye, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { Card } from '../components/Card';
import { AnimatedCounter } from '../components/AnimatedCounter';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* 1. About SK Buildings Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] font-serif">About SK Buildings</h1>
        <p className="text-grey-light max-w-3xl mx-auto text-lg leading-relaxed">
          Building the foundation of tomorrow with trust, quality, and unparalleled excellence in real estate and property management since 2008.
        </p>
      </div>

      {/* 2. Our Story */}
      <section className="bg-dark-lighter p-8 md:p-12 rounded-2xl border border-[#d4af37]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <h2 className="text-3xl font-bold text-white mb-6 font-serif">Our Story</h2>
        <div className="space-y-4 text-grey-light leading-relaxed">
          <p>
            SK Buildings began its journey in 2008 with a simple yet powerful idea: to provide high-quality, reliable, and accessible living and commercial spaces. What started as a modest endeavor has grown into a trusted name in the real estate sector.
          </p>
          <p>
            Over the years, we have continuously evolved, embracing modern architecture while staying true to our core values of integrity and customer satisfaction. Every project we undertake is a testament to our dedication to building not just structures, but vibrant communities where people can thrive.
          </p>
        </div>
      </section>

      {/* 3. Statistics */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-dark-lighter p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
            <Building2 className="mx-auto text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter end={10} suffix="+" />
            </h3>
            <p className="text-grey-light text-sm font-semibold tracking-wider uppercase">Projects</p>
          </div>
          <div className="bg-dark-lighter p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
            <Home className="mx-auto text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter end={125} suffix="+" />
            </h3>
            <p className="text-grey-light text-sm font-semibold tracking-wider uppercase">Properties</p>
          </div>
          <div className="bg-dark-lighter p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
            <Users className="mx-auto text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter end={1000} suffix="+" />
            </h3>
            <p className="text-grey-light text-sm font-semibold tracking-wider uppercase">Tenants</p>
          </div>
          <div className="bg-dark-lighter p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
            <Clock className="mx-auto text-[#d4af37] mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter end={18} suffix="+" />
            </h3>
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
          <h2 className="text-3xl font-bold text-white font-serif">Sunil Kumar</h2>
          <p className="text-[#d4af37] font-semibold tracking-wider uppercase text-sm">Founder & Chairman</p>
          
          <div className="bg-dark/50 p-6 rounded-xl border-l-4 border-[#d4af37] my-6 text-left">
            <p className="text-grey-light italic leading-relaxed">
              "Our mission has always been to build more than just four walls. We strive to create environments that inspire, protect, and nurture the families and businesses that reside within them. Trust is the foundation of every brick we lay."
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-2">Experience & Vision</h4>
            <p className="text-grey-light text-sm leading-relaxed">
              With over 18 years of hands-on experience in real estate development and property management since founding SK Buildings in 2008, Sunil Kumar has led the company from a single-property investment to a prominent real estate portfolio. His visionary approach focuses on sustainable development and tenant-first policies.
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
              <ShieldCheck className="text-[#d4af37]" size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">Uncompromised Security</h3>
            <p className="text-grey-light text-sm leading-relaxed">
              Our properties are equipped with 24/7 security, modern surveillance systems, and safe access protocols to ensure you and your family always feel secure.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="bg-[#d4af37]/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
              <Award className="text-[#d4af37]" size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">Premium Quality</h3>
            <p className="text-grey-light text-sm leading-relaxed">
              From the foundation to the finishing touches, we use only the highest quality materials and partner with expert architects to build structures that last generations.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="bg-[#d4af37]/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
              <HeartHandshake className="text-[#d4af37]" size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">Tenant-First Approach</h3>
            <p className="text-grey-light text-sm leading-relaxed">
              We believe in treating our tenants like family. Our dedicated maintenance team is always on standby to resolve issues quickly and efficiently.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
