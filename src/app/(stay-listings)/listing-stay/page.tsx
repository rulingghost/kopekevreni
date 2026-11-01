"use client";

import React, { FC, useState, useMemo, useEffect } from "react";
import PetCard from "@/components/PetCard";
import PetListingFilter, { FilterState } from "@/components/PetListingFilter";
import { MOCK_PET_LISTINGS } from "@/data/mockPets";
import { VITRIN_LISTINGS, YENI_EKLENEN_ILANLAR } from "@/data/kopekDunyasiData";
import {
  getDistrictsOfCity,
  getLocationCoordinates,
  CITIES_LIST as TURKEY_CITIES,
} from "@/data/turkeyLocations";
import { PetListing } from "@/types/pet";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Route } from "@/routers/types";
import { PlusCircleIcon, SparklesIcon, MapPinIcon } from "@heroicons/react/24/outline";

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

  // İlanların Altındaki Harita Bilgisi İçin İl ve İlçe Seçimi
  const [mapCity, setMapCity] = useState(urlCity || "Konya");
  const [mapDistrict, setMapDistrict] = useState(urlCity && urlCity !== "Konya" ? "Merkez" : "Karatay");
  const currentMapDistricts = useMemo(() => getDistrictsOfCity(mapCity), [mapCity]);

  // URL parametreleri değiştiğinde (Örn: Üst menüden Vitrin İlanları veya Yeni Eklenen İlanlar tıklandığında) state'i senkronize et
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

  // Tüm ilan havuzu (MOCK_PET_LISTINGS + Vitrin & Yeni Eklenen İlanlar böylece her ırktan ilan bulunur)
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

  // Filtreleme Algoritması
  const filteredListings = useMemo(() => {
    return allCombinedListings
      .filter((pet) => {
        // Vitrin modu seçiliyse öne çıkan vitrin ilanlarını filtrele
        if (sortBy === "VITRIN" && !pet.featured && !pet.id.startsWith("v-")) {
          return false;
        }
        // 1. İlan Türü
        if (filters.listingType !== "ALL" && pet.listingType !== filters.listingType) {
          return false;
        }
        // 2. Irk
        if (
          filters.breed &&
          !pet.breed.toLowerCase().includes(filters.breed.toLowerCase()) &&
          !pet.breedSlug.toLowerCase().includes(filters.breed.toLowerCase())
        ) {
          return false;
        }
        // 3. Şehir
        if (filters.city && !pet.location.city.toLowerCase().includes(filters.city.toLowerCase())) {
          return false;
        }
        // 4. Arama sorgusu
        if (
          urlQuery &&
          !pet.title.toLowerCase().includes(urlQuery.toLowerCase()) &&
          !pet.description.toLowerCase().includes(urlQuery.toLowerCase()) &&
          !pet.breed.toLowerCase().includes(urlQuery.toLowerCase())
        ) {
          return false;
        }
        // 5. Cinsiyet
        if (filters.gender !== "ALL" && pet.gender !== filters.gender) {
          return false;
        }
        // 6. Yaş Grubu
        if (filters.ageGroup !== "ALL" && pet.ageGroup !== filters.ageGroup) {
          return false;
        }
        // 7. Boyut
        if (filters.size !== "ALL" && pet.size !== filters.size) {
          return false;
        }
        // 8. Sağlık Kriterleri
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
    <div className="min-h-screen py-8 lg:py-12 bg-[#FAF8F5] dark:bg-[#151312] transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ÜST BAŞLIK VE KATEGORİ SEKMELERİ */}
        <div className="pb-6 border-b border-[#EDE7DE] dark:border-neutral-800 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
              {pageHeading}
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-1 font-light">
              Tüm güncel köpek ilanları, vitrin ilanları ve ırk bazlı filtreleme
            </p>
          </div>
        </div>

        {/* ANA İÇERİK: SOL FİLTRE & SAĞ GRİD */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SOL FİLTRE KOLONU */}
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

          {/* SAĞ İLAN LİSTELEME KOLONU */}
          <div className="lg:col-span-3 space-y-6">
            {/* SONUÇ SAYACI VE SIRALAMA */}
            <div className="bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E]">
                Toplam{" "}
                <strong className="text-[#1C1917] dark:text-[#FAF8F5] font-serif text-base">
                  {filteredListings.length}
                </strong>{" "}
                can listeleniyor
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#78716C] dark:text-[#A8A29E]">Görünüm & Sıralama:</span>
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

            {/* İLAN GRİDİ */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredListings.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              /* BOŞ DURUM */
              <div className="text-center py-16 px-4 bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-3xl space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] dark:bg-neutral-800 flex items-center justify-center mx-auto text-[#7A1C30]">
                  <SparklesIcon className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1C1917] dark:text-[#FAF8F5]">
                  Arama Kriterlerinize Uygun Can Bulunamadı
                </h3>
                <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] max-w-md mx-auto">
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

            {/* İLANLARIN ALTINDA HIZLI HARİTA KONUM BİLGİSİ */}
            <div className="bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-3xl p-5 shadow-sm mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#dc5075]/10 text-[#dc5075] flex items-center justify-center shrink-0">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                      İlanların İl & İlçe Harita Bilgisi: <span className="text-[#dc5075]">{mapCity} / {mapDistrict} Merkez</span>
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
