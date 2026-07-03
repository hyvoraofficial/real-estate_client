import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectGroupCard } from '../components/ProjectGroupCard';
import type { ProjectGroup } from '../components/ProjectGroupCard';
import { propertyService } from '../services/property.service';
import type { Property } from '../types';
import { Loading } from '../components/Loading';
import { SEO } from '../components/SEO';

const SEO_CONFIGS: Record<string, { title: string, h1: string, description: string, typeFilter: string[], keywords: string }> = {
  '/flats-for-rent-whitefield': {
    title: 'Flats for Rent in Whitefield, Bangalore | SK Buildings',
    h1: 'Flats for Rent in Whitefield',
    description: 'Find the best residential flats for rent in Whitefield, Bangalore. Premium amenities, 24/7 security, and family-friendly environments by SK Buildings.',
    typeFilter: ['flat'],
    keywords: 'flats, rent, whitefield, bangalore, residential'
  },
  '/1bhk-whitefield': {
    title: '1 BHK Flats for Rent in Whitefield | SK Buildings',
    h1: '1 BHK Flats in Whitefield',
    description: 'Looking for a 1 BHK flat in Whitefield? Explore affordable and premium 1 BHK rental properties with modern amenities by SK Buildings.',
    typeFilter: ['flat'],
    keywords: '1 bhk, rent, whitefield, flat, apartment'
  },
  '/commercial-shops-whitefield': {
    title: 'Commercial Shops for Rent in Whitefield | SK Buildings',
    h1: 'Commercial Shops in Whitefield',
    description: 'Prime commercial shops and office spaces for rent in Whitefield. High footfall areas perfect for your growing business.',
    typeFilter: ['shop'],
    keywords: 'commercial shops, rent, whitefield, office space, retail'
  },
  '/rental-properties-bangalore': {
    title: 'Rental Properties in Bangalore | SK Buildings',
    h1: 'Rental Properties in Bangalore',
    description: 'Discover top rental properties in Bangalore. Choose from premium residential flats and commercial spaces managed by SK Buildings.',
    typeFilter: ['flat', 'shop'],
    keywords: 'rental properties, bangalore, flats, shops, real estate'
  }
};

export const SEOLandingPage: React.FC = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback to a default config if route is somehow unmatched
  const config = SEO_CONFIGS[location.pathname] || {
    title: 'Properties for Rent | SK Buildings',
    h1: 'Properties for Rent',
    description: 'Explore premium residential and commercial properties for rent by SK Buildings.',
    typeFilter: ['flat', 'shop'],
    keywords: 'properties, rent'
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const data = await propertyService.getProperties();
        // Filter properties based on the SEO config's type
        const filtered = data.filter(p => config.typeFilter.includes(p.type));
        
        // For '1bhk', we could ideally filter by bedrooms === 1 if that data existed reliably,
        // but for now, we'll just show the flats. In a real scenario, we'd add a bedroom filter here.
        if (location.pathname === '/1bhk-whitefield') {
          setProperties(filtered.filter(p => p.bedrooms === 1 || p.title.toLowerCase().includes('1 bhk') || p.title.toLowerCase().includes('1bhk')));
        } else {
          setProperties(filtered);
        }
      } catch (error) {
        console.error('Failed to load properties for SEO landing page');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [location.pathname]);

  // Group by project and type
  const projectGroups = React.useMemo(() => {
    const groupsMap = new Map<string, ProjectGroup>();

    properties.forEach((property) => {
      let subType = '';
      if (property.type === 'flat' && property.unit_type) subType = property.unit_type;
      else if (property.type === 'shop' && property.area) subType = `${property.area}sqft`;
      
      const key = `${property.projectName}-${property.type}-${subType}`;
      
      // Determine dynamic prices if they exist
      let propMin = property.price;
      let propMax = property.price;
      const rules = property?.project?.pricing_rules;
      if (rules) {
        let prices: number[] = [];
        if (property.type === 'shop' && rules.shop) {
          prices = Object.values(rules.shop).map(Number);
        } else if (property.type === 'flat' && rules.flat) {
          // Aggregate all prices across all unit types for the project group
          Object.values(rules.flat).forEach((unitRules: any) => {
            prices.push(...Object.values(unitRules).map(Number));
          });
        }
        if (prices.length > 0) {
          propMin = Math.min(...prices);
          propMax = Math.max(...prices);
        }
      }

      if (!groupsMap.has(key)) {
        groupsMap.set(key, {
          id: key,
          projectName: property.projectName,
          type: property.type as 'flat' | 'shop' | 'office',
          image: property.images?.[0] || property.project?.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
          location: property.location ? `${property.location.address}, ${property.location.city}` : undefined,
          map_lat: property.project?.map_lat,
          map_lng: property.project?.map_lng,
          unitType: property.type === 'flat' ? (property.unit_type || undefined) : undefined,
          sizeSqFt: property.type === 'shop' ? (property.area || undefined) : undefined,
          count: 0,
          availableCount: 0,
          minPrice: propMin,
          maxPrice: propMax,
          createdAt: property.createdAt || '',
        });
      }

      const group = groupsMap.get(key)!;
      group.count += 1;
      if (property.status === 'available') {
        group.availableCount += 1;
      }

      if (propMin < group.minPrice) group.minPrice = propMin;
      if (propMax > group.maxPrice) group.maxPrice = propMax;
      
      if (!group.image && property.images && property.images.length > 0) {
        group.image = property.images[0];
      }

      if (property.createdAt && group.createdAt && property.createdAt > group.createdAt) {
        group.createdAt = property.createdAt;
      }
    });

    return Array.from(groupsMap.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }, [properties]);

  return (
    <>
      <SEO 
        title={config.title}
        description={config.description}
        url={`https://skbuildings.in${location.pathname}`}
      />
      <div className="min-h-screen bg-dark pt-12 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center mb-12 space-y-4">
             <h1 className="text-3xl md:text-5xl font-bold text-[#d4af37] font-serif">{config.h1}</h1>
            <p className="text-grey-light text-lg max-w-2xl mx-auto">
              {config.description}
            </p>
          </div>

          {isLoading ? (
            <Loading />
          ) : projectGroups.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {projectGroups.map((group) => (
                <ProjectGroupCard key={`${group.projectName}-${group.type}`} group={group} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-dark-lighter rounded-2xl border border-grey-dark">
              <h3 className="text-2xl font-bold text-white mb-2">No Properties Found</h3>
              <p className="text-grey-light">We currently don't have available properties matching this criteria.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
};
