"use client";

import React, { FC, useState, useMemo, useEffect } from "react";
import PetCard from "@/components/PetCard";
import { MobilePetCard } from "@/components/MobileCards";
import PetListingFilter, { FilterState } from "@/components/PetListingFilter";
import { MOCK_PET_LISTINGS } from "@/data/mockPets";
import { ALL_BREEDS, VITRIN_LISTINGS, YENI_EKLENEN_ILANLAR } from "@/data/kopekDunyasiData";
import {
  getDistrictsOfCity,
  getLocationCoordinates,
  CITIES_LIST as TURKEY_CITIES,
} from "@/data/turkeyLocations";
import { PetListing } from "@/types/pet";
import { useSearchParams } from "next/navigation";
import {
  SparklesIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const initialFilterState: FilterState = {
  listingType: "ALL",
  breed: "",
  city: "",
  ageGroup: "ALL",
  gender: "ALL",
  size: "ALL",
  vaccinated: false,
  microchipped: false,
  neutered: false,
  houseTrained: false,
  apartmentFriendly: false,
  pedigree: false,
  isUrgentOnly: false,
};

const ListingStayPage: FC = () => {
  const searchParams = useSearchParams();
  const urlType = searchParams.get("type");
  const urlBreed = searchParams.get("breed");
  const urlCity = searchParams.get("city");
  const urlQuery = searchParams.get("q");
  const urlSort = searchParams.get("sort");

  const [filters, setFilters] = useState<FilterState>({
    ...initialFilterState,
    listingType: (urlType as any) || "ALL",
    breed: urlBreed || "",
    city: urlCity || "",
  });

  const [sortBy, setSortBy] = useState<"NEWEST" | "POPULAR" | "VITRIN">(() => {
    if (urlSort?.toLowerCase() === "vitrin") return "VITRIN";
    if (urlSort?.toUpperCase() === "POPULAR") return "POPULAR";
    return "NEWEST";
  });

  const [showMobileExtraFilters, setShowMobileExtraFilters] = useState(false);

  const [mapCity, setMapCity] = useState(urlCity || "Konya");
  const [mapDistrict, setMapDistrict] = useState(
    urlCity && urlCity !== "Konya" ? "Merkez" : "Karatay"
  );
  const currentMapDistricts = useMemo(() => getDistrictsOfCity(mapCity), [mapCity]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      listingType: (urlType as any) || "ALL",
      breed: urlBreed || "",
      city: urlCity || "",
    }));
    if (urlSort?.toLowerCase() === "vitrin") {
      setSortBy("VITRIN");
    } else if (urlSort?.toLowerCase() === "newest") {
      setSortBy("NEWEST");
    } else if (urlSort?.toLowerCase() === "popular") {
      setSortBy("POPULAR");
    }
    if (urlCity) {
      setMapCity(urlCity);
      const d = getDistrictsOfCity(urlCity);
      setMapDistrict(d[0]?.name || "Merkez");
    }
  }, [urlType, urlBreed, urlCity, urlSort]);

  const allCombinedListings: PetListing[] = useMemo(() => {
    const convertedVitrin: PetListing[] = VITRIN_LISTINGS.map((v) => {
      const coords = getLocationCoordinates(v.city, "Merkez");
      const img = `/images/breeds/${v.breedSlug}.png`;
      return {
        id: v.id,
        slug: v.id,
        title: v.title,
        description: `${v.city} merkezde aşıları ve mikroçipi tam safkan ${v.breed} dostumuz.`,
        listingType: "ADOPTION",
        petType: "DOG",
        breed: v.breed,
        breedSlug: v.breedSlug,
        gender: v.gender === "Erkek" ? "MALE" : "FEMALE",
        ageGroup: "PUPPY",
        exactAgeText: v.ageText,
        size: "MEDIUM",
        featured: true,
        badges: {
          vaccinated: true,
          microchipped: true,
          neutered: false,
          internalParasite: true,
          houseTrained: true,
          pedigree: true,
          apartmentFriendly: true,
        },
        location: {
          city: v.city,
          district: "Merkez",
          lat: coords.lat,
          lng: coords.lng,
        },
        featuredImage: img,
        galleryImages: [img],
        contact: {
          phone: "+90 532 444 00 00",
          whatsapp: "905324440000",
          showPhone: true,
          preferredContact: "ANY",
        },
        author: {
          id: `author-${v.id}`,
          name: "Doğrulanmış Üye",
          avatar: img,
          memberSince: "2024",
          badge: v.status,
          verified: true,
        },
        publishedAt: "Bugün",
        viewsCount: v.views,
        likesCount: Math.floor(v.views / 3),
      };
    });

    const convertedYeni: PetListing[] = YENI_EKLENEN_ILANLAR.map((y) => {
      const coords = getLocationCoordinates(y.city, y.district);
      const img = `/images/breeds/${y.breedSlug}.png`;
      return {
        id: y.id,
        slug: y.id,
        title: y.title,
        description: `${y.city} ${y.district} bölgesinde yeni eklenen safkan ${y.breed} ilanımız.`,
        listingType: "MATING",
        petType: "DOG",
        breed: y.breed,
        breedSlug: y.breedSlug,
        gender: y.gender === "Erkek" ? "MALE" : "FEMALE",
        ageGroup: "PUPPY",
        exactAgeText: y.ageText,
        size: "MEDIUM",
        featured: false,
        badges: {
          vaccinated: true,
          microchipped: true,
          neutered: false,
          internalParasite: true,
          houseTrained: true,
          pedigree: true,
          apartmentFriendly: true,
        },
        location: {
          city: y.city,
          district: y.district,
          lat: coords.lat,
          lng: coords.lng,
        },
        featuredImage: img,
        galleryImages: [img],
        contact: {
          phone: "+90 532 444 00 00",
          whatsapp: "905324440000",
          showPhone: true,
          preferredContact: "ANY",
        },
        author: {
          id: `author-${y.id}`,
          name: "Doğrulanmış Üye",
          avatar: img,
          memberSince: "2025",
          badge: y.status,
          verified: true,
        },
        publishedAt: y.dateText,
        viewsCount: 310,
        likesCount: 65,
      };
    });

    return [...MOCK_PET_LISTINGS, ...convertedVitrin, ...convertedYeni];
  }, []);

  const filteredListings = useMemo(() => {
    return allCombinedListings
      .filter((pet) => {
        if (sortBy === "VITRIN" && !pet.featured && !pet.id.startsWith("v-")) {
          return false;
        }
        if (filters.listingType !== "ALL" && pet.listingType !== filters.listingType) {
          return false;
        }
        if (
          filters.breed &&
          !pet.breed.toLowerCase().includes(filters.breed.toLowerCase()) &&
          !pet.breedSlug.toLowerCase().includes(filters.breed.toLowerCase())
        ) {
          return false;
        }
        if (filters.city && !pet.location.city.toLowerCase().includes(filters.city.toLowerCase())) {
          return false;
        }
        if (
          urlQuery &&
          !pet.title.toLowerCase().includes(urlQuery.toLowerCase()) &&
          !pet.description.toLowerCase().includes(urlQuery.toLowerCase()) &&
          !pet.breed.toLowerCase().includes(urlQuery.toLowerCase())
        ) {
          return false;
        }
        if (filters.gender !== "ALL" && pet.gender !== filters.gender) {
          return false;
        }
        if (filters.ageGroup !== "ALL" && pet.ageGroup !== filters.ageGroup) {
          return false;
        }
        if (filters.size !== "ALL" && pet.size !== filters.size) {
          return false;
        }
        if (filters.vaccinated && !pet.badges.vaccinated) return false;
        if (filters.microchipped && !pet.badges.microchipped) return false;
        if (filters.neutered && !pet.badges.neutered) return false;
        if (filters.houseTrained && !pet.badges.houseTrained) return false;
        if (filters.apartmentFriendly && !pet.badges.apartmentFriendly) return false;
        if (filters.pedigree && !pet.badges.pedigree) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "VITRIN") {
          const aIsVitrin = a.id.startsWith("v-") ? 1 : 0;
          const bIsVitrin = b.id.startsWith("v-") ? 1 : 0;
          if (aIsVitrin !== bIsVitrin) return bIsVitrin - aIsVitrin;
          return b.viewsCount - a.viewsCount;
        }
        if (sortBy === "NEWEST") {
          const aIsYeni = a.id.startsWith("yeni-") ? 1 : 0;
          const bIsYeni = b.id.startsWith("yeni-") ? 1 : 0;
          if (aIsYeni !== bIsYeni) return bIsYeni - aIsYeni;
          return b.viewsCount - a.viewsCount;
        }
        return b.likesCount - a.likesCount;
      });
  }, [allCombinedListings, filters, sortBy, urlQuery]);

  const handleReset = () => {
    setFilters(initialFilterState);
    setSortBy("NEWEST");
  };

  const pageHeading = useMemo(() => {
    if (filters.breed) return `🐾 ${filters.breed} İlanları`;
    if (sortBy === "VITRIN") return "✨ Vitrin İlanları";
    if (urlSort?.toLowerCase() === "newest") return "⚡ Yeni Eklenen İlanlar";
    return "Köpek İlanları";
  }, [filters.breed, sortBy, urlSort]);

  return (
    <div className="min-h-screen pb-16 md:py-10 bg-[#FAF8F5] dark:bg-[#151312] transition-colors">
      {/* ===================================================================== */}
      {/* 1. KOMPAKT MOBİL İLANLAR SAYFASI + BOTTOM SHEET FİLTRE (< 768px)      */}
      {/* ===================================================================== */}
      <div className="block md:hidden px-2.5 pt-2.5 space-y-2.5">
        {/* Tek Satır Kompakt Üst Bar: Başlık & Bottom Sheet Filtrele Butonu */}
        <div className="flex items-center justify-between bg-white dark:bg-neutral-800 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-2xs">
          <div className="min-w-0 pr-2">
            <h1 className="font-serif text-sm font-extrabold text-[#1C1917] dark:text-[#FAF8F5] truncate">
              {pageHeading} ({filteredListings.length})
            </h1>
            {(filters.breed || filters.city || filters.gender !== "ALL") && (
              <p className="text-[10px] text-[#dc5075] font-semibold truncate">
                {filters.breed || "Tüm Irklar"} {filters.city ? `• ${filters.city}` : ""}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowMobileExtraFilters(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 bg-[#dc5075] text-white shadow-2xs shrink-0"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            <span>Filtrele</span>
          </button>
        </div>

        {/* Mobil 2 Sütunlu İlan Grid'i (Doğrudan Başlar) */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {filteredListings.map((pet) => (
              <MobilePetCard key={pet.id} item={pet} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 text-center border border-neutral-200 dark:border-neutral-700 space-y-2.5">
            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              Seçtiğiniz kriterlere uygun ilan bulunamadı.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-[#dc5075] text-white text-xs font-bold"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

        {/* MOBİL BOTTOM SHEET (ALTTAN AÇILIR DETAYLI FİLTRE PANELİ) */}
        {showMobileExtraFilters && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs">
            <div
              className="flex-1"
              onClick={() => setShowMobileExtraFilters(false)}
            />
            <div className="bg-white dark:bg-neutral-900 rounded-t-3xl border-t border-neutral-200 dark:border-neutral-800 p-4 space-y-4 max-h-[82vh] overflow-y-auto shadow-2xl">
              <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto" />
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  İlanları Filtrele & Sırala
                </h3>
                <button
                  type="button"
                  onClick={() => setShowMobileExtraFilters(false)}
                  className="text-xs font-bold text-neutral-500 px-2 py-1"
                >
                  Kapat ✕
                </button>
              </div>

              {/* Sıralama & Kategori */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-500 uppercase">
                  İlan Türü & Sıralama
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy("NEWEST");
                      setFilters((p) => ({ ...p, listingType: "ALL" }));
                    }}
                    className={`py-2 rounded-xl border ${
                      sortBy === "NEWEST"
                        ? "bg-[#dc5075] text-white border-[#dc5075]"
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    ⚡ Yeni
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy("VITRIN")}
                    className={`py-2 rounded-xl border ${
                      sortBy === "VITRIN"
                        ? "bg-[#802859] text-white border-[#802859]"
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    ✨ Vitrin
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy("POPULAR")}
                    className={`py-2 rounded-xl border ${
                      sortBy === "POPULAR"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    🔥 Popüler
                  </button>
                </div>
              </div>

              {/* 48 Köpek Cinsi Seçimi */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-500 uppercase">
                  Köpek Cinsi (48 Irk)
                </label>
                <select
                  value={filters.breed}
                  onChange={(e) => setFilters((p) => ({ ...p, breed: e.target.value }))}
                  className="w-full text-xs font-semibold bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-neutral-800 dark:text-neutral-100"
                >
                  <option value="">Tüm Köpek Cinsleri (48)</option>
                  {ALL_BREEDS.map((b) => (
                    <option key={b.slug} value={b.name}>
                      {b.name} ({b.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* 81 Şehir Seçimi */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-500 uppercase">
                  Şehir (81 İl)
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters((p) => ({ ...p, city: e.target.value }))}
                  className="w-full text-xs font-semibold bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-neutral-800 dark:text-neutral-100"
                >
                  <option value="">Tüm Şehirler (81)</option>
                  {TURKEY_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cinsiyet */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-500 uppercase">
                  Cinsiyet
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                  {[
                    { label: "Tümü", val: "ALL" },
                    { label: "Erkek ♂", val: "MALE" },
                    { label: "Dişi ♀", val: "FEMALE" },
                  ].map((g) => (
                    <button
                      key={g.val}
                      type="button"
                      onClick={() => setFilters((p) => ({ ...p, gender: g.val as any }))}
                      className={`py-2 rounded-xl border ${
                        filters.gender === g.val
                          ? "bg-[#dc5075] text-white border-[#dc5075]"
                          : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alt Aksiyon Butonları */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    setShowMobileExtraFilters(false);
                  }}
                  className="py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300"
                >
                  Temizle
                </button>
                <button
                  type="button"
                  onClick={() => setShowMobileExtraFilters(false)}
                  className="py-2.5 rounded-xl bg-[#dc5075] text-white text-xs font-extrabold shadow-md"
                >
                  İlanları Göster ({filteredListings.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 2. MASAÜSTÜ İLANLAR SAYFASI (>= 768px - BİREBİR KORUNAN TASARIM)       */}
      {/* ===================================================================== */}
      <div className="hidden md:block max-w-[1720px] mx-auto px-6 lg:px-8 xl:px-10">
        {/* ÜST BAŞLIK */}
        <div className="pb-6 border-b border-[#EDE7DE] dark:border-neutral-800 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
              {pageHeading}
            </h1>
            <p className="text-sm text-[#78716C] dark:text-[#A8A29E] mt-2 font-light">
              Tüm güncel köpek ilanları, vitrin ilanları ve ırk bazlı filtreleme
            </p>
          </div>
        </div>

        {/* ANA İÇERİK: SOL FİLTRE & SAĞ GRİD */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PetListingFilter
              filters={filters}
              onChange={(newFilters) => {
                setFilters(newFilters);
                if (newFilters.city) {
                  setMapCity(newFilters.city);
                  const d = getDistrictsOfCity(newFilters.city);
                  setMapDistrict(d[0]?.name || "Merkez");
                }
              }}
              onReset={handleReset}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-2xl px-5 py-3.5 flex items-center justify-between gap-3 shadow-sm">
              <div className="text-sm text-[#78716C] dark:text-[#A8A29E]">
                Toplam{" "}
                <strong className="text-[#1C1917] dark:text-[#FAF8F5] font-serif text-base">
                  {filteredListings.length}
                </strong>{" "}
                can listeleniyor
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#78716C] dark:text-[#A8A29E]">
                  Görünüm & Sıralama:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] border border-[#EDE7DE] dark:border-neutral-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#7A1C30] cursor-pointer"
                >
                  <option value="NEWEST">Yeni Eklenen İlanlar</option>
                  <option value="VITRIN">Vitrin İlanları</option>
                  <option value="POPULAR">En Çok İncelenenler</option>
                </select>
              </div>
            </div>

            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredListings.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-3xl space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] dark:bg-neutral-800 flex items-center justify-center mx-auto text-[#7A1C30]">
                  <SparklesIcon className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1C1917] dark:text-[#FAF8F5]">
                  Arama Kriterlerinize Uygun Can Bulunamadı
                </h3>
                <p className="text-sm text-[#78716C] dark:text-[#A8A29E] max-w-md mx-auto">
                  Seçtiğiniz filtreleri genişleterek veya sıfırlayarak diğer köpek ilanlarımızı inceleyebilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#7A1C30] text-white text-xs font-semibold hover:bg-[#601424] transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}

            <div className="bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-3xl p-5 shadow-sm mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#dc5075]/10 text-[#dc5075] flex items-center justify-center shrink-0">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                      İlanların İl & İlçe Harita Bilgisi:{" "}
                      <span className="text-[#dc5075]">
                        {mapCity} / {mapDistrict} Merkez
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Her ilan kartının altında il/ilçe konumu ve ilan detay sayfasında tam harita bilgisi yer alır.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={mapCity}
                    onChange={(e) => {
                      const newCity = e.target.value;
                      setMapCity(newCity);
                      setFilters((prev) => ({ ...prev, city: newCity }));
                      const dList = getDistrictsOfCity(newCity);
                      setMapDistrict(dList[0]?.name || "Merkez");
                    }}
                    className="text-xs font-bold bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#dc5075]"
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
                    className="text-xs font-bold bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#dc5075]"
                  >
                    {currentMapDistricts.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} Merkez
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingStayPage;
