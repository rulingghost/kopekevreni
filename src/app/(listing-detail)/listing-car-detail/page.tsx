"use client";

import React, { FC, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MOCK_BREEDS } from "@/data/mockBreeds";
import { MOCK_PET_LISTINGS } from "@/data/mockPets";
import { DogBreed } from "@/types/pet";
import { Route } from "@/routers/types";
import PetCard from "@/components/PetCard";
import {
  SparklesIcon,
  MapPinIcon,
  HeartIcon,
  ShareIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  Squares2X2Icon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

type TabKey = "history" | "temperament" | "care" | "health";

const ListingCarDetailPage: FC = () => {
  const searchParams = useSearchParams();
  const breedId = searchParams.get("id");

  const [activeTab, setActiveTab] = useState<TabKey>("temperament");
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

  // Irk verisini bul
  const breed: DogBreed = useMemo(() => {
    if (!breedId) return MOCK_BREEDS[0];
    const found = MOCK_BREEDS.find(
      (b) => b.id === breedId || b.slug === breedId
    );
    return found || MOCK_BREEDS[0];
  }, [breedId]);

  // Çapraz İlişki: Bu ırka ait güncel sahiplendirme ve eş ilanları
  const relatedListings = useMemo(() => {
    return MOCK_PET_LISTINGS.filter(
      (p) =>
        p.breedSlug === breed.slug ||
        p.breed.toLowerCase().includes(breed.name.toLowerCase()) ||
        breed.name.toLowerCase().includes(p.breed.toLowerCase())
    );
  }, [breed]);

  // Diğer önerilen popüler ırklar
  const otherBreeds = useMemo(() => {
    return MOCK_BREEDS.filter((b) => b.id !== breed.id).slice(0, 3);
  }, [breed]);

  const gallery = breed.galleryImages && breed.galleryImages.length >= 3
    ? [breed.featuredImage, ...breed.galleryImages]
    : [breed.featuredImage, breed.featuredImage, breed.featuredImage];

  const ratingItems = [
    { label: "Apartman Yaşamına Uygunluk", value: breed.ratings.apartmentSuitability, color: "bg-[#7A1C30]" },
    { label: "Tüy Dökme Oranı", value: breed.ratings.sheddingLevel, color: "bg-[#C5A059]" },
    { label: "Eğitilebilirlik & Zeka", value: breed.ratings.trainability, color: "bg-[#2E6B4A]" },
    { label: "Çocuklarla Dostluk", value: breed.ratings.goodWithChildren, color: "bg-[#7A1C30]" },
    { label: "Diğer Köpeklerle / Hayvanlarla Uyum", value: breed.ratings.goodWithOtherDogs, color: "bg-[#C5A059]" },
    { label: "Enerji Seviyesi & Egzersiz İhtiyacı", value: breed.ratings.energyLevel, color: "bg-[#4A0E1C]" },
    { label: "Bekçilik & Koruma Yeteneği", value: breed.ratings.watchdogAbility, color: "bg-[#1C1917]" },
  ];

  return (
    <div className="min-h-screen py-6 lg:py-10 bg-[#FAF8F5] dark:bg-[#151312] transition-colors">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* 1. BREADCRUMB & BAŞLIK BİLGİSİ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#EDE7DE] dark:border-neutral-800 text-xs">
          <div className="flex items-center gap-2 text-[#78716C] dark:text-[#A8A29E]">
            <Link href="/" className="hover:text-[#7A1C30]">Ana Sayfa</Link>
            <span>/</span>
            <Link href={"/listing-car" as Route} className="hover:text-[#7A1C30]">Irk Ansiklopedisi</Link>
            <span>/</span>
            <span className="font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] truncate max-w-xs">{breed.name}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: breed.name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Irk rehberi bağlantısı panoya kopyalandı!");
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#EDE7DE] dark:border-neutral-700 text-[#1C1917] dark:text-[#FAF8F5] bg-white dark:bg-neutral-800 hover:bg-[#F2ECE1] font-semibold transition-all shadow-sm"
          >
            <ShareIcon className="w-4 h-4 text-[#78716C]" />
            <span>Paylaş</span>
          </button>
        </div>

        {/* 2. BENTO FOTOĞRAF GALERİSİ */}
        <div className="mb-10 rounded-[2.5rem] overflow-hidden relative shadow-xl border border-[#EDE7DE] dark:border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[460px]">
            {/* Büyük Ana Görsel */}
            <div
              className="md:col-span-2 h-72 md:h-full relative overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImageModal(gallery[0])}
            >
              <img
                src={gallery[0]}
                alt={breed.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#7A1C30] mb-2 inline-block shadow-sm">
                  {breed.physical.originCountry} Kökenli
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">{breed.name}</h1>
                {breed.alternativeNames && breed.alternativeNames.length > 0 && (
                  <p className="text-xs text-[#E8E2D5] mt-1 font-light">
                    Diğer İsimleri: {breed.alternativeNames.join(", ")}
                  </p>
                )}
              </div>
            </div>

            {/* Yan Fotoğraflar */}
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
              {gallery.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-full overflow-hidden group cursor-pointer bg-neutral-200"
                  onClick={() => setSelectedImageModal(img)}
                >
                  <img
                    src={img}
                    alt={`${breed.name} - ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedImageModal(gallery[0])}
            className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-2xl bg-[#1C1917]/80 hover:bg-[#1C1917] text-white backdrop-blur-md text-xs font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <Squares2X2Icon className="w-4 h-4" />
            <span>Fotoğrafları Gör ({gallery.length})</span>
          </button>
        </div>

        {/* 3. ANA İÇERİK IZGARASI: SOL ANALİZ & SAĞ FİZİKSEL KÜNYE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* SOL KOLON (7 Kolon): Kısa Özet, Karakter Puanları Barları, 4 Detay Sekmesi */}
          <div className="lg:col-span-7 space-y-8">
            {/* Kısa Açıklama & Etiketler */}
            <div className="space-y-4">
              <p className="font-serif text-base sm:text-lg text-[#1C1917] dark:text-[#FAF8F5] leading-relaxed italic">
                "{breed.shortDescription}"
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {breed.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 text-[#7A1C30] dark:text-[#E2A9B5] font-semibold text-xs shadow-sm"
                  >
                    <SparklesIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 1-5 PUAN ARASI KARAKTER ANALİZİ GRAFİĞİ (PROGRESS BARS) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DE] dark:border-neutral-800">
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#1C1917] dark:text-[#FAF8F5] flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-[#C5A059]" />
                  <span>Karakter Analizi & Mizaç Puanları</span>
                </h2>
                <span className="text-xs text-[#78716C] dark:text-[#A8A29E]">1 (Düşük) - 5 (Yüksek)</span>
              </div>

              <div className="space-y-4">
                {ratingItems.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#57534E] dark:text-[#A8A29E]">{item.label}</span>
                      <span className="text-[#1C1917] dark:text-[#FAF8F5] font-serif font-bold">{item.value} / 5</span>
                    </div>
                    {/* Görsel Bar */}
                    <div className="h-2 w-full bg-[#FAF8F5] dark:bg-neutral-800 border border-[#EDE7DE] dark:border-neutral-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-700`}
                        style={{ width: `${(item.value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 DETAYLI SEKMELİ İÇERİK ALANI */}
            <div className="rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 shadow-sm overflow-hidden">
              {/* Sekme Butonları */}
              <div className="flex border-b border-[#EDE7DE] dark:border-neutral-800 bg-[#FAF8F5]/80 dark:bg-neutral-800/40 overflow-x-auto scrollbar-none">
                {[
                  { key: "temperament", label: "🐾 Mizaç & Karakter" },
                  { key: "care", label: "🥣 Bakım & Beslenme" },
                  { key: "history", label: "📜 Irkın Tarihçesi" },
                  { key: "health", label: "🩺 Sağlık & Genetik" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as TabKey)}
                    className={`py-4 px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === tab.key
                        ? "border-[#7A1C30] text-[#7A1C30] dark:text-[#E2A9B5] bg-white dark:bg-[#1E1C1A]"
                        : "border-transparent text-[#78716C] hover:text-[#1C1917] dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sekme İçeriği */}
              <div className="p-6 sm:p-8 text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed whitespace-pre-line font-light">
                {activeTab === "temperament" && (
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1C1917] dark:text-[#FAF8F5] mb-3">
                      {breed.name} Mizacı ve Aile Yaşamı
                    </h3>
                    <p>{breed.tabs.temperament}</p>
                  </div>
                )}
                {activeTab === "care" && (
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1C1917] dark:text-[#FAF8F5] mb-3">
                      Bakım, Egzersiz ve Beslenme Gereksinimleri
                    </h3>
                    <p>{breed.tabs.careAndNutrition}</p>
                  </div>
                )}
                {activeTab === "history" && (
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1C1917] dark:text-[#FAF8F5] mb-3">
                      Irkın Kökeni ve Tarihsel Gelişimi
                    </h3>
                    <p>{breed.tabs.history}</p>
                  </div>
                )}
                {activeTab === "health" && (
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1C1917] dark:text-[#FAF8F5] mb-3">
                      Genetik Yatkınlıklar ve Sağlık Önerileri
                    </h3>
                    <p>{breed.tabs.healthIssues}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SAĞ KOLON (5 Kolon): Fiziksel Metrikler Künyesi & İlan Ver Aksiyonu */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            {/* Fiziksel Künye Kartı */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 shadow-xl space-y-6">
              <h2 className="font-serif font-bold text-lg text-[#1C1917] dark:text-[#FAF8F5] pb-3 border-b border-[#EDE7DE] dark:border-neutral-800">
                Fiziksel Standartlar & Künye
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DE] dark:border-neutral-800">
                  <span className="text-[#78716C] dark:text-[#A8A29E]">Menşei / Köken:</span>
                  <span className="font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5]">{breed.physical.originCountry}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DE] dark:border-neutral-800">
                  <span className="text-[#78716C] dark:text-[#A8A29E]">Ortalama Yaşam:</span>
                  <span className="font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5]">{breed.physical.lifeExpectancy}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DE] dark:border-neutral-800">
                  <span className="text-[#78716C] dark:text-[#A8A29E]">Erkek Boy:</span>
                  <span className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">{breed.physical.height.male}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DE] dark:border-neutral-800">
                  <span className="text-[#78716C] dark:text-[#A8A29E]">Dişi Boy:</span>
                  <span className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">{breed.physical.height.female}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DE] dark:border-neutral-800">
                  <span className="text-[#78716C] dark:text-[#A8A29E]">Erkek Kilo:</span>
                  <span className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">{breed.physical.weight.male}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DE] dark:border-neutral-800">
                  <span className="text-[#78716C] dark:text-[#A8A29E]">Dişi Kilo:</span>
                  <span className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">{breed.physical.weight.female}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#78716C] dark:text-[#A8A29E]">Tüy Yapısı:</span>
                  <span className="font-semibold text-[#1C1917] dark:text-[#FAF8F5] text-right max-w-[200px]">{breed.physical.coatType}</span>
                </div>
              </div>

              {/* İLAN VERME VE SAHİPLENME BUTONLARI */}
              <div className="pt-2 space-y-3">
                <Link
                  href={`/listing-stay?breed=${encodeURIComponent(breed.name)}` as Route}
                  className="w-full py-4 px-4 rounded-full bg-[#7A1C30] hover:bg-[#601424] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#7A1C30]/25 transition-all text-center"
                >
                  <HeartIcon className="w-4 h-4" />
                  <span>Bu Irka Ait İlanları İncele</span>
                </Link>

                <Link
                  href={"/add-listing/1" as Route}
                  className="w-full py-3.5 px-4 rounded-full border border-[#EDE7DE] dark:border-neutral-700 bg-[#FAF8F5] hover:bg-[#F2ECE1] dark:bg-neutral-800 dark:hover:bg-neutral-700 text-[#1C1917] dark:text-[#FAF8F5] font-semibold text-xs flex items-center justify-center gap-2 transition-all text-center"
                >
                  <PlusCircleIcon className="w-4 h-4 text-[#C5A059]" />
                  <span>Bu Irk İçin Ücretsiz İlan Ver</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4. ÇAPRAZ İLİŞKİ: BU IRKA AİT GÜNCEL İLANLAR (EN KRİTİK İLİŞKİ) */}
        <div className="mt-20 pt-12 border-t border-[#EDE7DE] dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#7A1C30] dark:text-[#E2A9B5] font-bold block mb-1">
                Aktif İlanlar
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
                {breed.name} Irkına Ait Güncel İlanlar
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-1">
                Bu ırka ait güncel köpek ilanlarını inceleyebilir ve ilan sahipleriyle iletişime geçebilirsiniz.
              </p>
            </div>

            <Link
              href={`/listing-stay?breed=${encodeURIComponent(breed.name)}` as Route}
              className="text-xs sm:text-sm font-semibold text-[#7A1C30] dark:text-[#E2A9B5] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Tümünü Gör ({relatedListings.length})</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {relatedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedListings.slice(0, 3).map((p) => (
                <PetCard key={p.id} pet={p} />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 text-center space-y-3">
              <p className="text-sm text-[#78716C] dark:text-[#A8A29E]">
                Şu an bu ırka ait aktif bir ilan bulunmuyor. İlk ilanı siz vermek ister misiniz?
              </p>
              <Link
                href="/add-listing/1"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#7A1C30] text-white text-xs font-semibold hover:bg-[#601424] transition-colors"
              >
                + {breed.name} İçin İlan Oluştur
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* FOTOĞRAF LIGHTBOX MODAL */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setSelectedImageModal(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
          >
            ✕ Kapat
          </button>
          <img
            src={selectedImageModal}
            alt="Büyük Görünüm"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ListingCarDetailPage;
