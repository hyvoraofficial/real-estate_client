import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/property.service';
import type { Property } from '../types';
import { ArrowLeft, Building2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import toast from 'react-hot-toast';

export const ProjectPropertiesPage: React.FC = () => {
  const { projectName, type } = useParams<{ projectName: string; type: string }>();
  const navigate = useNavigate();
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjectProperties();
  }, [projectName, type]);

  const fetchProjectProperties = async () => {
    setIsLoading(true);
    try {
      const allProperties = await propertyService.getProperties();
      
      const filtered = allProperties.filter(
        (p) => p.projectName === projectName && 
               p.type === type && 
               (p.status === 'available' || p.status === 'booked')
      );
      
      setProperties(filtered);
    } catch (error) {
      toast.error('Failed to load project properties');
    } finally {
      setIsLoading(false);
    }
  };


  const titleType = type === 'flat' ? 'Flats' : type === 'shop' ? 'Shops' : 'Offices';

  return (
    <>
      <SEO 
        title={`${projectName} - ${titleType} | SK Buildings`}
        description={`Explore available ${titleType.toLowerCase()} at ${projectName} by SK Buildings.`}
        url={`https://skbuildings.in/projects/${encodeURIComponent(projectName || '')}/${encodeURIComponent(type || '')}`}
      />
      <div className="min-h-screen bg-dark">
        <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-6 md:mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-400 hover:text-primary transition-colors mb-4 group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>
          
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {projectName} <span className="text-primary font-normal">| {titleType}</span>
          </h1>
          <p className="text-slate-500">
            {isLoading ? "Loading units..." : `Showing ${properties.length} available and booked units in this project.`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-[350px] sm:h-[400px] md:h-[470px]">
                {/* Image Placeholder */}
                <div className="relative h-32 sm:h-44 md:h-56 bg-slate-200 animate-pulse" />
                {/* Content Placeholder */}
                <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-full mb-3 animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-1/2 mb-4 animate-pulse" />
                    <div className="h-8 bg-slate-200 rounded w-full mb-4 animate-pulse" />
                  </div>
                  <div className="h-12 bg-slate-200 rounded w-full mt-auto animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-100">
            <Building2 size={64} className="mx-auto text-slate-300 mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No Units Found</h3>
            <p className="text-slate-500 text-lg">
              We couldn't find any {type} units for {projectName}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} loadingPriority={index < 4 ? "eager" : "lazy"} />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};
