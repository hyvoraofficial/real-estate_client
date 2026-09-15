import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Building,
  MapPin,
  Trees,
  Briefcase,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
  Phone,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { fetchAdminDashboardStats, fetchProperties, fetchAdminEnquiries } from '../../services/api';
import { Property, Enquiry } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalProperties: 0,
    availableProperties: 0,
    soldProperties: 0,
    buildingsCount: 0,
    sitesCount: 0,
    landCount: 0,
    commercialCount: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [dashData, props, enqs] = await Promise.all([
          fetchAdminDashboardStats().catch(() => null),
          fetchProperties().catch(() => []),
          fetchAdminEnquiries().catch(() => [])
        ]);

        const allProps = Array.isArray(props) ? props : [];
        const allEnqs = Array.isArray(enqs) ? enqs : [];

        setStats({
          totalProperties: allProps.length,
          availableProperties: allProps.filter((p) => p.status === 'available').length,
          soldProperties: allProps.filter((p) => p.status === 'sold').length,
          buildingsCount: allProps.filter((p) => p.category === 'buildings').length,
          sitesCount: allProps.filter((p) => p.category === 'sites').length,
          landCount: allProps.filter((p) => p.category === 'land').length,
          commercialCount: allProps.filter((p) => p.category === 'commercial').length,
          totalEnquiries: allEnqs.length,
          newEnquiries: allEnqs.filter((e) => e.status === 'new').length,
        });

        setRecentEnquiries(allEnqs.slice(0, 5));
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Executive Real Estate CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            BGM Real Estate Portfolio & Client Lead Management
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/properties/new"
            className="px-4 py-2.5 rounded-xl bg-[#C5A059] text-[#2E060D] text-xs font-bold hover:bg-[#D4AF37] transition-all flex items-center space-x-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Asset</span>
          </Link>
          <Link
            to="/admin/settings"
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors flex items-center space-x-1.5"
          >
            <Settings className="w-4 h-4" />
            <span>Website CMS</span>
          </Link>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Total Assets</span>
            <div className="p-2 rounded-xl bg-burgundy-950 text-red-400">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-serif font-bold text-white">{stats.totalProperties}</p>
          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-bold">{stats.availableProperties} Available</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{stats.soldProperties} Sold</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Entire Buildings</span>
            <div className="p-2 rounded-xl bg-gold-950 text-[#C5A059]">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-serif font-bold text-white">{stats.buildingsCount}</p>
          <p className="text-[11px] text-slate-400">Commercial & Multi-Unit Blocks</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Sites & Plots</span>
            <div className="p-2 rounded-xl bg-blue-950 text-blue-400">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-serif font-bold text-white">{stats.sitesCount}</p>
          <p className="text-[11px] text-slate-400">Corner & Layout Investment Sites</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Client Enquiries</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-serif font-bold text-white">{stats.totalEnquiries}</p>
          <p className="text-[11px] text-emerald-400 font-semibold">{stats.newEnquiries} New Leads Pending</p>
        </div>
      </div>

      {/* Category Distribution Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="font-bold text-white uppercase tracking-wider">Asset Distribution:</span>
        <div className="flex items-center space-x-6 text-slate-300">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
            <span>Buildings: <strong>{stats.buildingsCount}</strong></span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span>Sites: <strong>{stats.sitesCount}</strong></span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Land: <strong>{stats.landCount}</strong></span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span>Commercial: <strong>{stats.commercialCount}</strong></span>
          </span>
        </div>
      </div>

      {/* Recent Client Enquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-white">Recent Client Leads & Enquiries</h3>
            <p className="text-xs text-slate-400">Direct investment enquiries submitted on the website</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-[#C5A059] hover:underline flex items-center"
          >
            <span>View All Enquiries CRM</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No customer enquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase bg-slate-950/40">
                  <th className="p-3.5">Client Name</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Property of Interest</th>
                  <th className="p-3.5">Lead Status</th>
                  <th className="p-3.5 text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="text-slate-300 hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold text-white">{enq.name}</td>
                    <td className="p-3.5 font-mono">
                      <div>{enq.phone}</div>
                      {enq.email && <span className="text-[11px] text-slate-400">{enq.email}</span>}
                    </td>
                    <td className="p-3.5 font-medium text-slate-200">{enq.property_title}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enq.status === 'new'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : enq.status === 'contacted'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <a
                        href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex p-1.5 rounded-lg bg-slate-800 text-gold-400 hover:bg-slate-700"
                        title="Call Client"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.name)},%20I%20am%20contacting%20you%20from%20BGM%20Real%20Estate.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                        title="WhatsApp Client"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      </a>
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
