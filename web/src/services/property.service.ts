import api from './api';
import type { CreatePropertyInput, Project, Property, PropertyFilters } from '../types';

type BackendProperty = {
  id: string;
  title: string;
  type: 'flat' | 'shop';
  unit_type?: '1rk' | '1bhk' | '2bhk' | '3bhk' | null;
  price: number;
  advance?: number;
  status?: 'available' | 'booked';
  floor?: number;
  size_sqft?: number;
  sizeSqFt?: number;
  description?: string;
  images?: string[];
  project?: {
    id: string;
    name?: string;
    location?: string;
    images?: string[];
  };
  tenant_name?: string;
  tenant_phone?: string;
  advance_paid_date?: string;
  advance_paid?: number;
  rent_paid?: number;
  tenant_aadhar_file?: string;
  tenant_agreement_file?: string;
  createdAt: string;
  updatedAt: string;
};

const mapProperty = (property: BackendProperty): Property => ({
  id: property.id,
  title: property.title,
  description: property.description || '',
  type: property.type,
  unit_type: property.unit_type,
  price: property.price,
  advance: property.advance || 0,
  location: {
    address: property.project?.location || 'N/A',
    city: property.project?.location || 'N/A',
    state: 'N/A',
    pincode: '000000',
  },
  area: property.size_sqft || property.sizeSqFt || 0,
  floor: property.floor,
  amenities: [],
  images: property.images && property.images.length > 0 
    ? property.images 
    : (property.project?.images || []),
  status: property.status || 'available',
  projectName: property.project?.name || 'Unknown Project',
  tenantName: property.tenant_name || '',
  tenantPhone: property.tenant_phone || '',
  advancePaidDate: property.advance_paid_date || '',
  advancePaid: property.advance_paid || 0,
  rentPaid: property.rent_paid || 0,
  tenantAadharFile: property.tenant_aadhar_file || '',
  tenantAgreementFile: property.tenant_agreement_file || '',
  createdAt: property.createdAt,
  updatedAt: property.updatedAt,
  project: property.project,
});

