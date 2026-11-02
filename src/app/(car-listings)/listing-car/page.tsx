"use client";

import React, { FC, useState, useMemo } from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import BreedCard from "@/components/BreedCard";
import { MobileBreedCard } from "@/components/MobileCards";
import { MOCK_BREEDS } from "@/data/mockBreeds";
import { ALL_BREEDS } from "@/data/kopekDunyasiData";
import { SizeGroup } from "@/types/pet";
import {
  SparklesIcon,
  MagnifyingGlassIcon,
  HomeModernIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  HeartIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type FeatureFilter =
  | "ALL"
  | "APARTMENT"
  | "LOW_SHEDDING"
  | "EASY_TRAIN"
  | "WATCHDOG"
  | "KIDS_FRIENDLY";

const POPULAR_QUICK_BREEDS = [
  "Poodle - Toy",
  "Maltipoo",
  "Pomeranian Boo",
  "Maltese Terrier",
  "Cane Corso",
  "Golden Retriever",
  "Doberman",
  "Kangal",
  "French Bulldog",
];

const ListingCarPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<"ALL" | SizeGroup>("ALL");
  const [featureFilter, setFeatureFilter] = useState<FeatureFilter>("ALL");

  const quickMatchedBreeds = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase().trim();
    return MOCK_BREEDS.filter((breed) => {
      const matchName = breed.name.toLowerCase().includes(q);
      const matchSlug = breed.slug.toLowerCase().includes(q);
      const matchAlt = breed.alternativeNames?.some((alt) =>
        alt.toLowerCase().includes(q)
      );
      return matchName || matchSlug || matchAlt;
    }).slice(0, 6);
  }, [searchTerm]);

  const filteredBreeds = useMemo(() => {
    return MOCK_BREEDS.filter((breed) => {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = breed.name.toLowerCase().includes(query);
        const matchesOrigin = breed.physical.originCountry
          .toLowerCase()
          .includes(query);
        const matchesAlt = breed.alternativeNames?.some((alt) =>
          alt.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesOrigin && !matchesAlt) return false;
      }

      if (selectedSize !== "ALL") {
        if (selectedSize === "LARGE") {
          if (breed.sizeCategory !== "LARGE" && breed.sizeCategory !== "GIANT")
            return false;
        } else if (breed.sizeCategory !== selectedSize) {
          return false;
        }
      }

      if (
        featureFilter === "APARTMENT" &&
        breed.ratings.apartmentSuitability < 4
      )
        return false;
      if (featureFilter === "LOW_SHEDDING" && breed.ratings.sheddingLevel > 2)
        return false;
      if (featureFilter === "EASY_TRAIN" && breed.ratings.trainability < 4)
        return false;
      if (featureFilter === "WATCHDOG" && breed.ratings.watchdogAbility < 4)
        return false;
      if (
        featureFilter === "KIDS_FRIENDLY" &&
        breed.ratings.goodWithChildren < 4
      )
        return false;

      return true;
    });
  }, [searchTerm, selectedSize, featureFilter]);

  return (
    <div className="min-h-screen pb-16 md:py-14 bg-[#FAF8F5] dark:bg-[#151312] transition-colors">
      {/* ===================================================================== */}
      {/* 1. SIFIRDAN YAZILMIŞ MOBİL KÖPEK CİNSLERİ SAYFASI (< 768px)            */}
      {/* ===================================================================== */}
      <div className="block md:hidden px-3 pt-3 space-y-3.5">
        {/* Mobil Başlık */}
        <div>
          <h1 className="font-serif text-xl font-extrabold text-[#1C1917] dark:text-[#FAF8F5]">
            Köpek Cinsleri ({filteredBreeds.length})
          </h1>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            48 köpek ırkını inceleyin ve doğrudan o ırkın ilanlarına ulaşın
          </p>
        </div>

        {/* Mobil Arama Kutusu */}
        <div className="relative">
          <input
            type="text"
            placeholder="48 köpek cinsi içinde ara... (Poodle, Kangal, Golden)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:border-[#dc5075]"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-[#dc5075] absolute left-3 top-3" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-2.5 text-neutral-400"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobil Boyut Filtre Sekmeleri */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: "ALL", label: "Tümü (48)" },
            { id: "MINI", label: "Minyatür" },
            { id: "SMALL", label: "Küçük Irk" },
            { id: "MEDIUM", label: "Orta Boy" },
            { id: "LARGE", label: "Büyük & Dev" },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setSelectedSize(btn.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                selectedSize === btn.id
                  ? "bg-[#7A1C30] text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Mobil Özellik Filtre Sekmeleri */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: "ALL", label: "Tüm Özellikler" },
            { id: "APARTMENT", label: "🏢 Apartman" },
            { id: "LOW_SHEDDING", label: "✨ Tüy Dökmeyen" },
            { id: "EASY_TRAIN", label: "🎓 Kolay Eğitim" },
            { id: "WATCHDOG", label: "🛡️ Bekçi" },
            { id: "KIDS_FRIENDLY", label: "❤️ Çocuk Dostu" },
          ].map((feature) => (
            <button
              key={feature.id}
              type="button"
              onClick={() => setFeatureFilter(feature.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                featureFilter === feature.id
                  ? "bg-[#C5A059] text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
              }`}
            >
              {feature.label}
            </button>
          ))}
        </div>

        {/* Mobil 2 Sütunlu Irk Grid'i (MobileBreedCard - Çakışmasız) */}
        {filteredBreeds.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredBreeds.map((breed) => (
              <MobileBreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 text-center border border-neutral-200 dark:border-neutral-700 space-y-2.5">
            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              Aradığınız kriterlere uygun köpek cinsi bulunamadı.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedSize("ALL");
                setFeatureFilter("ALL");
              }}
              className="px-4 py-2 rounded-xl bg-[#dc5075] text-white text-xs font-bold"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 2. MASAÜSTÜ KÖPEK CİNSLERİ SAYFASI (>= 768px - BİREBİR KORUNAN TASARIM)*/}
      {/* ===================================================================== */}
      <div className="hidden md:block max-w-[1720px] mx-auto px-6 lg:px-8 xl:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#dc5075]/10 text-[#dc5075] dark:text-[#f26ba8] font-semibold text-xs uppercase tracking-[0.2em]">
            <SparklesIcon className="w-4 h-4" />
            <span>Cinse Göre Köpek İlanları</span>
          </div>

          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
            Köpek Cinsleri
          </h1>

          <p className="text-base text-[#78716C] dark:text-[#A8A29E] max-w-2xl mx-auto font-light leading-relaxed">
            Aradığınız köpek cinsini aşağıdan arayın veya boyut ve yaşam özelliklerine göre filtreleyerek doğrudan o cinse ait güncel ilanları inceleyin.
          </p>

          <div className="pt-2 max-w-xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Cinse göre ara... (Örn: Poodle, Maltipoo, Golden)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white dark:bg-[#1E1C1A] border-2 border-neutral-300 dark:border-neutral-700 text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5] focus:outline-none focus:border-[#dc5075] dark:focus:border-[#dc5075] shadow-md shadow-black/5 transition-all"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-[#dc5075] absolute left-4 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {searchTerm.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl p-2 z-30 text-left space-y-1 animate-fadeIn">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800">
                  Eşleşen Cinsler (İlanlara Gitmek İçin Tıklayın):
                </div>

                {quickMatchedBreeds.length > 0 ? (
                  quickMatchedBreeds.map((b) => (
                    <Link
                      key={b.id}
                      href={`/listing-stay?breed=${encodeURIComponent(b.name)}` as Route}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={b.featuredImage}
                          alt={b.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700 group-hover:border-[#dc5075] shadow-sm shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-[#dc5075] transition-colors">
                            {b.name}
                          </h4>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {b.physical.originCountry} • {b.physical.lifeExpectancy}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dc5075] text-white text-xs font-bold shadow-xs group-hover:bg-[#c93f64] transition-colors shrink-0">
                        <span>🐾 İlanları Gör</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-neutral-500">
                    "{searchTerm}" ile eşleşen köpek ırkı bulunamadı.
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <span className="text-xs text-neutral-500 font-semibold mr-1">Hızlı Cinsler:</span>
              {POPULAR_QUICK_BREEDS.map((breedName) => {
                const foundBreed = ALL_BREEDS.find((b) => b.name === breedName);
                return (
                  <Link
                    key={breedName}
                    href={`/listing-stay?breed=${encodeURIComponent(breedName)}` as Route}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-[#dc5075] hover:text-[#dc5075] text-neutral-800 dark:text-neutral-200 transition-all shadow-xs font-bold group"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-700 shrink-0 ring-2 ring-neutral-300 dark:ring-neutral-600 group-hover:ring-[#dc5075]">
                      <img
                        src={
                          foundBreed?.image ||
                          `/images/breeds/${foundBreed?.slug || "poodle-toy"}.png`
                        }
                        alt={breedName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{breedName}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8 pb-6 border-b border-[#EDE7DE] dark:border-neutral-800">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#78716C] dark:text-[#A8A29E] mr-2">
              Boyuta Göre:
            </span>
            {[
              { id: "ALL", label: "Tüm Boyutlar" },
              { id: "MINI", label: "Minyatür Irklar" },
              { id: "SMALL", label: "Küçük Irklar" },
              { id: "MEDIUM", label: "Orta Boy Irklar" },
              { id: "LARGE", label: "Büyük & Dev Irklar" },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setSelectedSize(btn.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedSize === btn.id
                    ? "bg-[#7A1C30] text-white shadow-md shadow-[#7A1C30]/20"
                    : "bg-white dark:bg-neutral-800 text-[#78716C] dark:text-neutral-300 border border-[#EDE7DE] dark:border-neutral-700 hover:bg-[#F2ECE1]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#78716C] dark:text-[#A8A29E] mr-2">
              Karakter & Yaşam:
            </span>
            {[
              { id: "ALL", label: "Tüm Özellikler", icon: SparklesIcon },
              { id: "APARTMENT", label: "🏢 Apartmana Uygun", icon: HomeModernIcon },
              { id: "LOW_SHEDDING", label: "✨ Tüy Dökmeyen", icon: SparklesIcon },
              { id: "EASY_TRAIN", label: "🎓 Kolay Eğitilen", icon: AcademicCapIcon },
              { id: "WATCHDOG", label: "🛡️ İyi Bekçi Köpeği", icon: ShieldCheckIcon },
              { id: "KIDS_FRIENDLY", label: "❤️ Çocuklarla İyi", icon: HeartIcon },
            ].map((feature) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => setFeatureFilter(feature.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  featureFilter === feature.id
                    ? "bg-[#C5A059] text-white shadow-md shadow-[#C5A059]/25"
                    : "bg-white dark:bg-neutral-800 text-[#78716C] dark:text-neutral-300 border border-[#EDE7DE] dark:border-neutral-700 hover:bg-[#F2ECE1]"
                }`}
              >
                <span>{feature.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 text-sm text-[#78716C] dark:text-[#A8A29E]">
          <span>
            Toplam{" "}
            <strong className="text-[#1C1917] dark:text-[#FAF8F5] font-serif text-base">
              {filteredBreeds.length}
            </strong>{" "}
            ırk listeleniyor
          </span>
          {(searchTerm || selectedSize !== "ALL" || featureFilter !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedSize("ALL");
                setFeatureFilter("ALL");
              }}
              className="text-xs font-semibold text-[#dc5075] hover:underline"
            >
              Filtreleri Sıfırla
            </button>
          )}
        </div>

        {filteredBreeds.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-3xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#1C1917] dark:text-[#FAF8F5]">
              Aradığınız Kriterlere Uygun Irk Bulunamadı
            </h3>
            <p className="text-xs text-[#78716C] dark:text-[#A8A29E] max-w-sm mx-auto">
              Arama kutusundaki kelimeyi değiştirebilir veya filtreleri temizleyebilirsiniz.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedSize("ALL");
                setFeatureFilter("ALL");
              }}
              className="px-5 py-2 rounded-full bg-[#dc5075] text-white text-xs font-bold hover:bg-[#c93f64] transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCarPage;
