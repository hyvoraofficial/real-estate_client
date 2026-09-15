import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix leaflet icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationPickerProps {
  initialLat?: number;
  initialLng?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapEvents: React.FC<{ onSelect: (lat: number, lng: number) => void }> = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLat = 15.3647,
  initialLng = 75.1240,
  onLocationSelect,
}) => {
  const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);

  const handleSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center space-x-1">
          <MapPin className="w-3.5 h-3.5 text-gold-600" />
          <span>Click on the map to pin exact coordinates</span>
        </span>
        <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">
          {position[0].toFixed(5)}, {position[1].toFixed(5)}
        </span>
      </div>
      <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-200">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={defaultIcon} />
          <MapEvents onSelect={handleSelect} />
        </MapContainer>
      </div>
    </div>
  );
};
