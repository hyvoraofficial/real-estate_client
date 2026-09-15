import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building2, Layers, Filter } from 'lucide-react';
import { fetchProperties } from '../services/api';
import { Property, PropertyFilterParams } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyFilter } from '../components/PropertyFilter';

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL query parameters
  const [filters, setFilters] = useState<PropertyFilterParams>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'all',
    status: searchParams.get('status') || 'all',
    sort: searchParams.get('sort') || 'newest',
  });

  const loadPropertiesData = async (params: PropertyFilterParams) => {
    try {
      setLoading(true);
      const data = await fetchProperties(params);
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPropertiesData(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: PropertyFilterParams) => {
    setFilters(newFilters);
    const p = new URLSearchParams();
    if (newFilters.search) p.set('search', newFilters.search);
    if (newFilters.category && newFilters.category !== 'all') p.set('category', newFilters.category);
    if (newFilters.status && newFilters.status !== 'all') p.set('status', newFilters.status);
    if (newFilters.sort && newFilters.sort !== 'newest') p.set('sort', newFilters.sort);
    setSearchParams(p);
  };

  const handleResetFilters = () => {
    const defaultF: PropertyFilterParams = {
      search: '',
      category: 'all',
      status: 'all',
      sort: 'newest',
    };
    setFilters(defaultF);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2E060D] via-[#4A0E17] to-[#6B0F1A] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-gold-500/20">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Portfolio Catalogue
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
            Available Properties & Assets
          </h1>
          <p className="text-xs sm:text-sm text-ivory-200 leading-relaxed opacity-90">
            Browse our verified inventory of entire commercial buildings, residential complexes, prime corner sites, and extensive development land parcels.
          </p>
        </div>
      </div>

      {/* Advanced Filter Console */}
      <PropertyFilter
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Results Header & Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
          <h2 className="text-xl font-serif font-bold text-charcoal-900">
            Showing {properties.length} Properties
          </h2>
          <span className="text-xs text-charcoal-500">
            Real-time verified listings
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 bg-ivory-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-ivory-300 p-16 text-center space-y-4 max-w-md mx-auto">
            <Building2 className="w-12 h-12 text-charcoal-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-charcoal-900">
              No matching properties found
            </h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Try adjusting your search criteria or resetting filters to explore all available real estate assets.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-5 py-2.5 bg-[#6B0F1A] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#800020]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
