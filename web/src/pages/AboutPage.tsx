import React, { useState, useEffect } from 'react';
import { Building2, Home, Users, Clock, Target, Eye, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { Card } from '../components/Card';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { founderService } from '../services/founder.service';
import type { Founder } from '../types';
import { SEO } from '../components/SEO';

export const AboutPage: React.FC = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const data = await founderService.getFounders();
        setFounders(data);
      } catch (error) {
        console.error("Failed to load founders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFounders();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .commanding-calm-font {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
      `}} />
      <SEO 
        title="About HYVORA Property Management | Smart Real Estate Platform" 
        description="Learn about HYVORA Property Management, our mission, vision, and technology-driven approach to modern property and tenant management."
        url="https://hyvorademo.in/about"
      />
      <div className="min-h-screen bg-dark py-8 md:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 md:space-y-24">
        
        {/* 1. About Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-[#d4af37] commanding-calm-font">About <span className="brand-text text-[#d4af37]">HYVORA Property Management</span></h1>
          <p className="text-grey-light max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Empowering real-estate businesses, property managers, and tenants with smart automation, transparent operations, and seamless digital property management.
          </p>
        </div>

        {/* 2. Our Story */}
        <section className="bg-dark-lighter p-6 md:p-12 rounded-2xl border border-[#d4af37]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 commanding-calm-font">Our Story</h2>
          <div className="space-y-4 text-grey-light leading-relaxed text-sm md:text-base">
            <p>
              <span className="brand-text text-white text-sm">HYVORA Property Management</span> began with a powerful vision: to revolutionize real estate operations through automation, modern UI/UX, and transparent property management. Built under the HYVORA philosophy of "Build. Automate. Conquer.", our platform unifies landlords, facility managers, and tenants into one connected ecosystem.
            </p>
            <p>
              Over the years, we have continuously evolved, pairing architectural excellence with robust SaaS workflows—covering online rent collection, automated maintenance tracking, document storage, and multi-property oversight.
            </p>
          </div>
        </section>

        {/* 3. Statistics */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-dark-lighter p-4 md:p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
              <Building2 className="mx-auto text-[#d4af37] mb-3 md:mb-4 group-hover:scale-110 transition-transform w-8 h-8 md:w-10 md:h-10" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                <AnimatedCounter end={10} suffix="+" />
              </h3>
              <p className="text-grey-light text-[10px] md:text-sm font-semibold tracking-wider uppercase">Projects</p>
            </div>
            <div className="bg-dark-lighter p-4 md:p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
              <Home className="mx-auto text-[#d4af37] mb-3 md:mb-4 group-hover:scale-110 transition-transform w-8 h-8 md:w-10 md:h-10" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                <AnimatedCounter end={125} suffix="+" />
              </h3>
              <p className="text-grey-light text-[10px] md:text-sm font-semibold tracking-wider uppercase">Properties</p>
            </div>
            <div className="bg-dark-lighter p-4 md:p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
              <Users className="mx-auto text-[#d4af37] mb-3 md:mb-4 group-hover:scale-110 transition-transform w-8 h-8 md:w-10 md:h-10" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                <AnimatedCounter end={1000} suffix="+" />
              </h3>
              <p className="text-grey-light text-[10px] md:text-sm font-semibold tracking-wider uppercase">Tenants</p>
            </div>
            <div className="bg-dark-lighter p-4 md:p-6 rounded-2xl text-center border border-grey-dark hover:border-[#d4af37]/50 transition-colors group">
              <Clock className="mx-auto text-[#d4af37] mb-3 md:mb-4 group-hover:scale-110 transition-transform w-8 h-8 md:w-10 md:h-10" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                <AnimatedCounter end={18} suffix="+" />
              </h3>
              <p className="text-grey-light text-[10px] md:text-sm font-semibold tracking-wider uppercase">Years of Experience</p>
            </div>
          </div>
        </section>

        {/* 4. Founder Section */}
        {isLoading ? (
          <div className="bg-gradient-to-br from-dark-lighter to-dark p-6 md:p-12 rounded-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-6 md:gap-12 items-center animate-pulse">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto md:mx-0" />
              <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto md:mx-0" />
              <div className="h-20 bg-slate-200 rounded w-full" />
            </div>
          </div>
        ) : founders.length > 0 ? (
          <div className="space-y-6 md:space-y-12">
            {founders.map((founder, index) => (
              <section key={founder.id || index} className="bg-gradient-to-br from-dark-lighter to-dark p-6 md:p-12 rounded-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-6 md:gap-12 items-center">
                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  {founder.image_url ? (
                    <img 
                      src={founder.image_url} 
                      alt={founder.name} 
                      loading="lazy"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                      <Users className="text-grey-light w-16 h-16 md:w-20 md:h-20" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white commanding-calm-font">{founder.name}</h2>
                  <p className="text-[#d4af37] font-semibold tracking-wider uppercase text-xs md:text-sm">{founder.role || 'Founder'}</p>
                  
                  {founder.qualification && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Experience & Bio</h4>
                      <p className="text-grey-light text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                        {founder.qualification}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="bg-gradient-to-br from-dark-lighter to-dark p-6 md:p-12 rounded-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                <Users className="text-grey-light w-16 h-16 md:w-20 md:h-20" />
              </div>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white commanding-calm-font">Property Administrator</h2>
              <p className="text-[#d4af37] font-semibold tracking-wider uppercase text-xs md:text-sm">HYVORA Operations & Portfolio Management</p>
              
              <div className="bg-dark/50 p-4 md:p-6 rounded-xl border-l-4 border-[#d4af37] my-4 md:my-6 text-left">
                <p className="text-grey-light italic leading-relaxed text-sm md:text-base">
                  "Our mission is to combine cutting-edge technology with tenant-first care. We simplify property administration so communities and property managers can operate with effortless efficiency and absolute peace of mind."
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Experience & Vision</h4>
                <p className="text-grey-light text-xs md:text-sm leading-relaxed">
                  "With extensive hands-on expertise in automated property management, tenant workflows, and digital operations, our administration team delivers sustainable, reliable, and scalable living spaces backed by HYVORA technology."
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 5 & 6. Vision and Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Card className="bg-dark-lighter border-t-4 border-t-[#d4af37] hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#d4af37]/10 p-3 rounded-xl">
                <Eye className="text-[#d4af37] w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white commanding-calm-font">Our Vision</h2>
            </div>
            <p className="text-grey-light text-sm md:text-base leading-relaxed">
              To be the premier property management platform recognized for automating operations, fostering vibrant resident communities, and providing unmatched transparency for real-estate portfolios.
            </p>
          </Card>

          <Card className="bg-dark-lighter border-t-4 border-t-[#d4af37] hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#d4af37]/10 p-3 rounded-xl">
                <Target className="text-[#d4af37] w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white commanding-calm-font">Our Mission</h2>
            </div>
            <p className="text-grey-light text-sm md:text-base leading-relaxed">
              To deliver exceptional property management services through automated rent tracking, proactive maintenance, architectural excellence, and tenant-first customer support.
            </p>
          </Card>
        </section>

        {/* 7. Why Choose HYVORA Property Management */}
        <section className="space-y-8 md:space-y-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4 commanding-calm-font">Why Choose <span className="brand-text text-white">HYVORA Property Management</span>?</h2>
            <p className="text-grey-light text-sm md:text-base max-w-2xl mx-auto">
              We don't just rent out spaces; we provide complete peace of mind. Here is what sets us apart from the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="bg-[#d4af37]/10 w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center">
                <ShieldCheck className="text-[#d4af37] w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Uncompromised Security</h3>
              <p className="text-grey-light text-xs md:text-sm leading-relaxed">
                Our properties are equipped with 24/7 security, modern surveillance systems, and safe access protocols to ensure you and your family always feel secure.
              </p>
            </div>
            
            <div className="text-center space-y-3 md:space-y-4">
              <div className="bg-[#d4af37]/10 w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center">
                <Award className="text-[#d4af37] w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Premium Quality</h3>
              <p className="text-grey-light text-xs md:text-sm leading-relaxed">
                From the foundation to the finishing touches, we use only the highest quality materials and partner with expert architects to build structures that last generations.
              </p>
            </div>

            <div className="text-center space-y-3 md:space-y-4">
              <div className="bg-[#d4af37]/10 w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center">
                <HeartHandshake className="text-[#d4af37] w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Tenant-First Approach</h3>
              <p className="text-grey-light text-xs md:text-sm leading-relaxed">
                We believe in treating our tenants like family. Our dedicated maintenance team is always on standby to resolve issues quickly and efficiently.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};
