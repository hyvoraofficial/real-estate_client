import React, { useState, useEffect } from 'react';
import { founderService } from '../services/founder.service';
import type { Founder } from '../types';
import { SEO } from '../components/SEO';
import { Users, Linkedin, Mail, Phone } from 'lucide-react';
import { Loading } from '../components/Loading';

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

  if (isLoading) return <Loading fullScreen />;

  // Display the first founder as the main founder for SEO, or fallback to default
  const mainFounder = founders[0] || {
    name: "Sunil Kumar",
    role: "Founder & Chairman",
    qualification: "With over 18 years of hands-on experience in real estate development and property management since founding SK Buildings in 2008, Sunil Kumar has led the company from a single-property investment to a prominent real estate portfolio. His visionary approach focuses on sustainable development and tenant-first policies.",
    image_url: ""
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": mainFounder.name,
    "jobTitle": mainFounder.role,
    "worksFor": {
      "@type": "Organization",
      "name": "SK Buildings"
    },
    "description": mainFounder.qualification || "",
    "image": mainFounder.image_url || "https://skbuildings.in/logo.png",
    "url": "https://skbuildings.in/founder"
  };

  return (
    <>
      <SEO 
        title={`${mainFounder.name} - ${mainFounder.role} | SK Buildings`} 
        description={mainFounder.qualification || `Meet ${mainFounder.name}, the ${mainFounder.role} of SK Buildings.`}
        schema={personSchema}
        url="https://skbuildings.in/founder"
      />
      <div className="min-h-screen bg-dark py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] font-serif">Meet Our Founder</h1>
            <p className="text-grey-light text-lg">The vision and leadership behind SK Buildings.</p>
          </div>

          <div className="bg-gradient-to-br from-dark-lighter to-dark p-8 md:p-12 rounded-2xl border border-[#d4af37]/30 flex flex-col md:flex-row gap-12 items-start shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            
            <div className="w-full md:w-1/3 flex flex-col items-center space-y-6 z-10">
              <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                {mainFounder.image_url ? (
                  <img src={mainFounder.image_url} alt={mainFounder.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                    <Users size={64} className="text-grey-light" />
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <a href={mainFounder.linkedin_url || "#"} target="_blank" rel="noopener noreferrer" className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:info@skbuildings.in" className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">
                  <Mail size={24} />
                </a>
                <a href="tel:+919110443387" className="bg-[#d4af37]/10 p-3 rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">
                  <Phone size={24} />
                </a>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-6 z-10">
              <div>
                <h2 className="text-4xl font-bold text-white font-serif mb-2">{mainFounder.name}</h2>
                <p className="text-[#d4af37] font-semibold tracking-wider uppercase text-lg">{mainFounder.role}</p>
              </div>
              
              <div className="bg-dark/50 p-6 rounded-xl border-l-4 border-[#d4af37]">
                <p className="text-grey-light italic leading-relaxed text-lg">
                  "Our mission has always been to build more than just four walls. We strive to create environments that inspire, protect, and nurture the families and businesses that reside within them. Trust is the foundation of every brick we lay."
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Biography & Experience</h3>
                <p className="text-grey-light leading-relaxed whitespace-pre-wrap text-lg">
                  {mainFounder.qualification}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
