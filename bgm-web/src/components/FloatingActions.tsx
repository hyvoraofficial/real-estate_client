import React from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useSettingsStore } from '../store/useSettingsStore';

export const FloatingActions: React.FC = () => {
  const { settings } = useSettingsStore();
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* WhatsApp Action */}
      <a
        href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Balaji%20(BGM%20Real%20Estate),%20I%20am%20interested%20in%20discussing%20property%20investment%20opportunities.`}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center border-2 border-white shadow-emerald-950/40 group"
        title="Chat with Balaji (BGM Real Estate) on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 text-white fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          WhatsApp Balaji
        </span>
      </a>

      {/* Call Now Action */}
      <a
        href={`tel:${cleanPhone}`}
        className="w-14 h-14 p-3.5 bg-[#6B0F1A] text-white rounded-full shadow-2xl hover:bg-[#800020] hover:scale-110 transition-all flex items-center justify-center border-2 border-gold-400/50 shadow-burgundy-950/50 group"
        title="Call Balaji (BGM Real Estate)"
      >
        <Phone className="w-6 h-6 text-gold-300" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Call Now
        </span>
      </a>
    </div>
  );
};
