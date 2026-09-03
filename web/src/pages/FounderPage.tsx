import React, { useState, useEffect } from 'react';
import { founderService } from '../services/founder.service';
import type { Founder } from '../types';
import { SEO } from '../components/SEO';
import { Users, Linkedin, Mail, Phone } from 'lucide-react';

export const FounderPage: React.FC = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const data = await founderService.getFounders();
        setFounders(data);
      } catch (error) {
        console.error('Failed to load founders', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFounders();
  }, []);


  // Display the management profile, or fallback to default
  const mainFounder = founders[0] || {
    name: "Property Administrator",
    role: "HYVORA Operations & Portfolio Management",
    qualification: "With extensive hands-on expertise in automated property management, tenant workflows, and digital operations, our administration team delivers sustainable, reliable, and scalable living spaces backed by HYVORA technology.",
    image_url: ""
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": mainFounder.name,
    "jobTitle": mainFounder.role,
    "worksFor": {
      "@type": "Organization",
      "name": "HYVORA Property Management"
    },
    "description": mainFounder.qualification || "",
    "image": mainFounder.image_url || "https://hyvorademo.in/logo.png",
    "url": "https://hyvorademo.in/founder"
  };

  return (
    <>
      <SEO
        title={`${mainFounder.name} - ${mainFounder.role} | HYVORA Property Management`}
        description={mainFounder.qualification || `Meet the leadership and administration team behind HYVORA Property Management.`}
        schema={personSchema}
        url="https://hyvorademo.in/founder"
      />
      <div className="min-h-screen bg-dark py-12 md:py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[#d4af37] font-serif">Management & Operations</h1>
            <p className="text-grey-light text-lg">The administration and operational team behind <span className="brand-text">HYVORA Property Management</span>.</p>
          </div>

          {isLoading ? (
            <div className="bg-gradient-to-br from-dark-lighter to-dark p-6 md:p-12 rounded-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-6 md:gap-12 items-start shadow-2xl relative overflow-hidden animate-pulse">
              <div className="w-full md:w-1/3 flex flex-col items-center space-y-6">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-200" />
                <div className="h-10 bg-slate-200 rounded w-1/2" />
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <div className="h-8 bg-slate-200 rounded w-3/4" />
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-24 bg-slate-200 rounded w-full" />
                <div className="h-6 bg-slate-200 rounded w-1/2" />
                <div className="h-16 bg-slate-200 rounded w-full" />
              </div>
            </div>
          ) : founders.length === 0 ? (
            <div className="bg-gradient-to-br from-dark-lighter to-dark p-6 md:p-12 rounded-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-6 md:gap-12 items-start shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

              <div className="w-full md:w-1/3 flex flex-col items-center space-y-6 z-10">
                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                    <Users size={64} className="text-grey-light" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="https://hyvora.in" target="_blank" rel="noopener noreferrer" className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors" title="HYVORA Official">
                    <Linkedin size={24} />
                  </a>
                  <a href="mailto:hyvora.official@gmail.com" className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors" title="Contact Email">
                    <Mail size={24} />
                  </a>
                  <a href="tel:8217512581" className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors" title="Contact Support">
                    <Phone size={24} />
                  </a>
                </div>
              </div>

              <div className="w-full md:w-2/3 space-y-6 z-10">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white font-serif mb-2">{mainFounder.name}</h2>
                  <p className="text-[#d4af37] font-semibold tracking-wider uppercase text-lg">{mainFounder.role}</p>
                </div>

                <div className="bg-dark/50 p-6 rounded-xl border-l-4 border-[#d4af37]">
                  <p className="text-grey-light italic leading-relaxed text-lg">
                    "Our mission has always been to build more than just four walls. We strive to create environments that inspire, protect, and nurture the families and businesses that reside within them. Trust is the foundation of every brick we lay."
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Biography & Experience</h3>
                  <p className="text-grey-light leading-relaxed whitespace-pre-wrap text-lg">
                    {mainFounder.qualification}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            founders.map((founder) => (
              <div 
                key={founder.id} 
                className={`bg-gradient-to-br from-dark-lighter to-dark p-6 md:p-12 rounded-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-6 md:gap-12 shadow-2xl relative overflow-hidden ${
                  founder.qualification ? 'items-start' : 'items-center'
                }`}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                <div className="w-full md:w-1/3 flex flex-col items-center space-y-6 z-10">
                  <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    {founder.image_url ? (
                      <img 
                        src={founder.image_url} 
                        alt={founder.name} 
                        loading="eager" 
                        fetchPriority="high"
                        width={256}
                        height={256}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                        <Users size={64} className="text-grey-light" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-2/3 space-y-6 z-10">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white font-serif mb-2">{founder.name}</h2>
                    <p className="text-[#d4af37] font-semibold tracking-wider uppercase text-lg">{founder.role}</p>
                  </div>

                  {founder.qualification && (
                    <>
                      <div className="bg-dark/50 p-6 rounded-xl border-l-4 border-[#d4af37]">
                        <p className="text-grey-light italic leading-relaxed text-lg">
                          "Our mission has always been to build more than just four walls. We strive to create environments that inspire, protect, and nurture the families and businesses that reside within them. Trust is the foundation of every brick we lay."
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Biography & Experience</h3>
                        <p className="text-grey-light leading-relaxed whitespace-pre-wrap text-lg">
                          {founder.qualification}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
