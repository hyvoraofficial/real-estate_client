import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Building, Trees, Briefcase, MapPin, Layers } from 'lucide-react';
import { PropertyFilterParams } from '../types';

interface PropertyFilterProps {
  filters: PropertyFilterParams;
  onChange: (newFilters: PropertyFilterParams) => void;
  onReset: () => void;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const categories = [
    { id: 'all', label: 'All Categories', icon: Layers },
    { id: 'buildings', label: 'Entire Buildings', icon: Building },
    { id: 'commercial', label: 'Commercial Hubs', icon: Briefcase },
    { id: 'sites', label: 'Sites & Plots', icon: MapPin },
    { id: 'land', label: 'Development Land', icon: Trees },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-luxury border border-ivory-300 space-y-5">
      {/* Search Input Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search by location (e.g. Bangalore, Koramangala), title, or asset type..."
            className="w-full pl-10 pr-4 py-3 bg-ivory-50 border border-ivory-300 rounded-2xl text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-[#6B0F1A] focus:bg-white transition-all placeholder:text-charcoal-400"
          />
        </div>

        {/* Status Dropdown */}
        <div className="md:col-span-3">
          <select
            value={filters.status || 'all'}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="w-full px-3.5 py-3 bg-ivory-50 border border-ivory-300 rounded-2xl text-xs sm:text-sm text-charcoal-800 font-medium focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none cursor-pointer"
          >
            <option value="all">⚡ All Statuses</option>
            <option value="available">🟢 Available Only</option>
            <option value="under_negotiation">🟡 Under Negotiation</option>
            <option value="sold">🔴 Sold / Completed</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-3">
          <select
            value={filters.sort || 'newest'}
            onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            className="w-full px-3.5 py-3 bg-ivory-50 border border-ivory-300 rounded-2xl text-xs sm:text-sm text-charcoal-800 font-medium focus:ring-2 focus:ring-[#6B0F1A] focus:outline-none cursor-pointer"
          >
            <option value="newest">🗓️ Sort: Newest Listed</option>
            <option value="price_asc">💰 Price: Low to High</option>
            <option value="price_desc">💎 Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center justify-between pt-2 border-t border-ivory-200">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B0F1A] mr-2 flex items-center">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1 text-[#C5A059]" /> Category:
          </span>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = (filters.category || 'all') === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onChange({ ...filters, category: cat.id })}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#6B0F1A] text-white shadow-md'
                    : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-gold-400' : 'text-charcoal-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {(filters.search || filters.category !== 'all' || filters.status !== 'all') && (
          <button
            onClick={onReset}
            className="text-xs text-[#6B0F1A] hover:underline font-semibold whitespace-nowrap pl-4"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
