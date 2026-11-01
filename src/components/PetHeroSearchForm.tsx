"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { ListingType } from "@/types/pet";
import { ALL_BREEDS } from "@/data/kopekDunyasiData";
import { MagnifyingGlassIcon, MapPinIcon, SparklesIcon, TagIcon } from "@heroicons/react/24/outline";

export type HeroSearchTab = "ALL" | "ADOPTION" | "MATING" | "LOST_FOUND";

const POPULAR_CITIES = [
  "Tüm Türkiye",
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Muğla",
  "Eskişehir",
  "Adana",
  "Konya",
];

const PetHeroSearchForm: FC<{ className?: string }> = ({ className = "" }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<HeroSearchTab>("ADOPTION");
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab !== "ALL") params.set("type", activeTab);
    if (selectedBreed) params.set("breed", selectedBreed);
    if (selectedCity && selectedCity !== "Tüm Türkiye") params.set("city", selectedCity);
    if (searchTerm) params.set("q", searchTerm);

    router.push(`/listing-stay?${params.toString()}`);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* SEKMELER */}
      <div className="flex items-center space-x-2 sm:space-x-3 mb-3 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("ALL")}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            activeTab === "ALL"
              ? "bg-[#dc5075] text-white shadow-md shadow-[#dc5075]/20"
              : "bg-white/80 dark:bg-neutral-800/80 text-[#78716C] hover:text-[#1C1917] dark:text-neutral-300 border border-[#EDE7DE] dark:border-neutral-700"
          }`}
        >
          <span>Tüm İlanlar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ADOPTION")}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            activeTab === "ADOPTION"
              ? "bg-[#dc5075] text-white shadow-md shadow-[#dc5075]/20"
              : "bg-white/80 dark:bg-neutral-800/80 text-[#78716C] hover:text-[#1C1917] dark:text-neutral-300 border border-[#EDE7DE] dark:border-neutral-700"
          }`}
        >
          <span>✨ Vitrin İlanları</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("MATING")}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            activeTab === "MATING"
              ? "bg-[#dc5075] text-white shadow-md shadow-[#dc5075]/20"
              : "bg-white/80 dark:bg-neutral-800/80 text-[#78716C] hover:text-[#1C1917] dark:text-neutral-300 border border-[#EDE7DE] dark:border-neutral-700"
          }`}
        >
          <span>⚡ Yeni Eklenenler</span>
        </button>
      </div>

      {/* BOUTIQUE FORM KONSOLU */}
      <form
        onSubmit={handleSearch}
        className="bg-white/95 dark:bg-[#1E1C1A]/95 backdrop-blur-md rounded-3xl p-2.5 sm:p-3 shadow-xl shadow-[#1C1917]/5 border border-[#EDE7DE] dark:border-neutral-800 flex flex-col md:flex-row items-center gap-2"
      >
        {/* ARAMA KELİMESİ */}
        <div className="flex-1 w-full px-4 py-2 flex items-center gap-3">
          <MagnifyingGlassIcon className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] font-semibold tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E]">
              Arama
            </label>
            <input
              type="text"
              placeholder="İlan başlığı, yaş veya özellik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5] focus:outline-none placeholder-[#A8A29E] dark:placeholder-neutral-500 border-none p-0 focus:ring-0"
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-[#EDE7DE] dark:bg-neutral-800" />

        {/* IRK SEÇİMİ */}
        <div className="flex-1 w-full px-4 py-2 flex items-center gap-3">
          <TagIcon className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] font-semibold tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E]">
              Irk / Cins
            </label>
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5] focus:outline-none border-none p-0 focus:ring-0 cursor-pointer"
            >
              <option value="">Tüm Köpek Irkları</option>
              {ALL_BREEDS.map((breed) => (
                <option key={breed.slug} value={breed.name}>
                  {breed.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-[#EDE7DE] dark:bg-neutral-800" />

        {/* ŞEHİR SEÇİMİ */}
        <div className="flex-1 w-full px-4 py-2 flex items-center gap-3">
          <MapPinIcon className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] font-semibold tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E]">
              Şehir
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5] focus:outline-none border-none p-0 focus:ring-0 cursor-pointer"
            >
              {POPULAR_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ARA AKSİYON BUTONU */}
        <button
          type="submit"
          className="w-full md:w-auto px-7 py-3.5 rounded-2xl bg-[#7A1C30] hover:bg-[#601424] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#7A1C30]/25 flex-shrink-0"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          <span>Canları Keşfet</span>
        </button>
      </form>
    </div>
  );
};

export default PetHeroSearchForm;
