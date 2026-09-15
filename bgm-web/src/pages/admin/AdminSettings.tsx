import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Upload,
  Check
} from 'lucide-react';
import { updateWebsiteSettings, uploadImage } from '../../services/api';
import { useSettingsStore } from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

export const AdminSettings: React.FC = () => {
  const { settings, loadSettings, updateLocalSettings } = useSettingsStore();
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHero(true);
      const res = await uploadImage(file, 'bgm_branding');
      setFormData((prev) => ({ ...prev, hero_image_url: res.url }));
      toast.success("Hero image uploaded!");
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingHero(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateWebsiteSettings(formData);
      updateLocalSettings(formData);
      toast.success("Website CMS settings updated successfully! Public site is updated.");
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Website Content & CMS Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update company phone numbers, address, hero headlines, and corporate about content in real time.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#C5A059] text-[#2E060D] text-xs font-bold hover:bg-[#D4AF37] transition-all flex items-center space-x-1.5 shadow-md disabled:opacity-50 w-fit"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-white">
        {/* 1. Company & Contact Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#C5A059]" />
            <span>1. Corporate Identity & Contact Info</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Brand Name</label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Principal Contact Person</label>
              <input
                type="text"
                value={formData.contact_person || ''}
                placeholder="e.g. Balaji"
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary Phone Number</label>
              <input
                type="text"
                value={formData.secondary_phone || ''}
                placeholder="+91 88921 40055"
                onChange={(e) => setFormData({ ...formData, secondary_phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Advisory Number</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Head Office Address & Landmark</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Business Working Hours</label>
              <input
                type="text"
                value={formData.business_hours}
                onChange={(e) => setFormData({ ...formData, business_hours: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Homepage Hero Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <span>2. Homepage Hero Banner Content</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Main Headline</label>
              <input
                type="text"
                value={formData.hero_headline}
                onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subheading</label>
              <textarea
                rows={2}
                value={formData.hero_subheading}
                onChange={(e) => setFormData({ ...formData, hero_subheading: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Background Image</label>
              {formData.hero_image_url && (
                <div className="h-36 rounded-2xl overflow-hidden mb-2 border border-slate-700">
                  <img src={formData.hero_image_url} alt="hero preview" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white cursor-pointer border border-slate-700 transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{uploadingHero ? 'Uploading...' : 'Upload New Hero Background'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  disabled={uploadingHero}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* 3. About Page Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3">
            3. About Us Story & Philosophy
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Introduction</label>
              <textarea
                rows={4}
                value={formData.about_content}
                onChange={(e) => setFormData({ ...formData, about_content: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mission Statement</label>
                <textarea
                  rows={3}
                  value={formData.mission}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Vision Statement</label>
                <textarea
                  rows={3}
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[#C5A059] text-[#2E060D] text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#D4AF37] transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
