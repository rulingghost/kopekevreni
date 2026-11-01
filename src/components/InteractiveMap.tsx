"use client";

import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";

export interface InteractiveMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  interactive?: boolean;
  onLocationSelect?: (coords: { lat: number; lng: number }) => void;
  markers?: Array<{
    id: string;
    title: string;
    breed: string;
    city: string;
    district: string;
    lat: number;
    lng: number;
    image: string;
  }>;
  height?: string;
  currentLocationLabel?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  lat,
  lng,
  zoom = 14,
  height = "300px",
  currentLocationLabel = "Konya / Karatay Merkez",
}) => {
  // Sorgu bazlı veya koordinat bazlı temiz Google Harita görünümü
  const mapQuery = currentLocationLabel
    ? `${currentLocationLabel.replace(/\//g, " ")}, Türkiye`
    : `${lat},${lng}`;

  const iframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      style={{ height }}
      className="w-full rounded-2xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 shadow-sm relative bg-neutral-100 dark:bg-neutral-900 flex flex-col"
    >
      <div className="bg-neutral-900/90 text-white px-3.5 py-2 text-xs font-bold flex items-center justify-between border-b border-neutral-700 shrink-0">
        <div className="flex items-center gap-1.5">
          <MapPinIcon className="w-4 h-4 text-[#dc5075]" />
          <span>Harita Konum Bilgisi: {currentLocationLabel}</span>
        </div>
        <span className="text-[11px] font-mono text-neutral-300">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
      </div>
      <iframe
        title={`Harita Bilgisi - ${currentLocationLabel}`}
        src={iframeSrc}
        className="w-full flex-1 border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default InteractiveMap;
