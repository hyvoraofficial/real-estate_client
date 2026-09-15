import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  Check,
  X,
  Filter
} from 'lucide-react';
import { fetchProperties, deleteProperty, updateProperty } from '../../services/api';
import { Property } from '../../types';
import toast from 'react-hot-toast';

export const AdminProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await fetchProperties();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load property listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteProperty(id);
      toast.success("Property deleted successfully");
      loadProperties();
    } catch (err) {
      toast.error("Failed to delete property");
    }
  };

  const handleToggleFeatured = async (property: Property) => {
    try {
      await updateProperty(property.id, { featured: !property.featured });
      toast.success(property.featured ? "Removed from featured" : "Marked as featured!");
      loadProperties();
    } catch (err) {
      toast.error("Failed to update featured status");
    }
  };

  const handleQuickStatusChange = async (property: Property, newStatus: string) => {
    try {
      await updateProperty(property.id, { status: newStatus as any });
      toast.success(`Status updated to ${newStatus}`);
      loadProperties();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filtered = properties.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Property Assets & Listings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your entire portfolio of buildings, commercial plazas, corner sites, and land parcels.
          </p>
        </div>

        <Link
          to="/admin/properties/new"
          className="px-5 py-2.5 rounded-xl bg-[#C5A059] text-[#2E060D] text-xs font-bold hover:bg-[#D4AF37] transition-all flex items-center space-x-1.5 shadow-md w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, location, category..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
          />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer"
          >
            <option value="all">🏢 All Categories</option>
            <option value="buildings">Entire Buildings</option>
            <option value="commercial">Commercial Properties</option>
            <option value="sites">Sites & Plots</option>
            <option value="land">Development Land</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer"
          >
            <option value="all">⚡ All Statuses</option>
            <option value="available">Available</option>
            <option value="under_negotiation">Under Negotiation</option>
            <option value="sold">Sold</option>
            <option value="coming_soon">Coming Soon</option>
          </select>
        </div>
      </div>

      {/* Property Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading portfolio...</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-xs">No property assets found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase bg-slate-950/40">
                  <th className="p-4">Cover</th>
                  <th className="p-4">Property Title & Location</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Asset Value</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((prop) => (
                  <tr key={prop.id} className="text-slate-300 hover:bg-slate-800/40 transition-colors">
                    {/* Thumbnail */}
                    <td className="p-4">
                      <div className="w-14 h-11 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">
                        <img
                          src={prop.images?.[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="p-4 max-w-xs">
                      <p className="font-serif font-bold text-white truncate text-sm">{prop.title}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{prop.location}</p>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="capitalize px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
                        {prop.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-mono font-bold text-[#C5A059]">
                      {prop.price_display || `₹${(prop.price / 10000000).toFixed(2)} Cr`}
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-4">
                      <select
                        value={prop.status}
                        onChange={(e) => handleQuickStatusChange(prop, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase cursor-pointer border-0 ${
                          prop.status === 'available'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : prop.status === 'under_negotiation'
                            ? 'bg-amber-500/20 text-amber-400'
                            : prop.status === 'sold'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        <option value="available" className="bg-slate-900 text-white">Available</option>
                        <option value="under_negotiation" className="bg-slate-900 text-white">Under Negotiation</option>
                        <option value="sold" className="bg-slate-900 text-white">Sold</option>
                        <option value="coming_soon" className="bg-slate-900 text-white">Coming Soon</option>
                      </select>
                    </td>

                    {/* Featured Toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(prop)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          prop.featured ? 'text-[#C5A059] bg-gold-950/60' : 'text-slate-600 hover:text-slate-400'
                        }`}
                        title={prop.featured ? 'Featured on Homepage' : 'Click to feature on homepage'}
                      >
                        <Star className={`w-4 h-4 ${prop.featured ? 'fill-[#C5A059]' : ''}`} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                      <Link
                        to={prop.slug ? `/properties/${prop.slug}` : `/properties/${prop.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 inline-block"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/admin/properties/${prop.id}/edit`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 inline-block"
                        title="Edit Asset"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(prop.id, prop.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
