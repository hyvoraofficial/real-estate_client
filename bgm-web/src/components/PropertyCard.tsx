import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize2, Layers, TrendingUp, Building, Trees, ArrowRight, ShieldCheck } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const isAvailable = property.status === 'available';
  const isUnderNegotiation = property.status === 'under_negotiation';
  const isSold = property.status === 'sold';

  const coverImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';

  // Category Badge Label
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'buildings': return 'Entire Building';
      case 'commercial': return 'Commercial Asset';
      case 'sites': return 'Site / Plot';
      case 'land': return 'Development Land';
      default: return 'Real Estate Asset';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'buildings': return <Building className="w-3.5 h-3.5" />;
      case 'land': return <Trees className="w-3.5 h-3.5" />;
      default: return <Building className="w-3.5 h-3.5" />;
    }
  };

  // Status Badge
  const getStatusBadge = () => {
    if (isAvailable) {
      return (
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-sm backdrop-blur-md">
          Available
        </span>
      );
    }
    if (isUnderNegotiation) {
      return (
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white shadow-sm backdrop-blur-md">
          Under Negotiation
        </span>
      );
    }
    if (isSold) {
      return (
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#6B0F1A] text-white shadow-sm backdrop-blur-md">
          Sold
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm backdrop-blur-md">
        Coming Soon
      </span>
    );
  };

  // Price Display
  const renderPrice = () => {
    if (property.price_type === 'price_on_request') {
      return <span className="text-lg font-serif font-bold text-[#6B0F1A]">Price on Request</span>;
    }
    return (
      <div>
        <span className="text-xl sm:text-2xl font-serif font-bold text-[#6B0F1A]">
          {property.price_display || `₹${(property.price / 10000000).toFixed(2)} Cr`}
        </span>
        {property.price_type === 'negotiable' && (
          <span className="ml-2 text-[11px] text-[#C5A059] font-bold uppercase tracking-wider">
            (Negotiable)
          </span>
        )}
      </div>
    );
  };

  const propertyUrl = property.slug ? `/properties/${property.slug}` : `/properties/${property.id}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-ivory-300 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col transform hover:-translate-y-1">
      {/* Image & Badges */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-900">
        <img
          src={coverImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2E060D]/90 text-white border border-[#C5A059]/40 backdrop-blur-md flex items-center space-x-1.5 shadow-sm">
            {getCategoryIcon(property.category)}
            <span>{getCategoryLabel(property.category)}</span>
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C5A059] text-[#2E060D] shadow-sm">
              Featured
            </span>
          )}
        </div>

        <div className="absolute top-3.5 right-3.5">
          {getStatusBadge()}
        </div>

        {/* Location badge on bottom left of image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center text-xs font-medium drop-shadow-md">
          <MapPin className="w-3.5 h-3.5 mr-1 text-gold-400 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-charcoal-900 group-hover:text-[#6B0F1A] transition-colors line-clamp-2 leading-snug">
            {property.title}
          </h3>

          <p className="mt-2 text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* Key Metric Specs */}
          <div className="mt-4 grid grid-cols-2 gap-2 py-3 border-y border-ivory-200 text-xs text-charcoal-700 bg-ivory-50/70 rounded-xl px-3">
            {property.built_up_area && (
              <div className="flex items-center space-x-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="truncate">Built-up: <strong className="text-charcoal-900">{property.built_up_area}</strong></span>
              </div>
            )}
            {property.plot_area && (
              <div className="flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="truncate">Plot: <strong className="text-charcoal-900">{property.plot_area}</strong></span>
              </div>
            )}
            {property.category_details?.total_floors && (
              <div className="flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5 text-[#6B0F1A]" />
                <span>Floors: <strong className="text-charcoal-900">{property.category_details.total_floors}</strong></span>
              </div>
            )}
            {property.category_details?.expected_roi_percent && (
              <div className="flex items-center space-x-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>ROI: <strong className="text-emerald-700">{property.category_details.expected_roi_percent}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 flex items-center justify-between border-t border-ivory-200">
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal-500 block">
              Asset Value
            </span>
            {renderPrice()}
          </div>

          <Link
            to={propertyUrl}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#6B0F1A] text-white hover:bg-[#800020] shadow-md transition-all group-hover:scale-105"
          >
            <span>View Asset</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