export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'demo-prop-1',
    title: 'Executive 2 BHK Flat (A-201)',
    description: 'Spacious and brightly lit 2 BHK residence featuring premium modular kitchen fixtures, wide sunlit balcony, high ceilings, and 24/7 power backup in the heart of Whitefield.',
    type: 'flat',
    unit_type: '2bhk',
    price: 26000,
    advance: 100000,
    location: {
      address: 'ECC Road, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
    },
    area: 1250,
    bedrooms: 2,
    bathrooms: 2,
    floor: 2,
    amenities: ['24/7 Security', 'Power Backup', 'Covered Car Parking', 'Lift Access', 'Gymnasium', 'Rainwater Harvesting'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'available',
    projectName: 'HYVORA Heights',
    createdAt: new Date('2026-02-15').toISOString(),
    updatedAt: new Date('2026-02-15').toISOString(),
  },
  {
    id: 'demo-prop-2',
    title: 'Corner 2 BHK Flat (A-304)',
    description: 'Corner unit offering dual-aspect natural lighting, cross-ventilation, expansive wooden flooring in master bedroom, and immediate access to clubhouse amenities.',
    type: 'flat',
    unit_type: '2bhk',
    price: 27500,
    advance: 110000,
    location: {
      address: 'ECC Road, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
    },
    area: 1300,
    bedrooms: 2,
    bathrooms: 2,
    floor: 3,
    amenities: ['24/7 Security', 'Power Backup', 'Covered Parking', 'Modular Kitchen', 'Clubhouse'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'available',
    projectName: 'HYVORA Heights',
    createdAt: new Date('2026-02-18').toISOString(),
    updatedAt: new Date('2026-02-18').toISOString(),
  },
  {
    id: 'demo-prop-3',
    title: 'Luxury 3 BHK Penthouse Suite (C-601)',
    description: 'Ultra-luxurious 3 BHK penthouse in prime Indiranagar with expansive wrap-around sky terrace, designer Italian marble flooring, walk-in closets, and smart home automation.',
    type: 'flat',
    unit_type: '3bhk',
    price: 48000,
    advance: 200000,
    location: {
      address: '100 Feet Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
    area: 1850,
    bedrooms: 3,
    bathrooms: 3,
    floor: 6,
    amenities: ['Private Terrace', 'Clubhouse', 'Swimming Pool', 'EV Charging Point', 'Smart Home Automation', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'available',
    projectName: 'HYVORA Grand',
    createdAt: new Date('2026-02-20').toISOString(),
    updatedAt: new Date('2026-02-20').toISOString(),
  },
  {
    id: 'demo-prop-4',
    title: 'Premium 3 BHK Family Apartment (C-402)',
    description: 'Thoughtfully designed 3 BHK home optimized for family comfort with spacious dining hall, utility balcony, and children play park views.',
    type: 'flat',
    unit_type: '3bhk',
    price: 44000,
    advance: 180000,
    location: {
      address: '100 Feet Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
    area: 1720,
    bedrooms: 3,
    bathrooms: 3,
    floor: 4,
    amenities: ['Clubhouse', 'Swimming Pool', 'Dedicated Parking', 'Children Play Area', 'High-Speed Elevators'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'booked',
    projectName: 'HYVORA Grand',
    createdAt: new Date('2026-02-21').toISOString(),
    updatedAt: new Date('2026-02-21').toISOString(),
  },
  {
    id: 'demo-prop-5',
    title: 'Contemporary 1 BHK Apartment (B-102)',
    description: 'Chic, modern 1 BHK apartment perfectly crafted for working professionals. Located walking distance from Koramangala tech hubs, gourmet cafes, and transit routes.',
    type: 'flat',
    unit_type: '1bhk',
    price: 18500,
    advance: 75000,
    location: {
      address: '80 Feet Road, 4th Block, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
    area: 680,
    bedrooms: 1,
    bathrooms: 1,
    floor: 1,
    amenities: ['High Speed Fiber Ready', 'CCTV Surveillance', '24/7 Water Supply', 'Bike Parking', 'Gated Security'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1524749479?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'available',
    projectName: 'HYVORA Residency',
    createdAt: new Date('2026-02-22').toISOString(),
    updatedAt: new Date('2026-02-22').toISOString(),
  },
  {
    id: 'demo-prop-6',
    title: 'Modern 1 BHK Studio Flat (B-205)',
    description: 'Compact and efficient living space with open plan modular kitchen, private bedroom balcony, and peaceful residential surroundings.',
    type: 'flat',
    unit_type: '1bhk',
    price: 19000,
    advance: 80000,
    location: {
      address: '80 Feet Road, 4th Block, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
    area: 710,
    bedrooms: 1,
    bathrooms: 1,
    floor: 2,
    amenities: ['Modern Bathroom', 'Balcony View', '24/7 Security', 'Intercom', 'Power Backup'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'available',
    projectName: 'HYVORA Residency',
    createdAt: new Date('2026-02-23').toISOString(),
    updatedAt: new Date('2026-02-23').toISOString(),
  },
  {
    id: 'demo-prop-7',
    title: 'High-Footfall Commercial Retail Shop (G-03)',
    description: 'Prime commercial storefront with full glass frontage facing main commercial boulevard in HSR Layout. Ideal for retail stores, boutique cafes, electronics, or pharmacies.',
    type: 'shop',
    price: 42000,
    advance: 250000,
    location: {
      address: '27th Main, Sector 1, HSR Layout',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102',
    },
    area: 850,
    floor: 0,
    amenities: ['Main Road Facing', 'High Footfall Zone', '3-Phase Commercial Power', 'Glass Frontage', 'Customer Parking'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'available',
    projectName: 'HYVORA Plaza',
    createdAt: new Date('2026-02-24').toISOString(),
    updatedAt: new Date('2026-02-24').toISOString(),
  },
  {
    id: 'demo-prop-8',
    title: 'Corporate Boutique Office Suite (O-201)',
    description: 'Ready-to-move commercial office space equipped with private managerial cabins, open workstation zone, server room provision, and executive conference room.',
    type: 'shop',
    price: 55000,
    advance: 300000,
    location: {
      address: '27th Main, Sector 1, HSR Layout',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102',
    },
    area: 1100,
    floor: 2,
    amenities: ['Central Air Conditioning', 'High-Speed Elevators', 'Conference Facilities', '24/7 Access', 'Security & Surveillance'],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'available',
    projectName: 'HYVORA Plaza',
    createdAt: new Date('2026-02-25').toISOString(),
    updatedAt: new Date('2026-02-25').toISOString(),
  },
];

export const propertyService = {
  // Get all properties with filters
  getProperties: async (filters?: PropertyFilters): Promise<Property[]> => {
    try {
      const response = await api.get('/admin/property/all', { params: filters });
      const properties = response.data?.properties || [];
      if (properties.length > 0) {
        return properties.map(mapProperty);
      }
    } catch {
      // Backend unavailable or empty, fall back to realistic demo properties
    }

    let result = [...DEMO_PROPERTIES];
    if (filters?.type) {
      result = result.filter((p) => p.type === filters.type);
    }
    if (filters?.status) {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters?.projectName) {
      result = result.filter((p) => p.projectName.toLowerCase().includes(filters.projectName!.toLowerCase()));
    }
    return result;
  },

  // Get single property
  getProperty: async (id: string): Promise<Property> => {
    try {
      const response = await api.get(`/admin/property/${id}`);
      if (response.data?.property) {
        return mapProperty(response.data?.property);
      }
    } catch {
      // Fall back to demo list
    }
    const demo = DEMO_PROPERTIES.find((p) => p.id === id);
    if (demo) return demo;
    return DEMO_PROPERTIES[0];
  },

  // Create property (admin only)
  createProperty: async (propertyData: CreatePropertyInput): Promise<Property> => {
    const response = await api.post('/admin/property/create', propertyData);
    return mapProperty(response.data?.property);
  },

  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await api.get('/admin/projects/all');
      if (response.data?.projects?.length > 0) {
        return response.data?.projects;
      }
    } catch {
      // Fall back to demo projects
    }
    return [
      {
        id: 'proj-1',
        name: 'HYVORA Heights',
        location: 'Whitefield, Bengaluru',
        description: 'Premium residential apartments with modern amenities',
        status: 'active',
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'proj-2',
        name: 'HYVORA Grand',
        location: 'Indiranagar, Bengaluru',
        description: 'Luxury residences and penthouses in an upscale neighborhood',
        status: 'active',
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'proj-3',
        name: 'HYVORA Residency',
        location: 'Koramangala, Bengaluru',
        description: 'Contemporary apartments for modern urban living',
        status: 'active',
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'proj-4',
        name: 'HYVORA Plaza',
        location: 'HSR Layout, Bengaluru',
        description: 'Modern commercial retail and corporate office complex',
        status: 'active',
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  },

  // Update property (admin only)
  updateProperty: async (id: string, propertyData: Partial<Property>): Promise<Property> => {
    const response = await api.put(`/admin/property/${id}`, propertyData);
    return mapProperty(response.data?.property);
  },

  // Delete property (admin only)
  deleteProperty: async (id: string): Promise<void> => {
    await api.delete(`/admin/property/${id}`);
  },

  // Upload property images
  uploadImages: async (id: string, images: FormData): Promise<string[]> => {
    const response = await api.post(`/properties/${id}/images`, images, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data || response.data;
  },

  // Upload property tenant documents (Aadhaar / Agreement)
  uploadPropertyDocument: async (file: File, type: 'aadhaar' | 'agreement', propertyId: string): Promise<string> => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);
    formData.append('propertyId', propertyId);

    const response = await api.post(`/upload/property-document`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.url;
  },

  // Generic image upload
  uploadImage: async (file: File, folder: string): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await api.post(`/upload/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.url;
  }
};
