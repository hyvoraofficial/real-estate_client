import { create } from 'zustand';
import { WebsiteSettings } from '../types';
import { fetchWebsiteSettings } from '../services/api';

interface SettingsState {
  settings: WebsiteSettings;
  loading: boolean;
  loadSettings: () => Promise<void>;
  updateLocalSettings: (newSettings: Partial<WebsiteSettings>) => void;
}

const defaultSettings: WebsiteSettings = {
  company_name: "HYVORA REAL ESTATES",
  contact_person: "HYVORA Specialist",
  logo_url: "/logo.png",
  phone: "+91 8217512581",
  secondary_phone: "+91 8217512581",
  whatsapp: "+91 8217512581",
  email: "hyvora.official@gmail.com",
  address: "HYVORA REAL ESTATES, Bengaluru, Karnataka, India",
  google_maps_url: "https://maps.google.com/?q=Bengaluru+Karnataka+India",
  business_hours: "Mon - Sat: 9:00 AM - 8:00 PM (Sunday by Appointment)",
  hero_headline: "Exceptional Real Estate. Extraordinary Opportunities.",
  hero_subheading: "Discover premium entire buildings, commercial properties, prime sites, and development land curated by HYVORA REAL ESTATES.",
  hero_image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
  about_content: "HYVORA REAL ESTATES is a premier corporate real estate consultancy and investment advisory firm. We specialize in the acquisition, disposition, and strategic marketing of entire commercial and residential buildings, prime layout plots, industrial acreage, and high-yield real estate assets across Karnataka.",
  mission: "To deliver uncompromising transparency, rigorous legal title verification, and maximum financial return for real estate buyers, corporate investors, and property developers.",
  vision: "To be Karnataka's most trusted and preferred corporate real estate advisory and high-value asset brokerage partner."
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: defaultSettings,
  loading: false,

  loadSettings: async () => {
    try {
      set({ loading: true });
      const data = await fetchWebsiteSettings();
      if (data) {
        set({ settings: { ...defaultSettings, ...data } });
      }
    } catch (err) {
      console.warn("Using default settings fallback:", err);
    } finally {
      set({ loading: false });
    }
  },

  updateLocalSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
  }
}));
