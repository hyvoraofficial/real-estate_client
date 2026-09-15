import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  Building,
  MapPin,
  Trees,
  Briefcase,
  Upload,
  X,
  Star,
  ArrowLeft,
  Save,
  Check
} from 'lucide-react';
import {
  createProperty,
  updateProperty,
  fetchPropertyBySlugOrId,
  uploadImage
} from '../../services/api';
import { Property, PropertyCategory, PriceType, PropertyStatus } from '../../types';
import toast from 'react-hot-toast';

export const AdminPropertyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PropertyCategory>('buildings');
  const [propertyType, setPropertyType] = useState('Commercial Building');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('');

  // Pricing
  const [price, setPrice] = useState('');
  const [priceDisplay, setPriceDisplay] = useState('');
  const [priceType, setPriceType] = useState<PriceType>('fixed');

  // Specs
  const [plotArea, setPlotArea] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [carpetArea, setCarpetArea] = useState('');
  const [roadWidth, setRoadWidth] = useState('');
  const [facing, setFacing] = useState('North');
  const [propertyAge, setPropertyAge] = useState('');

  // Status & SEO
  const [status, setStatus] = useState<PropertyStatus>('available');
  const [featured, setFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // Images Array
  const [images, setImages] = useState<string[]>([]);

  // Category Specific Details
  const [categoryDetails, setCategoryDetails] = useState<any>({});

  useEffect(() => {
    if (isEditing && id) {
      const loadExisting = async () => {
        try {
          setLoading(true);
          const prop = await fetchPropertyBySlugOrId(id);
          if (prop) {
            setTitle(prop.title || '');
            setCategory(prop.category || 'buildings');
            setPropertyType(prop.property_type || '');
            setDescription(prop.description || '');
            setLocation(prop.location || '');
            setAddress(prop.address || '');
            setCity(prop.city || 'Bangalore');
            setState(prop.state || 'Karnataka');
            setPincode(prop.pincode || '');
            setPrice(prop.price ? prop.price.toString() : '');
            setPriceDisplay(prop.price_display || '');
            setPriceType(prop.price_type || 'fixed');
            setPlotArea(prop.plot_area || '');
            setBuiltUpArea(prop.built_up_area || '');
            setCarpetArea(prop.carpet_area || '');
            setRoadWidth(prop.road_width || '');
            setFacing(prop.facing || 'North');
            setPropertyAge(prop.property_age || '');
            setStatus(prop.status || 'available');
            setFeatured(Boolean(prop.featured));
            setSeoTitle(prop.seo_title || '');
            setSeoDescription(prop.seo_description || '');
            setImages(Array.isArray(prop.images) ? prop.images : []);
            setCategoryDetails(prop.category_details || {});
          }
        } catch (err) {
          toast.error("Failed to load property data");
        } finally {
          setLoading(false);
        }
      };
      loadExisting();
    }
  }, [id, isEditing]);

  // Handle Category Switch defaults
  const handleCategoryChange = (newCat: PropertyCategory) => {
    setCategory(newCat);
    if (newCat === 'buildings') setPropertyType('Commercial Building');
    else if (newCat === 'commercial') setPropertyType('Commercial Retail Showroom');
    else if (newCat === 'sites') setPropertyType('BDA Corner Site');
    else if (newCat === 'land') setPropertyType('Highway Development Land');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await uploadImage(file, 'properties');
      setImages((prev) => [...prev, res.url]);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const item = images[index];
    const newArr = [item, ...images.filter((_, i) => i !== index)];
    setImages(newArr);
    toast.success("Set as main cover image");
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !price) {
      toast.error("Please fill in Title, Category, and Price");
      return;
    }

    try {
      setSaving(true);
      const payload: Partial<Property> = {
        title,
        category,
        property_type: propertyType,
        description,
        location,
        address,
        city,
        state,
        pincode,
        price: Number(price),
        price_display: priceDisplay || `₹${(Number(price) / 10000000).toFixed(2)} Crore`,
        price_type: priceType,
        status,
        featured,
        plot_area: plotArea,
        built_up_area: builtUpArea,
        carpet_area: carpetArea,
        road_width: roadWidth,
        facing,
        property_age: propertyAge,
        images: images.length > 0 ? images : [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
        ],
        category_details: categoryDetails,
        seo_title: seoTitle,
        seo_description: seoDescription,
      };

      if (isEditing && id) {
        await updateProperty(id, payload);
        toast.success("Property asset updated successfully!");
      } else {
        await createProperty(payload);
        toast.success("New property asset created!");
      }

      navigate('/admin/properties');
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save property");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/properties"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Table</span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {isEditing ? 'Edit Real Estate Asset' : 'Add New High-Value Asset'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill in detailed technical specifications, pricing, and category parameters.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#C5A059] text-[#2E060D] text-xs font-bold hover:bg-[#D4AF37] transition-all flex items-center space-x-1.5 shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : isEditing ? 'Update Property' : 'Publish Property'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-white">
        {/* 1. Basic Information */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#C5A059]" />
            <span>1. Basic Property Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Property Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Prime 5-Floor Commercial Plaza on Koramangala 100ft Road"
                required
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Asset Category *
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as PropertyCategory)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer"
              >
                <option value="buildings">Entire Buildings (Commercial & Residential)</option>
                <option value="commercial">Commercial Showrooms & Plazas</option>
                <option value="sites">Sites & Layout Plots</option>
                <option value="land">Development & Industrial Land</option>
                <option value="other">Other High-Value Assets</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Property Type / Sub-Type
              </label>
              <input
                type="text"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                placeholder="e.g. G+4 Commercial Tower / BDA Corner Site"
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description / Investment Executive Summary
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed property description, rental income yield, tenant quality, road width, FAR, and surrounding commercial landmarks..."
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>
          </div>
        </div>

        {/* 2. Location & Address */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#C5A059]" />
            <span>2. Location & Address</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Display Location / Landmark *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Koramangala 100ft Road, Bangalore"
                required
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Plot No. 42, 100 Feet Road"
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Bangalore"
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Karnataka"
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="560034"
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Pricing & Valuation */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <span className="text-[#C5A059] font-mono font-bold">₹</span>
            <span>3. Valuation & Pricing Strategy</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Numerical Price (in INR) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 145000000 (for ₹14.5 Cr)"
                required
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Display Formatted Price
              </label>
              <input
                type="text"
                value={priceDisplay}
                onChange={(e) => setPriceDisplay(e.target.value)}
                placeholder="e.g. ₹14.50 Crore / ₹85 Lakhs"
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Pricing Term
              </label>
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value as PriceType)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white cursor-pointer"
              >
                <option value="fixed">Fixed Price</option>
                <option value="negotiable">Negotiable</option>
                <option value="price_on_request">Price on Request</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Dynamic Category Specifications Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-[#C5A059]" />
              <span>4. Category-Specific Parameters ({category.toUpperCase()})</span>
            </span>
            <span className="text-[11px] text-slate-400 font-sans font-normal">
              Fields adapt automatically to {category}
            </span>
          </h3>

          {/* BUILDINGS PANEL */}
          {category === 'buildings' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Total Floors</label>
                <input
                  type="number"
                  value={categoryDetails.total_floors || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, total_floors: Number(e.target.value) })}
                  placeholder="e.g. 5 (G+4)"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Total Units / Flats</label>
                <input
                  type="number"
                  value={categoryDetails.total_units || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, total_units: Number(e.target.value) })}
                  placeholder="e.g. 12 Units"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Car Parking Spaces</label>
                <input
                  type="number"
                  value={categoryDetails.parking_spaces || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, parking_spaces: Number(e.target.value) })}
                  placeholder="e.g. 25"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Rental Income</label>
                <input
                  type="text"
                  value={categoryDetails.rental_income_monthly || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, rental_income_monthly: e.target.value })}
                  placeholder="e.g. ₹8,50,000 / month"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Expected ROI / Yield %</label>
                <input
                  type="text"
                  value={categoryDetails.expected_roi_percent || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, expected_roi_percent: e.target.value })}
                  placeholder="e.g. 7.1% Net Yield"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Occupancy Status</label>
                <input
                  type="text"
                  value={categoryDetails.occupancy_status || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, occupancy_status: e.target.value })}
                  placeholder="e.g. 100% Leased to IT Tenants"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Year Built / Age</label>
                <input
                  type="text"
                  value={categoryDetails.year_built || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, year_built: e.target.value })}
                  placeholder="e.g. 2023"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Lift / Elevators</label>
                <input
                  type="text"
                  value={categoryDetails.lift_available || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, lift_available: e.target.value })}
                  placeholder="e.g. 2 High Speed Auto Lifts"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* SITES PANEL */}
          {category === 'sites' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Plot Dimensions</label>
                <input
                  type="text"
                  value={categoryDetails.plot_dimensions || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, plot_dimensions: e.target.value })}
                  placeholder="e.g. 60 ft x 40 ft"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Corner Site Status</label>
                <select
                  value={categoryDetails.corner_plot || 'No'}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, corner_plot: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white cursor-pointer"
                >
                  <option value="Yes (Corner Plot)">Yes (Corner Plot)</option>
                  <option value="No">No (Intermediate Plot)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Khata / Title Status</label>
                <input
                  type="text"
                  value={categoryDetails.khata_type || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, khata_type: e.target.value })}
                  placeholder="e.g. BDA Clear 'A' Khata"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Approval Authority</label>
                <input
                  type="text"
                  value={categoryDetails.approval_authority || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, approval_authority: e.target.value })}
                  placeholder="e.g. BDA / BBMP / BMRDA"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* LAND PANEL */}
          {category === 'land' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Total Land Area</label>
                <input
                  type="text"
                  value={categoryDetails.total_land_area || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, total_land_area: e.target.value })}
                  placeholder="e.g. 8.5 Acres (340 Guntas)"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Land Type / Zoning</label>
                <input
                  type="text"
                  value={categoryDetails.land_type || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, land_type: e.target.value })}
                  placeholder="e.g. Commercial / Industrial Converted"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Road Frontage Access</label>
                <input
                  type="text"
                  value={categoryDetails.road_access || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, road_access: e.target.value })}
                  placeholder="e.g. 350 ft National Highway Frontage"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Power Sanction</label>
                <input
                  type="text"
                  value={categoryDetails.electricity_sanction || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, electricity_sanction: e.target.value })}
                  placeholder="e.g. 150 KVA High Tension"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Conversion Status</label>
                <input
                  type="text"
                  value={categoryDetails.conversion_status || ''}
                  onChange={(e) => setCategoryDetails({ ...categoryDetails, conversion_status: e.target.value })}
                  placeholder="e.g. DC Converted with Pollution NOC"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* General Area Specs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Plot Area</label>
              <input
                type="text"
                value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
                placeholder="e.g. 6,400 sq.ft"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Built-Up Area</label>
              <input
                type="text"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(e.target.value)}
                placeholder="e.g. 24,500 sq.ft"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Road Width</label>
              <input
                type="text"
                value={roadWidth}
                onChange={(e) => setRoadWidth(e.target.value)}
                placeholder="e.g. 80 ft Main Road"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Facing</label>
              <input
                type="text"
                value={facing}
                onChange={(e) => setFacing(e.target.value)}
                placeholder="e.g. North-East"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* 5. Image Management (Multi-upload & Cover selector) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>5. Image Gallery & Main Cover Photo</span>
            <span className="text-[11px] text-slate-400 font-sans font-normal">
              First image is the primary cover
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.map((url, idx) => (
              <div
                key={idx}
                className={`relative group rounded-2xl overflow-hidden border-2 aspect-video bg-slate-950 ${
                  idx === 0 ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40' : 'border-slate-700'
                }`}
              >
                <img src={url} alt="asset" className="w-full h-full object-cover" />
                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-[#C5A059] text-[#2E060D] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Cover
                  </span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      className="p-1 rounded bg-gold-500 text-black text-[10px] font-bold"
                      title="Set as cover"
                    >
                      Cover
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="p-1 rounded bg-rose-600 text-white"
                    title="Delete image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <label className="inline-flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white cursor-pointer border border-slate-700 transition-colors shadow-sm">
            <Upload className="w-4 h-4 text-[#C5A059]" />
            <span>{uploadingImage ? 'Uploading Image...' : '+ Upload High-Res Image'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              className="hidden"
            />
          </label>
        </div>

        {/* 6. Listing Status & Featured */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3">
            6. Publication Status & Visibility
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white cursor-pointer"
              >
                <option value="available">Available (Public)</option>
                <option value="under_negotiation">Under Negotiation</option>
                <option value="sold">Sold</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 rounded text-[#C5A059] bg-slate-800 border-slate-700 focus:ring-[#C5A059] cursor-pointer"
              />
              <label htmlFor="featured" className="text-xs font-bold text-slate-200 cursor-pointer flex items-center space-x-1.5">
                <Star className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                <span>Feature in Homepage Spotlight</span>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-slate-800">
          <Link
            to="/admin/properties"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-[#C5A059] text-[#2E060D] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{saving ? 'Saving...' : isEditing ? 'Save All Changes' : 'Publish Asset'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
