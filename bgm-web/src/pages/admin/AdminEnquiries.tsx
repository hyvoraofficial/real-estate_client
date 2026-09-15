import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { fetchAdminEnquiries, updateEnquiryStatus } from '../../services/api';
import { Enquiry, LeadStatus } from '../../types';
import toast from 'react-hot-toast';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load client enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      toast.success(`Lead status updated to ${newStatus}`);
      loadEnquiries();
    } catch (err) {
      toast.error("Failed to update lead status");
    }
  };

  const filtered = enquiries.filter((e) => {
    const q = search.toLowerCase();
    const matchesSearch =
      e.name.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      (e.email || '').toLowerCase().includes(q) ||
      (e.property_title || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Client Enquiries & Lead CRM
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track incoming investor inquiries, private walkthrough requests, and manage client follow-up status.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, mobile number, property..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer"
          >
            <option value="all">All Lead Statuses</option>
            <option value="new">🟢 New Leads</option>
            <option value="contacted">🔵 Contacted</option>
            <option value="interested">⭐ Interested Investor</option>
            <option value="follow_up">🟡 Follow Up Required</option>
            <option value="closed">⚪ Closed / Completed</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading leads...</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-xs">No customer enquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase bg-slate-950/40">
                  <th className="p-4">Client Name & Date</th>
                  <th className="p-4">Contact Details</th>
                  <th className="p-4">Property / Asset</th>
                  <th className="p-4">Message / Requirements</th>
                  <th className="p-4">Lead Status</th>
                  <th className="p-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((enq) => {
                  const cleanPhone = enq.phone.replace(/[^0-9+]/g, '');
                  const cleanWhatsApp = enq.phone.replace(/[^0-9]/g, '');
                  return (
                    <tr key={enq.id} className="text-slate-300 hover:bg-slate-800/40 transition-colors">
                      {/* Name & Date */}
                      <td className="p-4">
                        <strong className="text-white text-sm block font-serif">{enq.name}</strong>
                        <span className="text-[10px] text-slate-500">
                          {enq.created_at ? new Date(enq.created_at).toLocaleString() : 'Just now'}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="p-4 font-mono">
                        <span className="text-slate-200 block font-bold">{enq.phone}</span>
                        {enq.email && <span className="text-[11px] text-slate-400">{enq.email}</span>}
                      </td>

                      {/* Property */}
                      <td className="p-4 max-w-xs">
                        <p className="font-medium text-[#C5A059] truncate">{enq.property_title}</p>
                      </td>

                      {/* Message */}
                      <td className="p-4 max-w-sm">
                        <p className="text-slate-300 line-clamp-2 text-xs leading-relaxed">
                          {enq.message || 'No additional message.'}
                        </p>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value as LeadStatus)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase cursor-pointer border-0 ${
                            enq.status === 'new'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : enq.status === 'contacted'
                              ? 'bg-blue-500/20 text-blue-400'
                              : enq.status === 'interested'
                              ? 'bg-purple-500/20 text-purple-400'
                              : enq.status === 'follow_up'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          <option value="new" className="bg-slate-900 text-white">New Lead</option>
                          <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
                          <option value="interested" className="bg-slate-900 text-white">Interested</option>
                          <option value="follow_up" className="bg-slate-900 text-white">Follow Up</option>
                          <option value="closed" className="bg-slate-900 text-white">Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="inline-flex p-2 rounded-xl bg-slate-800 text-gold-400 hover:bg-slate-700 hover:text-white transition-colors"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${cleanWhatsApp}?text=Hello%20${encodeURIComponent(enq.name)},%20I%20am%20contacting%20you%20from%20HYVORA%20REAL%20ESTATES%20regarding%20your%20enquiry%20on%20${encodeURIComponent(enq.property_title || 'our property')}.`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex p-2 rounded-xl bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                          title="WhatsApp Lead"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
