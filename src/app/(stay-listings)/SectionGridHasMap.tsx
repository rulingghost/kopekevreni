"use client";

import React, { FC, useState, useMemo } from "react";
import { MOCK_PET_LISTINGS } from "@/data/mockPets";
import PetCard from "@/components/PetCard";
import Link from "next/link";
import { Route } from "@/routers/types";
import InteractiveMap from "@/components/InteractiveMap";
import {
  CITIES_LIST,
  getDistrictsOfCity,
  getLocationCoordinates,
} from "@/data/turkeyLocations";
import {
  MapPinIcon,
  XMarkIcon,
  SparklesIcon,
  ListBulletIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Konya");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Karatay");
  const [selectedPet, setSelectedPet] = useState(MOCK_PET_LISTINGS[0]);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);

  // Available districts for the chosen city
  const availableDistricts = useMemo(() => {
    if (!selectedCity || selectedCity === "ALL") return [];
    return getDistrictsOfCity(selectedCity);
  }, [selectedCity]);

  // Current map center coordinates
  const mapCenter = useMemo(() => {
    if (selectedCity && selectedCity !== "ALL") {
      return getLocationCoordinates(
        selectedCity,
        selectedDistrict !== "ALL" ? selectedDistrict : undefined
      );
    }
    return { lat: 39.0, lng: 35.0, zoom: 6 }; // Turkey general
  }, [selectedCity, selectedDistrict]);

  // Filter listings by selected city & district
  const filteredListings = useMemo(() => {
    return MOCK_PET_LISTINGS.filter((pet) => {
      if (selectedCity && selectedCity !== "ALL" && pet.location.city !== selectedCity) {
        return false;
      }
      if (
        selectedDistrict &&
        selectedDistrict !== "ALL" &&
        pet.location.district !== selectedDistrict
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCity, selectedDistrict]);

  // Prepare map markers
  const mapMarkers = useMemo(() => {
    const list = filteredListings.length > 0 ? filteredListings : MOCK_PET_LISTINGS;
    return list.map((pet) => ({
      id: pet.id,
      lat: pet.location.lat,
      lng: pet.location.lng,
      title: pet.title,
      breed: pet.breed,
      city: pet.location.city,
      district: pet.location.district,
      image: pet.featuredImage,
      href: `/listing-stay-detail?id=${pet.id}`,
    }));
  }, [filteredListings]);

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
    if (newCity === "ALL") {
      setSelectedDistrict("ALL");
    } else {
      const districts = getDistrictsOfCity(newCity);
      setSelectedDistrict(districts[0]?.name || "ALL");
    }
  };

  return (
    <div className="py-6">
      {/* Üst Başlık & Liste Görünümü Butonu */}
      <div className="pb-5 mb-6 border-b border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#dc5075] mb-1">
            <SparklesIcon className="w-4 h-4" />
            <span>Gerçek OpenStreetMap Haritası</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
            İlçelere Göre Haritada Köpek İlanları
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Şehir ve ilçe seçerek haritayı doğrudan merkeze odaklayabilir, o bölgedeki ilanları canlı inceleyebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={"/add-listing/1" as Route}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#dc5075] text-white text-xs font-bold hover:bg-[#c23d60] transition-colors shadow-sm"
          >
            <span>+ İlan Ver</span>
          </Link>
          <Link
            href={"/listing-stay" as Route}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <ListBulletIcon className="w-4 h-4 text-[#dc5075]" />
            <span>Liste Görünümüne Dön</span>
          </Link>
        </div>
      </div>

      {/* ŞEHİR VE İLÇE HIZLI FİLTRELEME ÇUBUĞU */}
      <div className="p-4 mb-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
            <FunnelIcon className="w-4 h-4 text-[#dc5075]" />
            <span>Konum Filtrele:</span>
          </div>

          {/* Şehir Seçimi */}
          <div className="flex items-center gap-1">
            <label className="text-xs text-neutral-500 font-medium">Şehir:</label>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#dc5075]"
            >
              <option value="ALL">Tüm Türkiye</option>
              {CITIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* İlçe Seçimi */}
          {selectedCity !== "ALL" && (
            <div className="flex items-center gap-1">
              <label className="text-xs text-neutral-500 font-medium">İlçe:</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none focus-ring-2 focus:ring-[#dc5075]"
              >
                <option value="ALL">Tüm İlçeler</option>
                {availableDistricts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name} {selectedCity === "Konya" && d.name === "Karatay" ? "(Merkez)" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Hızlı Konya / Karatay Kısayol Butonu */}
          <button
            type="button"
            onClick={() => {
              setSelectedCity("Konya");
              setSelectedDistrict("Karatay");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedCity === "Konya" && selectedDistrict === "Karatay"
                ? "bg-[#dc5075] text-white"
                : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100"
            }`}
          >
            📍 Konya / Karatay
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedCity("İstanbul");
              setSelectedDistrict("Kadıköy");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedCity === "İstanbul" && selectedDistrict === "Kadıköy"
                ? "bg-[#dc5075] text-white"
                : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100"
            }`}
          >
            📍 İstanbul / Kadıköy
          </button>
        </div>

        <div className="text-xs font-semibold text-neutral-500">
          <span>Haritada Odaklanan Merkez: </span>
          <strong className="text-neutral-800 dark:text-neutral-200 font-bold">
            {selectedCity === "ALL" ? "Türkiye" : `${selectedCity} / ${selectedDistrict}`}
          </strong>
        </div>
      </div>

      <div className="relative flex flex-col xl:flex-row min-h-screen gap-8">
        {/* SOL: İlan Kartları */}
        <div className="w-full xl:w-[50%] shrink-0 order-2 xl:order-1">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
              Bu bölgede {filteredListings.length > 0 ? filteredListings.length : MOCK_PET_LISTINGS.length} ilan bulundu
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(filteredListings.length > 0 ? filteredListings : MOCK_PET_LISTINGS).map((pet) => (
              <div
                key={pet.id}
                onMouseEnter={() => setSelectedPet(pet)}
                onClick={() => setSelectedPet(pet)}
                className={`transition-all duration-300 rounded-3xl cursor-pointer ${
                  selectedPet?.id === pet.id ? "ring-2 ring-[#dc5075] scale-[1.01]" : ""
                }`}
              >
                <PetCard data={pet} />
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ: Gerçek Leaflet Harita */}
        <div className="w-full xl:flex-1 order-1 xl:order-2">
          <div className="sticky top-24 h-[550px] xl:h-[calc(100vh-120px)] w-full rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg relative">
            <InteractiveMap
              lat={mapCenter.lat}
              lng={mapCenter.lng}
              zoom={mapCenter.zoom || 14}
              markers={mapMarkers}
              currentLocationLabel={`${selectedCity} / ${selectedDistrict} Merkez`}
              height="100%"
            />

            {/* Seçili İlan Mini Önizleme Kartı (Harita Üzerinde Alt Katman) */}
            {selectedPet && (
              <div className="absolute bottom-4 left-4 right-4 z-[1000] p-3.5 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-2xl flex items-center gap-3 max-w-md mx-auto">
                <img
                  src={selectedPet.featuredImage}
                  alt={selectedPet.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-200 dark:border-neutral-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#dc5075] bg-[#dc5075]/10 px-2 py-0.5 rounded-full">
                      {selectedPet.breed}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold">
                      📍 {selectedPet.location.city}, {selectedPet.location.district}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate mt-1">
                    {selectedPet.title}
                  </h4>
                  <Link
                    href={`/listing-stay-detail?id=${selectedPet.id}` as Route}
                    className="text-[11px] font-extrabold text-[#dc5075] hover:underline mt-0.5 inline-block"
                  >
                    🐾 İlan Detayını Aç &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
