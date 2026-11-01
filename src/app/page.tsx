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
      // Irk filtresi
      if (selectedBreed !== "TÜMÜ") {
        if (
          item.breed !== selectedBreed &&
          !item.breed.toLowerCase().includes(selectedBreed.toLowerCase())
        ) {
          return false;
        }
      }
      // Şehir filtresi
      if (selectedCity !== "TÜMÜ") {
        if (item.city !== selectedCity) {
          return false;
        }
      }
      // Arama kelimesi
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

  // Filtreleri Sıfırlama
  const resetFilters = () => {
    setSelectedBreed("TÜMÜ");
    setSelectedCity("TÜMÜ");
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#151312] text-[#1C1917] dark:text-[#E8E4DF] transition-colors pb-12">
      {/* ANA GÖVDE: SOLDA CİNS LİSTESİ SIDEBAR, SAĞDA VİTRİN & LİSTELER */}
      <div className="max-w-[1720px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 pt-3 sm:pt-4">
        <div className="flex flex-col lg:flex-row gap-3.5 sm:gap-5 items-start">
          
          {/* ========================================================= */}
          {/* SOL KOLON: TÜM KÖPEK IRKLARI & ŞEHİRLER (SAYILARLA BİREBİR) */}
          {/* ========================================================= */}
          <aside className="w-full lg:w-[320px] xl:w-[350px] shrink-0 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-2xs overflow-hidden">
            {/* SEKMELER: TÜR KATEGORİSİ / ŞEHİR KATEGORİSİ */}
            <div className="grid grid-cols-2 text-center text-[11px] sm:text-xs font-bold border-b border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => {
                  setSidebarTab(1);
                  setSidebarSearch("");
                }}
                className={`py-2 sm:py-2.5 px-2 transition-colors ${
                  sidebarTab === 1
                    ? "bg-[#dc5075] text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                }`}
              >
                Tür Kategorisi (48 Irk)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSidebarTab(2);
                  setSidebarSearch("");
                }}
                className={`py-2 sm:py-2.5 px-2 transition-colors ${
                  sidebarTab === 2
                    ? "bg-[#18b418] text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                }`}
              >
                Şehir Kategorisi
              </button>
            </div>

            {/* HIZLI FİLTRELEME ARAMA KUTUSU */}
            <div className="p-1.5 sm:p-2 border-b border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    sidebarTab === 1 ? "Irk / cins ara..." : "Şehir ara..."
                  }
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full text-[11px] sm:text-xs py-1.5 pl-7 pr-6 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#dc5075]"
                />
                <MagnifyingGlassIcon className="w-3.5 h-3.5 absolute left-2 top-2 text-neutral-400" />
                {sidebarSearch && (
                  <button
                    onClick={() => setSidebarSearch("")}
                    className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-600"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* SEÇİLEN FİLTRE AKTİF İSE BİLGİ */}
            {(selectedBreed !== "TÜMÜ" || selectedCity !== "TÜMÜ") && (
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-amber-800 dark:text-amber-200 truncate">
                  Filtre: {selectedBreed !== "TÜMÜ" ? selectedBreed : selectedCity}
                </span>
                <button
                  onClick={resetFilters}
                  className="text-rose-600 dark:text-rose-400 font-bold hover:underline shrink-0"
                >
                  Sıfırla
                </button>
              </div>
            )}

            {/* LİSTE ALANI (Mobilde kompakt 2 sütun ve orantılı yükseklik, masaüstünde 1 sütun) */}
            <div className="max-h-[185px] sm:max-h-[260px] lg:max-h-[950px] overflow-y-auto custom-scrollbar grid grid-cols-2 lg:grid-cols-1 gap-px bg-neutral-100 dark:bg-neutral-700/60 text-xs">
              {sidebarTab === 1 ? (
                // 1. TÜR LİSTESİ
                filteredBreeds.length > 0 ? (
                  filteredBreeds.map((breed) => {
                    const isSelected = selectedBreed === breed.name;
                    return (
                      <button
                        key={breed.slug}
                        type="button"
                        onClick={() => {
                          setSelectedBreed(isSelected ? "TÜMÜ" : breed.name);
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1.5 lg:px-3 lg:py-2.5 text-left transition-colors group ${
                          isSelected
                            ? "bg-rose-50 dark:bg-rose-950/40 text-[#dc5075] font-bold"
                            : "bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 text-neutral-800 dark:text-neutral-200"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 min-w-0 pr-1">
                          <div className={`w-7 h-7 sm:w-9 sm:h-9 lg:w-14 lg:h-14 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 ring-1 lg:ring-2 ${
                            isSelected ? "ring-[#dc5075]" : "ring-neutral-200 dark:ring-neutral-600 group-hover:ring-[#dc5075]"
                          } shadow-xs flex items-center justify-center`}>
                            <img
                              src={breed.image || `/images/breeds/${breed.slug}.png`}
                              alt={breed.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <span className="truncate font-bold text-[10px] sm:text-xs lg:text-sm">{breed.name}</span>
                        </div>
                        <span
                          className={`shrink-0 text-[9px] lg:text-xs font-bold px-1.5 lg:px-2.5 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-[#dc5075] text-white"
                              : "bg-amber-500 text-white"
                          }`}
                        >
                          {breed.count}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-2 lg:col-span-1 p-4 text-center text-xs text-neutral-400 bg-white dark:bg-neutral-800">
                    Sonuç bulunamadı.
                  </div>
                )
              ) : (
                // 2. ŞEHİR LİSTESİ
                filteredCities.length > 0 ? (
                  filteredCities.map((city) => {
                    const isSelected = selectedCity === city.name;
                    return (
                      <button
                        key={city.slug}
                        type="button"
                        onClick={() => {
                          setSelectedCity(isSelected ? "TÜMÜ" : city.name);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 lg:px-3 lg:py-2 text-left transition-colors ${
                          isSelected
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-[#18b418] font-bold"
                            : "bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 text-neutral-800 dark:text-neutral-200"
                        }`}
                      >
                        <span className="truncate pr-1 text-[11px] lg:text-xs">{city.name}</span>
                        <span
                          className={`shrink-0 text-[9px] lg:text-[11px] font-bold px-1.5 lg:px-2 py-0.5 rounded-full bg-[#18b418] text-white`}
                        >
                          {city.count}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-2 lg:col-span-1 p-4 text-center text-xs text-neutral-400 bg-white dark:bg-neutral-800">
                    Sonuç bulunamadı.
                  </div>
                )
              )}
            </div>

            {/* GÜVENLİ PLATFORM BİLGİSİ */}
            <div className="hidden lg:block p-3 bg-neutral-50 dark:bg-neutral-800/80 border-t border-neutral-200 dark:border-neutral-700 text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100">
                <ShieldCheckIcon className="w-4 h-4 text-[#18b418]" />
                <span>Güvenli İlan Platformu</span>
              </div>
              <p className="leading-tight text-[10px]">
                Köpek sahipleri ile köpek arayanların doğrudan buluştuğu ilan ve ırk portalı.
              </p>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* SAĞ ANA ALAN: HİKAYE ÇİFTLİKLERİ, VİTRİN VE GÜNCEL LİSTELER */}
          {/* ========================================================= */}
          <div className="w-full flex-1 min-w-0 space-y-3.5 sm:space-y-5">
            
            {/* 1. ÖNE ÇIKAN ÇİFTLİKLER / KURUMSAL FİRMALAR (DAİRESEL ROZETLER) */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-2 sm:p-3 shadow-2xs">
              <div className="flex items-center justify-between gap-3 sm:gap-6 overflow-x-auto no-scrollbar pb-0.5">
                {FEATURED_BREEDERS.map((breeder) => (
                  <Link
                    key={breeder.id}
                    href={"/uyeler" as Route}
                    className="flex flex-col items-center shrink-0 cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#dc5075] via-amber-400 to-[#802859] group-hover:scale-105 transition-transform">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-neutral-900 p-0.5">
                        <img
                          src={breeder.image}
                          alt={breeder.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 dark:text-neutral-200 mt-1 group-hover:text-[#dc5075] transition-colors truncate max-w-[85px] sm:max-w-[110px]">
                      {breeder.name}
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-neutral-500 dark:text-neutral-400">
                      {breeder.location}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. VİTRİN İLANLARI (5'Lİ GRİD - FOTOĞRAFLI KÖPEK KARTLARI) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-amber-500" />
                  <h2 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 tracking-tight">
                    VİTRİN İLANLARI
                  </h2>
                  <span className="text-xs text-neutral-500 font-normal">
                    ({filteredVitrin.length} Can Listeleniyor)
                  </span>
                </div>

                {/* Filtre aktif ise temizle */}
                {(selectedBreed !== "TÜMÜ" || selectedCity !== "TÜMÜ") && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline"
                  >
                    Filtreleri Temizle ({selectedBreed !== "TÜMÜ" ? selectedBreed : ""}{selectedCity !== "TÜMÜ" ? ` - ${selectedCity}` : ""})
                  </button>
                )}
              </div>

              {/* 5-6 SÜTUNLU KART GRİDİ (Mobilde 2 eşit kompakt sütun) */}
              {filteredVitrin.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3.5">
                  {filteredVitrin.map((item) => (
                    <VitrinCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-8 text-center space-y-2">
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Seçilen kriterlere uygun vitrin ilanı bulunamadı.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-1.5 text-xs font-semibold bg-[#dc5075] text-white rounded hover:bg-[#c93f64] transition-colors"
                  >
                    Tüm Vitrin İlanlarını Göster
                  </button>
                </div>
              )}
            </div>

            {/* 3. PEMBE BAŞLIKLI BÖLÜM: YENİ EKLENEN İLANLAR (TAVSİYE EDİLENLER) */}
            <section className="space-y-0">
              {/* PEMBE BAŞLIK BANTI */}
              <div
                style={{
                  background:
                    "linear-gradient(0deg, rgba(220,80,117,1) 0%, rgba(227,97,148,1) 100%)",
                }}
                className="h-9 px-4 rounded-t-lg flex items-center justify-between text-white shadow-xs"
              >
                <h3 className="font-bold text-xs sm:text-sm tracking-wide">
                  YENİ EKLENEN İLANLAR (TAVSİYE EDİLENLER)
                </h3>
                <Link
                  href={"/listing-stay?sort=newest" as Route}
                  className="text-[11px] font-semibold hover:underline text-rose-100"
                >
                  Tümünü Gör →
                </Link>
              </div>

              {/* 2 SÜTUNLU LİSTE KARTLARI */}
              <div className="p-3 bg-white dark:bg-neutral-800 rounded-b-lg border border-t-0 border-neutral-200 dark:border-neutral-700 shadow-2xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {YENI_EKLENEN_ILANLAR.map((item) => (
                    <GuncelListCard
                      key={item.id}
                      item={item}
                      themeColor="pink"
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. YEŞİL BAŞLIKLI BÖLÜM: GÜNÜN VİTRİN İLANLARI (YENİ KATILANLAR) */}
            <section className="space-y-0 pt-2">
              {/* YEŞİL BAŞLIK BANTI */}
              <div
                style={{
                  background:
                    "linear-gradient(0deg, rgba(132,176,0,1) 0%, rgba(158,192,0,1) 100%)",
                }}
                className="h-9 px-4 rounded-t-lg flex items-center justify-between text-white shadow-xs"
              >
                <h3 className="font-bold text-xs sm:text-sm tracking-wide">
                  GÜNÜN VİTRİN İLANLARI (YENİ KATILANLAR)
                </h3>
                <Link
                  href={"/listing-stay" as Route}
                  className="text-[11px] font-semibold hover:underline text-emerald-100"
                >
                  Tümünü Gör →
                </Link>
              </div>

              {/* 2 SÜTUNLU LİSTE KARTLARI */}
              <div className="p-3 bg-white dark:bg-neutral-800 rounded-b-lg border border-t-0 border-neutral-200 dark:border-neutral-700 shadow-2xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {GUNUN_VITRIN_ILANLARI.map((item) => (
                    <GuncelListCard
                      key={item.id}
                      item={item}
                      themeColor="green"
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 5. İLANLARIN ALTINDA HIZLI İL & İLÇE HARİTA KONUM BİLGİSİ (SAYFA YAVAŞLATMAYAN HAFİF YAPI) */}
            <section className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#dc5075]/10 text-[#dc5075] flex items-center justify-center shrink-0">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
                      İlanların İl & İlçe Harita Konum Bilgisi: <span className="text-[#dc5075]">{mapCity} / {mapDistrict} Merkez</span>
                    </h3>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Her ilanın detay sayfasının altında o ilanın bulunduğu il ve ilçe merkez haritası yer almaktadır.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={mapCity}
                    onChange={(e) => {
                      const newCity = e.target.value;
                      setMapCity(newCity);
                      setSelectedCity(newCity);
                      const dList = getDistrictsOfCity(newCity);
                      setMapDistrict(dList[0]?.name || "Merkez");
                    }}
                    className="text-xs font-bold bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-1.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#dc5075]"
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
                    className="text-xs font-bold bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-1.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#dc5075]"
                  >
                    {currentMapDistricts.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} Merkez
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* 6. RESMİ SEO VE PLATFORM BİLGİLENDİRME KUTUSU */}
            <div className="bg-[#FAF8F5] dark:bg-neutral-800/60 rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 text-xs text-neutral-700 dark:text-neutral-300 space-y-2.5 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                <InformationCircleIcon className="w-5 h-5 text-[#dc5075]" />
                <span className="text-sm">
                  Köpek Sahipleri ve Köpek Arayanların Buluşma Platformu
                </span>
              </div>

              <p>
                Platformumuz Türkiye genelinde köpekleri olanlar ile köpek arayanları bir araya getiren bağımsız bir ilan ve ırk portalıdır. Sitemiz, köpek sahiplerinin ilanlarını doğrudan ilgililere ulaştırmasını, ırk özellikleri ve güncel bilgileri güvenle inceleyebilmesini sağlar.
              </p>

              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                <strong>GÜVENLİ İLAN VE BİLGİLENDİRME: </strong>
                Sitemiz aracılık veya komisyonculuk yapmaz. İlan veren kişi ile o ilanla ilgilenen kişiler aralarında doğrudan iletişim kurarlar. Alışveriş yapacağınız ilan sahiplerine mutlaka aşı karnesi, mikroçip kaydı ve sağlık durumunu sorunuz. Teslim almadığınız can için önceden hiçbir ad altında para veya kapora kesinlikle göndermeyiniz.
              </p>

              <p>
                Yönetmeliğe tabi satış yerlerinde 2 aylıktan küçük ve aşısı yapılmamış yavruların teslimi uygun değildir. Sitemizde yasaklı ırk ilanlarına kesinlikle izin verilmemektedir. Hukuka veya mevzuata aykırı olduğunu düşündüğünüz içerikleri lütfen iletişim kanallarımızdan bize bildiriniz.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
