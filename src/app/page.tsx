"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import {
  ALL_BREEDS,
  CITIES_LIST,
  FEATURED_BREEDERS,
  VITRIN_LISTINGS,
  YENI_EKLENEN_ILANLAR,
  GUNUN_VITRIN_ILANLARI,
} from "@/data/kopekDunyasiData";
import VitrinCard from "@/components/VitrinCard";
import GuncelListCard from "@/components/GuncelListCard";
import { MobileVitrinCard, MobileGuncelRowCard } from "@/components/MobileCards";
import { getDistrictsOfCity, CITIES_LIST as TURKEY_CITIES } from "@/data/turkeyLocations";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  SparklesIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  // Sol Menü Sekmesi: 1 = Tür/Irk Kategorisi, 2 = Şehir Kategorisi
  const [sidebarTab, setSidebarTab] = useState<1 | 2>(1);

  // Mobil Güncel Liste Sekmesi: "yeni" | "vitrin"
  const [mobileListTab, setMobileListTab] = useState<"yeni" | "vitrin">("yeni");

  // Arama ve Filtreleme Durumları
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<string>("TÜMÜ");
  const [selectedCity, setSelectedCity] = useState<string>("TÜMÜ");

  // Sol menü içi hızlı arama (Irk veya şehir arama)
  const [sidebarSearch, setSidebarSearch] = useState("");

  // İlanların Altındaki Harita Bilgisi İçin İl ve İlçe Seçimi
  const [mapCity, setMapCity] = useState("Konya");
  const [mapDistrict, setMapDistrict] = useState("Karatay");
  const currentMapDistricts = useMemo(() => getDistrictsOfCity(mapCity), [mapCity]);

  // Filtrelenmiş Irk Listesi
  const filteredBreeds = useMemo(() => {
    if (!sidebarSearch.trim()) return ALL_BREEDS;
    const q = sidebarSearch.toLowerCase();
    return ALL_BREEDS.filter((b) => b.name.toLowerCase().includes(q));
  }, [sidebarSearch]);

  // Filtrelenmiş Şehir Listesi
  const filteredCities = useMemo(() => {
    if (!sidebarSearch.trim()) return CITIES_LIST;
    const q = sidebarSearch.toLowerCase();
    return CITIES_LIST.filter((c) => c.name.toLowerCase().includes(q));
  }, [sidebarSearch]);

  // Vitrin İlanları Filtreleme
  const filteredVitrin = useMemo(() => {
    return VITRIN_LISTINGS.filter((item) => {
      if (selectedBreed !== "TÜMÜ") {
        if (
          item.breed !== selectedBreed &&
          !item.breed.toLowerCase().includes(selectedBreed.toLowerCase())
        ) {
          return false;
        }
      }
      if (selectedCity !== "TÜMÜ") {
        if (item.city !== selectedCity) {
          return false;
        }
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesBreed = item.breed.toLowerCase().includes(q);
        const matchesCity = item.city.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBreed && !matchesCity) return false;
      }
      return true;
    });
  }, [selectedBreed, selectedCity, searchTerm]);

  const resetFilters = () => {
    setSelectedBreed("TÜMÜ");
    setSelectedCity("TÜMÜ");
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#151312] text-[#1C1917] dark:text-[#E8E4DF] transition-colors pb-16 md:pb-12">
      {/* ===================================================================== */}
      {/* 1. SADE VE DOĞRUDAN VİTRİN ODAKLI MOBİL ANA SAYFA (< 768px)            */}
      {/* ===================================================================== */}
      <div className="block md:hidden px-2.5 pt-2.5 space-y-3">
        {/* A) KOMPAKT HİKAYE TARZI ÖNE ÇIKAN ÜRETİCİLER & KULÜPLER HALKALARI */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl px-2.5 py-2 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-extrabold text-[#dc5075]">
              🏆 Öne Çıkan Üreticiler & Kulüpler
            </span>
            <Link
              href={"/uyeler" as Route}
              className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400"
            >
              Tümü →
            </Link>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-0.5">
            {FEATURED_BREEDERS.map((breeder) => (
              <Link
                key={breeder.id}
                href={"/uyeler" as Route}
                className="flex flex-col items-center shrink-0 w-14 text-center"
              >
                <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#dc5075] to-amber-500">
                  <img
                    src={breeder.image}
                    alt={breeder.name}
                    className="w-full h-full rounded-full object-cover border border-white dark:border-neutral-900"
                    loading="lazy"
                  />
                </div>
                <span className="mt-0.5 text-[9px] font-semibold text-neutral-700 dark:text-neutral-300 truncate w-full">
                  {breeder.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* B) DOĞRUDAN VİTRİN İLANLARI (2 Sütunlu Optimize Mobil Kartlar) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-1">
              <SparklesIcon className="w-4 h-4 text-[#dc5075]" />
              <span>Vitrin İlanları ({VITRIN_LISTINGS.length})</span>
            </h2>
            <Link
              href={"/listing-stay" as Route}
              className="text-[11px] font-extrabold text-[#dc5075]"
            >
              Tüm İlanlar →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {VITRIN_LISTINGS.map((item) => (
              <MobileVitrinCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* E) MOBİL YENİ EKLENEN & GÜNÜN VİTRİN İLANLARI (Sekmeli Yatay Kartlar) */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-3 border border-neutral-200 dark:border-neutral-700 shadow-2xs space-y-3">
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => setMobileListTab("yeni")}
              className={`py-2 rounded-lg transition-all ${
                mobileListTab === "yeni"
                  ? "bg-[#dc5075] text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              ⚡ Yeni Eklenenler
            </button>
            <button
              type="button"
              onClick={() => setMobileListTab("vitrin")}
              className={`py-2 rounded-lg transition-all ${
                mobileListTab === "vitrin"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              ⭐ Günün Vitrini
            </button>
          </div>

          <div className="space-y-2">
            {(mobileListTab === "yeni"
              ? YENI_EKLENEN_ILANLAR
              : GUNUN_VITRIN_ILANLARI
            ).map((item) => (
              <MobileGuncelRowCard
                key={item.id}
                item={item}
                accent={mobileListTab === "yeni" ? "pink" : "green"}
              />
            ))}
          </div>

          <Link
            href={"/listing-stay" as Route}
            className="block w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-center text-xs font-extrabold text-neutral-800 dark:text-neutral-200"
          >
            Tüm Güncel İlanları Gör →
          </Link>
        </div>

        {/* F) MOBİL KONUM HARİTASI KARTI */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-3 border border-neutral-200 dark:border-neutral-700 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4 text-[#dc5075] shrink-0" />
            <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white">
              Konuma Göre İlan Haritası ({mapCity} / {mapDistrict})
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={mapCity}
              onChange={(e) => {
                const newCity = e.target.value;
                setMapCity(newCity);
                const dList = getDistrictsOfCity(newCity);
                setMapDistrict(dList[0]?.name || "Merkez");
              }}
              className="w-full text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-2.5 py-2 text-neutral-800 dark:text-neutral-100"
            >
              {TURKEY_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={mapDistrict}
              onChange={(e) => setMapDistrict(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-2.5 py-2 text-neutral-800 dark:text-neutral-100"
            >
              {currentMapDistricts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full h-[200px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <iframe
              title={`Köpek Evreni Harita - ${mapCity} ${mapDistrict}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                mapCity + " " + mapDistrict + ", Türkiye"
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. MASAÜSTÜ ANA SAYFA DENEYİMİ (>= 768px - BİREBİR KORUNAN TASARIM)    */}
      {/* ===================================================================== */}
      <div className="hidden md:block max-w-[1720px] mx-auto px-6 lg:px-8 xl:px-10 pt-4">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* SOL KOLON: TÜM KÖPEK IRKLARI & ŞEHİRLER */}
          <aside className="w-full lg:w-[320px] xl:w-[350px] shrink-0 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-2xs overflow-hidden">
            <div className="grid grid-cols-2 text-center text-xs font-bold border-b border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => {
                  setSidebarTab(1);
                  setSidebarSearch("");
                }}
                className={`py-3 px-2 transition-colors ${
                  sidebarTab === 1
                    ? "bg-[#dc5075] text-white"
                    : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                }`}
              >
                Tür Kategorisi ({ALL_BREEDS.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSidebarTab(2);
                  setSidebarSearch("");
                }}
                className={`py-3 px-2 transition-colors ${
                  sidebarTab === 2
                    ? "bg-[#802859] text-white"
                    : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                }`}
              >
                Şehir Kategorisi ({CITIES_LIST.length})
              </button>
            </div>

            <div className="p-2 border-b border-neutral-100 dark:border-neutral-700/60 bg-neutral-50 dark:bg-neutral-900/50">
              <div className="relative">
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder={
                    sidebarTab === 1
                      ? "Köpek cinsi filtrele..."
                      : "Şehir filtrele..."
                  }
                  className="w-full text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2.5 py-1.5 pl-7 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#dc5075]"
                />
                <MagnifyingGlassIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-2 top-2" />
                {sidebarSearch && (
                  <button
                    type="button"
                    onClick={() => setSidebarSearch("")}
                    className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-600"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {sidebarTab === 1 && (
              <ul className="max-h-[950px] overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-700/50 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedBreed("TÜMÜ")}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-rose-50/60 dark:hover:bg-neutral-700/50 transition-colors ${
                      selectedBreed === "TÜMÜ"
                        ? "bg-rose-50 dark:bg-neutral-700 font-bold text-[#dc5075]"
                        : "text-neutral-700 dark:text-neutral-200 font-medium"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-[#dc5075]/10 text-[#dc5075] flex items-center justify-center text-base font-bold shrink-0 ring-2 ring-[#dc5075]/30">
                        🐾
                      </span>
                      <span className="text-[13px]">Tüm Köpek Cinsleri</span>
                    </span>
                    <span className="text-[11px] bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full px-2 py-0.5 font-bold">
                      1.120+
                    </span>
                  </button>
                </li>
                {filteredBreeds.map((breed) => {
                  const isActive = selectedBreed === breed.name;
                  return (
                    <li key={breed.slug}>
                      <button
                        type="button"
                        onClick={() => setSelectedBreed(breed.name)}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-rose-50/60 dark:hover:bg-neutral-700/50 transition-colors ${
                          isActive
                            ? "bg-rose-50 dark:bg-neutral-700 font-bold text-[#dc5075]"
                            : "text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        <span className="flex items-center gap-3 truncate pr-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-700 shrink-0 ring-2 ring-neutral-200 dark:ring-neutral-600 shadow-xs">
                            <img
                              src={`/images/breeds/${breed.slug}.png`}
                              alt={breed.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <span className="truncate text-[13px] font-medium">{breed.name}</span>
                        </span>
                        <span
                          className={`text-[11px] rounded-full px-2 py-0.5 font-semibold shrink-0 ${
                            isActive
                              ? "bg-[#dc5075] text-white"
                              : "bg-neutral-100 dark:bg-neutral-700/80 text-neutral-500 dark:text-neutral-400"
                          }`}
                        >
                          ({breed.count})
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {sidebarTab === 2 && (
              <ul className="max-h-[950px] overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-700/50 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedCity("TÜMÜ")}
                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-purple-50/60 dark:hover:bg-neutral-700/50 transition-colors ${
                      selectedCity === "TÜMÜ"
                        ? "bg-purple-50 dark:bg-neutral-700 font-bold text-[#802859] dark:text-[#f26ba8]"
                        : "text-neutral-700 dark:text-neutral-200 font-medium"
                    }`}
                  >
                    <span>Tüm Şehirler (Türkiye)</span>
                    <span className="text-[11px] bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full px-2 py-0.5 font-bold">
                      81 İl
                    </span>
                  </button>
                </li>
                {filteredCities.map((city) => {
                  const isActive = selectedCity === city.name;
                  return (
                    <li key={city.slug}>
                      <button
                        type="button"
                        onClick={() => setSelectedCity(city.name)}
                        className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-purple-50/60 dark:hover:bg-neutral-700/50 transition-colors ${
                          isActive
                            ? "bg-purple-50 dark:bg-neutral-700 font-bold text-[#802859] dark:text-[#f26ba8]"
                            : "text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        <span className="truncate pr-2">{city.name} Köpek İlanları</span>
                        <span
                          className={`text-[11px] rounded-full px-2 py-0.5 font-semibold ${
                            isActive
                              ? "bg-[#802859] text-white"
                              : "bg-neutral-100 dark:bg-neutral-700/80 text-neutral-500 dark:text-neutral-400"
                          }`}
                        >
                          ({city.count})
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </aside>

          {/* SAĞ ANA İÇERİK KOLONU */}
          <div className="flex-1 min-w-0 space-y-6 w-full">
            {/* 2.1 ÖNE ÇIKAN ÜRETİCİLER & KULÜPLER */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border-2 border-dashed border-[#eb567c]/70 p-3 shadow-2xs">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#dc5075] flex items-center gap-1">
                  <SparklesIcon className="w-3.5 h-3.5" />
                  Öne Çıkan Köpek Çiftlikleri, Üreticiler & Irk Kulüpleri
                </span>
                <Link
                  href={"/uyeler" as Route}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-[#dc5075] transition-colors"
                >
                  Tüm Üyeleri Gör →
                </Link>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
                {FEATURED_BREEDERS.map((breeder) => (
                  <Link
                    key={breeder.id}
                    href={"/uyeler" as Route}
                    className="group flex flex-col items-center text-center p-1.5 rounded-lg hover:bg-rose-50/50 dark:hover:bg-neutral-700/40 transition-all"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#dc5075] p-0.5 bg-white shadow-xs group-hover:scale-105 transition-transform">
                      <img
                        src={breeder.image}
                        alt={breeder.name}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-1.5 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-[#dc5075] line-clamp-1">
                      {breeder.name}
                    </span>
                    <span className="text-[9px] text-neutral-400 dark:text-neutral-500 line-clamp-1">
                      {breeder.location}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2.2 VİTRİN İLANLARI BAŞLIK & FİLTRE DURUMU */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-700">
                <div>
                  <h1 className="text-lg sm:text-xl font-extrabold text-[#494949] dark:text-white tracking-tight flex items-center gap-2">
                    <span>Köpek İlanları - Vitrin</span>
                    {(selectedBreed !== "TÜMÜ" || selectedCity !== "TÜMÜ") && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#dc5075]/10 text-[#dc5075]">
                        {selectedBreed !== "TÜMÜ" ? selectedBreed : ""}{" "}
                        {selectedCity !== "TÜMÜ" ? `• ${selectedCity}` : ""}
                      </span>
                    )}
                  </h1>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Köpekleri olanlar ile köpek arayanları buluşturan güncel vitrin ilanları
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {(selectedBreed !== "TÜMÜ" || selectedCity !== "TÜMÜ" || searchTerm) && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="px-3 py-1.5 rounded text-xs font-bold bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors flex items-center gap-1"
                    >
                      <XMarkIcon className="w-3.5 h-3.5" />
                      <span>Filtreyi Temizle</span>
                    </button>
                  )}

                  <Link
                    href={"/listing-stay" as Route}
                    className="px-3 py-1.5 rounded text-xs font-bold bg-[#802859] text-white hover:bg-[#691f48] transition-colors"
                  >
                    Vitrin İlanları ({filteredVitrin.length})
                  </Link>
                  <Link
                    href={"/listing-stay?sort=newest" as Route}
                    className="px-3 py-1.5 rounded text-xs font-bold bg-[#dc5075] text-white hover:bg-[#c43d62] transition-colors"
                  >
                    Güncel İlanlar
                  </Link>
                  <Link
                    href={"/add-listing/1" as Route}
                    className="px-3 py-1.5 rounded text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    + Ücretsiz İlan Ver
                  </Link>
                </div>
              </div>

              {filteredVitrin.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3.5">
                  {filteredVitrin.map((item) => (
                    <VitrinCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    Seçtiğiniz kriterlere uygun vitrin ilanı bulunamadı.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 rounded bg-[#dc5075] text-white text-xs font-bold hover:bg-[#c43d62]"
                  >
                    Tüm Vitrin İlanlarını Göster
                  </button>
                </div>
              )}
            </div>

            {/* 2.3 ALT İKİLİ LİSTE: YENİ EKLENEN İLANLAR & GÜNÜN VİTRİN İLANLARI */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 shadow-2xs">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-[#e7277d]">
                  <h2 className="text-base font-extrabold text-[#e7277d] dark:text-[#f26ba8] tracking-tight">
                    Yeni Eklenen İlanlar
                  </h2>
                  <Link
                    href={"/listing-stay?sort=newest" as Route}
                    className="text-xs font-bold text-[#e7277d] hover:underline"
                  >
                    Tümünü Gör →
                  </Link>
                </div>

                <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
                  {YENI_EKLENEN_ILANLAR.map((item) => (
                    <GuncelListCard key={item.id} item={item} themeColor="pink" />
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 shadow-2xs">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-[#007f00]">
                  <h2 className="text-base font-extrabold text-[#007f00] dark:text-emerald-400 tracking-tight">
                    Günün Vitrin İlanları
                  </h2>
                  <Link
                    href={"/listing-stay" as Route}
                    className="text-xs font-bold text-[#007f00] dark:text-emerald-400 hover:underline"
                  >
                    Tümünü Gör →
                  </Link>
                </div>

                <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
                  {GUNUN_VITRIN_ILANLARI.map((item) => (
                    <GuncelListCard key={item.id} item={item} themeColor="green" />
                  ))}
                </div>
              </div>
            </div>

            {/* 2.4 İLANLARIN ALTINDA ETKİLEŞİMLİ İL / İLÇE HARİTA BİLGİSİ */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-5 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-700">
                <div>
                  <h2 className="text-base font-extrabold text-neutral-800 dark:text-white flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-[#dc5075]" />
                    <span>Konuma Göre Köpek İlanları Haritası ({mapCity} / {mapDistrict})</span>
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    İl ve ilçe seçerek o bölgedeki ilan konumunu harita üzerinde inceleyebilirsiniz.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={mapCity}
                    onChange={(e) => {
                      const newCity = e.target.value;
                      setMapCity(newCity);
                      const dList = getDistrictsOfCity(newCity);
                      setMapDistrict(dList[0]?.name || "Merkez");
                    }}
                    className="text-xs font-semibold rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-[#dc5075]"
                  >
                    {TURKEY_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <select
                    value={mapDistrict}
                    onChange={(e) => setMapDistrict(e.target.value)}
                    className="text-xs font-semibold rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-[#dc5075]"
                  >
                    {currentMapDistricts.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setSelectedCity(mapCity)}
                    className="px-3.5 py-2 rounded bg-[#dc5075] hover:bg-[#c43d62] text-white text-xs font-bold transition-colors"
                  >
                    📍 {mapCity} İlanlarını Filtrele
                  </button>

                  <Link
                    href={"/add-listing/1" as Route}
                    className="px-3.5 py-2 rounded bg-[#802859] hover:bg-[#691f48] text-white text-xs font-bold transition-colors"
                  >
                    + Bu Konumda İlan Ekle
                  </Link>
                </div>
              </div>

              <div className="w-full h-[320px] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-100 relative shadow-inner">
                <iframe
                  title={`Köpek Evreni Harita - ${mapCity} ${mapDistrict}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    mapCity + " " + mapDistrict + ", Türkiye"
                  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>

            {/* 2.5 BİLGİLENDİRME VE KÖPEK IRKLARI PORTAL ÖZETİ */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-5 shadow-2xs space-y-4 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40">
                  <h3 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1.5">
                    <ShieldCheckIcon className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Köpek Evreni Güvenli İlan & Sahiplenme Rehberi</span>
                  </h3>
                  <p>
                    Sitemizde yer alan tüm köpek ilanları, köpek sahipleri ile yeni bir can dostu arayan aileleri doğrudan buluşturmak amacıyla yayınlanmaktadır. Görmeden kapora veya ön ödeme talep eden kişilere itibar etmeyiniz; can dostunuzu mutlaka veteriner kontrolünde teslim alınız.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-800/40">
                  <h3 className="font-bold text-sm text-rose-900 dark:text-rose-300 flex items-center gap-1.5 mb-1.5">
                    <InformationCircleIcon className="w-4 h-4 text-[#dc5075] shrink-0" />
                    <span>Türkiye&apos;nin En Kapsamlı Köpek Cinsleri ve İlan Portalı</span>
                  </h3>
                  <p>
                    Poodle Toy, Maltipoo, Pomeranian Boo, Golden Retriever, Cane Corso, Kangal, French Bulldog ve Chihuahua başta olmak üzere <strong>48 farklı köpek ırkı</strong> ve <strong>81 il</strong> bazında kategorilendirilmiş yüzlerce güncel ilana sol menüden anında ulaşabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
