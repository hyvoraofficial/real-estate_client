export type PropertyCategory = 'buildings' | 'commercial' | 'residential' | 'sites' | 'land' | 'other';
export type PropertyStatus = 'available' | 'under_negotiation' | 'sold' | 'coming_soon';
export type PriceType = 'fixed' | 'negotiable' | 'price_on_request';
export type LeadStatus = 'new' | 'contacted' | 'interested' | 'follow_up' | 'closed';

export interface BuildingDetails {
  total_floors?: number;
  total_units?: number;
  parking_spaces?: number;
  rental_income_monthly?: string;
  expected_roi_percent?: string;
  occupancy_status?: string;
  year_built?: string;
  lift_available?: string;
  commercial_type?: string;
}

export interface SiteDetails {
  plot_dimensions?: string; // e.g. "60x40"
  corner_plot?: string; // "Yes" / "No"
  khata_type?: string; // e.g. "BDA A Khata", "E-Khata"
  approval_authority?: string;
  gated_community?: string;
}

export interface LandDetails {
  total_land_area?: string; // e.g. "8.5 Acres"
  land_type?: string; // e.g. "Commercial / Industrial Converted"
  road_access?: string; // e.g. "350 ft Highway Frontage"
  zoning_status?: string;
  water_source?: string;
  electricity_sanction?: string;
  conversion_status?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  category: PropertyCategory;
  property_type: string;
  description: string;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  price: number;
  price_display?: string;
  price_type: PriceType;
  status: PropertyStatus;
  featured: boolean;
  plot_area?: string;
  built_up_area?: string;
  carpet_area?: string;
  road_width?: string;
  facing?: string;
  property_age?: string;
  images: string[];
  category_details?: BuildingDetails & SiteDetails & LandDetails & Record<string, any>;
  amenities?: string[];
  documents?: { name: string; url: string }[];
  map_lat?: number;
  map_lng?: number;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  property_id?: string;
  property_title?: string;
  message?: string;
  status: LeadStatus;
  created_at?: string;
  updated_at?: string;
}

export interface WebsiteSettings {
  company_name: string;
  contact_person?: string;
  logo_url: string;
  phone: string;
  secondary_phone?: string;
  whatsapp: string;
  email: string;
  address: string;
  google_maps_url?: string;
  business_hours: string;
  hero_headline: string;
  hero_subheading: string;
  hero_image_url?: string;
  about_content?: string;
  mission?: string;
  vision?: string;
}

export interface PropertyFilterParams {
  category?: string;
  property_type?: string;
  min_price?: number | string;
  max_price?: number | string;
  status?: string;
  search?: string;
  sort?: string;
  featured?: boolean | string;
}
