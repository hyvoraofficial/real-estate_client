import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Building, Briefcase, MapPin, Trees, ArrowLeft } from 'lucide-react';
import { fetchProperties } from '../services/api';
import { Property, PropertyCategory } from '../types';
import { PropertyCard } from '../components/PropertyCard';

interface CategoryMeta {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
}

const categoryMetaMap: Record<string, CategoryMeta> = {
  buildings: {
    title: "Entire Commercial & Residential Buildings",
    subtitle: "High-Yield Standalone Towers & Apartment Complexes",
    description: "Explore whole buildings for sale across Bangalore and Karnataka. Featuring G+3 to G+8 corporate towers with active rental yields, grade-A corporate leases, and prime boutique residential blocks.",
    icon: Building,
  },
  commercial: {
    title: "Commercial Properties & Retail Hubs",
    subtitle: "Showrooms, Office Spaces & Corporate Plazas",
    description: "High-street retail showrooms, commercial office floor plates, and shopping complexes situated in prime business hubs with exceptional footfall.",
    icon: Briefcase,
  },
  sites: {
    title: "Sites & Layout Plots",
    subtitle: "BDA Approved & Clear Title Corner Plots",
    description: "Premium residential and commercial plots, corner sites on double roads, and gated community parcels with immediate registration eligibility.",
    icon: MapPin,
  },
  land: {
    title: "Development Land & Industrial Acreage",
    subtitle: "National Highway Frontage & Expansive Parcels",
    description: "Commercial and industrial converted acreage, highway development land, and large parcels suitable for logistics hubs, factories, or master layout developments.",
    icon: Trees,
  },
};

export const CategoryPropertiesPage: React.FC = () => {
  const params = useParams<{ category?: string }>();
  const location = useLocation();

  // Extract category from route parameter or pathname (e.g. /properties/buildings -> 'buildings')
  const rawCategory = params.category || location.pathname.split('/').filter(Boolean).pop() || 'buildings';
  const category = rawCategory.toLowerCase();
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const meta = categoryMetaMap[category] || {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Real Estate Assets`,
    subtitle: "Curated High-Value Assets",
    description: "Explore our verified collection of properties.",
    icon: Building,
  };

  const Icon = meta.icon;

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties({ category });
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading category properties:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCategoryData();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link
        to="/properties"
        className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-[#6B0F1A] hover:text-[#800020]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Categories</span>
      </Link>

      {/* Category Banner */}
      <div className="bg-gradient-to-r from-[#2E060D] via-[#4A0E17] to-[#6B0F1A] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-gold-500/30">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-[10px] font-bold uppercase tracking-wider">
            <Icon className="w-3.5 h-3.5" />
            <span>{meta.subtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
            {meta.title}
          </h1>

          <p className="text-xs sm:text-sm text-ivory-200 leading-relaxed opacity-90">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
          <h2 className="text-xl font-serif font-bold text-charcoal-900">
            Available Assets in this Category ({properties.length})
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-ivory-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-ivory-300 p-16 text-center space-y-3">
            <Building className="w-12 h-12 text-charcoal-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-charcoal-900">
              No listings currently in this category
            </h3>
            <p className="text-xs text-charcoal-500">
              New assets are added on a weekly basis. Contact our corporate advisory team for off-market inventory.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-2 px-5 py-2.5 bg-[#6B0F1A] text-white text-xs font-bold rounded-xl shadow-md"
            >
              Enquire on Off-Market Assets
            </Link>
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
