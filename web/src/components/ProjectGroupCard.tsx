import React from 'react';
import { formatCurrency } from '../utils/helpers';
import { Building2, MapPin, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ProjectGroup {
  id: string;
  projectName: string;
  type: 'flat' | 'shop' | 'office';
  count: number;
  availableCount: number;
  minPrice: number;
  maxPrice: number;
  image?: string;
  location?: string;
  unitType?: string;
  sizeSqFt?: number;
  map_lat?: number;
  map_lng?: number;
  createdAt?: string;
}

interface ProjectGroupCardProps {
  group: ProjectGroup;
  loadingPriority?: 'eager' | 'lazy';
}

export const ProjectGroupCard: React.FC<ProjectGroupCardProps> = ({ group, loadingPriority = 'lazy' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${encodeURIComponent(group.projectName)}/${group.type}`);
  };

  return (
    <div 
      onClick={handleClick} 
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-32 sm:h-44 md:h-56 bg-slate-50 overflow-hidden">
        {group.image ? (
          <img
            src={group.image}
            alt={group.projectName}
            loading={loadingPriority}
            width={400}
            height={224}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <Building2 className="text-slate-300 w-12 h-12 md:w-16 md:h-16" />
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-primary text-white px-2 py-0.5 md:px-3 md:py-1 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-md">
          {group.type === 'flat' ? (group.unitType ? `Flat - ${group.unitType.toUpperCase()}` : 'Flats') : 
           group.type === 'shop' ? (group.sizeSqFt ? `Shop - ${group.sizeSqFt} sq.ft` : 'Shops') : 'Offices'}
        </div>
        
        {/* Availability Badge */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-2">
          {group.availableCount > 0 ? (
            <div className="bg-emerald-500 text-white px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-md self-start">
              {group.availableCount} Available
            </div>
          ) : (
            <div className="bg-rose-500 text-white px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-md self-start">
              Sold Out
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="text-base md:text-xl font-bold text-slate-900 mb-1 md:mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {group.projectName}
        </h3>
        
        {group.location && (
          <div 
            className="flex items-center text-slate-500 text-xs md:text-sm mb-3 md:mb-5 font-medium z-10 relative"
            onClick={(e) => {
              // Prevent triggering card click
              if (group.map_lat && group.map_lng) {
                e.stopPropagation();
              }
            }}
          >
            <MapPin className="mr-1 md:mr-1.5 text-primary w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
            {group.map_lat && group.map_lng ? (
              <a 
                href={`https://www.google.com/maps?q=${group.map_lat},${group.map_lng}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="line-clamp-1 hover:text-primary hover:underline"
              >
                {group.location}
              </a>
            ) : (
              <span className="line-clamp-1">{group.location}</span>
            )}
          </div>
        )}

        {/* Project Details */}
        <div className="flex items-center gap-4 text-slate-600 text-xs md:text-sm mb-3 md:mb-6 border-y border-slate-100 py-2 md:py-3">
          <div className="flex items-center bg-slate-50 px-2 py-1 rounded">
            <Layers className="mr-1 md:mr-1.5 text-slate-400 w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
            <span className="font-semibold">{group.count} <span className="text-[10px] md:text-xs text-slate-400 font-normal">Total Units</span></span>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-auto">
          <p className="text-slate-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5 md:mb-1">Price Range</p>
          <p className="text-primary text-sm sm:text-base md:text-xl font-bold leading-none">
            {group.minPrice === group.maxPrice 
              ? formatCurrency(group.minPrice)
              : `${formatCurrency(group.minPrice)} - ${formatCurrency(group.maxPrice)}`
            }
          </p>
        </div>
      </div>
    </div>
  );
};
