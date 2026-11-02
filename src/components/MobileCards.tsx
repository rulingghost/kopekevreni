"use client";

import React from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { VitrinListing, GuncelListing } from "@/data/kopekDunyasiData";
import { PetListing, DogBreed } from "@/types/pet";

/**
 * 1. SIFIRDAN MOBİL VİTRİN KARTI (2 Sütunlu Grid İçin Çakışmasız Mobil Kart)
 */
export function MobileVitrinCard({ item }: { item: VitrinListing }) {
  const badgeBg =
    item.status === "Süper İlan" || item.superIlan
      ? "bg-amber-500 text-white"
      : item.status === "Vitrin İlanı"
      ? "bg-[#dc5075] text-white"
      : "bg-emerald-600 text-white";

  return (
    <Link
      href={`/listing-stay-detail?id=${item.id}` as Route}
      className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-2xs active:scale-[0.99] transition-transform"
    >
      {/* Üst Görsel: Tek Rozet (Sol Üst) + Tek Şehir (Sol Alt) -> Çakışma İmkansız */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span
          className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-extrabold shadow-xs ${badgeBg}`}
        >
          {item.superIlan ? "⭐ Süper" : item.status}
        </span>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2 py-1.5 pt-4">
          <span className="block text-[10px] font-bold text-white truncate">
            📍 {item.city}
          </span>
        </div>
      </div>

      {/* Alt Bilgi Alanı: Her Satırda Tek Eleman (Truncate) */}
      <div className="p-2.5 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <img
            src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
            alt={item.breed}
            className="w-4 h-4 rounded-full object-cover ring-1 ring-[#dc5075] shrink-0"
          />
          <span className="text-[10px] font-extrabold text-[#dc5075] truncate">
            {item.breed}
          </span>
        </div>

        <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
          {item.title}
        </h3>

        <div className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
          {item.gender} • {item.ageText}
        </div>

        <div className="mt-1 py-1.5 rounded-lg bg-[#dc5075]/10 dark:bg-[#dc5075]/20 text-[#dc5075] dark:text-[#f26ba8] text-[10px] font-extrabold text-center">
          İlanı İncele →
        </div>
      </div>
    </Link>
  );
}

/**
 * 2. SIFIRDAN MOBİL YATAY LİSTE KARTI (Tam Genişlikli Kompakt Satır)
 */
export function MobileGuncelRowCard({
  item,
  accent = "pink",
}: {
  item: GuncelListing;
  accent?: "pink" | "green";
}) {
  return (
    <Link
      href={`/listing-stay-detail?id=${item.id}` as Route}
      className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xs active:bg-neutral-50 dark:active:bg-neutral-700/60 transition-colors"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-neutral-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700"
        loading="lazy"
      />
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <img
            src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
            alt={item.breed}
            className="w-4 h-4 rounded-full object-cover shrink-0 ring-1 ring-neutral-300"
          />
          <span
            className={`text-[10px] font-extrabold truncate ${
              accent === "pink"
                ? "text-[#dc5075] dark:text-[#f26ba8]"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {item.breed}
          </span>
        </div>

        <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
          {item.title}
        </h4>

        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
          📍 {item.city} / {item.district} • {item.gender} • {item.ageText}
        </div>
      </div>
    </Link>
  );
}

/**
 * 3. SIFIRDAN MOBİL DETAYLI İLAN KARTI (Köpek İlanları Sayfası İçin)
 */
export function MobilePetCard({ item }: { item: PetListing }) {
  const petImage =
    item.featuredImage ||
    item.galleryImages?.[0] ||
    "/images/breeds/poodle-toy.png";

  return (
    <div className="flex flex-col bg-white dark:bg-[#1E1C1A] rounded-xl border border-[#EDE7DE] dark:border-neutral-800 overflow-hidden shadow-2xs">
      <Link
        href={`/listing-stay-detail?id=${item.id}` as Route}
        className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden block"
      >
        <img
          src={petImage}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span
          className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-extrabold text-white shadow-xs ${
            item.featured ? "bg-[#dc5075]" : "bg-emerald-600"
          }`}
        >
          {item.featured ? "✨ Vitrin" : "✓ Doğrulanmış"}
        </span>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2 py-1.5 pt-4">
          <span className="block text-[10px] font-bold text-white truncate">
            📍 {item.location?.city} / {item.location?.district}
          </span>
        </div>
      </Link>

      <div className="p-2.5 flex flex-col gap-1 flex-1 justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
              alt={item.breed}
              className="w-4 h-4 rounded-full object-cover ring-1 ring-[#dc5075] shrink-0"
            />
            <span className="text-[10px] font-extrabold text-[#dc5075] truncate">
              {item.breed}
            </span>
          </div>

          <Link href={`/listing-stay-detail?id=${item.id}` as Route} className="block">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
              {item.title}
            </h3>
          </Link>

          <div className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
            {item.gender === "MALE" ? "Erkek ♂" : "Dişi ♀"} • {item.exactAgeText}
          </div>
        </div>

        <Link
          href={`/listing-stay-detail?id=${item.id}` as Route}
          className="mt-1.5 py-1.5 rounded-lg bg-[#dc5075] text-white text-[10px] font-extrabold text-center block"
        >
          İlanı İncele →
        </Link>
      </div>
    </div>
  );
}

/**
 * 4. SIFIRDAN MOBİL KÖPEK CİNSİ KARTI (48 Irk Sayfası İçin)
 */
export function MobileBreedCard({ breed }: { breed: DogBreed }) {
  const getSizeLabel = (size: string) => {
    switch (size) {
      case "MINI":
        return "Minyatür";
      case "SMALL":
        return "Küçük Irk";
      case "MEDIUM":
        return "Orta Boy";
      case "LARGE":
        return "Büyük Irk";
      case "GIANT":
        return "Dev Irk";
      default:
        return "Orta Boy";
    }
  };

  const targetHref = `/listing-stay?breed=${encodeURIComponent(breed.name)}` as Route;

  return (
    <Link
      href={targetHref}
      className="flex flex-col bg-white dark:bg-[#1E1C1A] rounded-xl border border-[#EDE7DE] dark:border-neutral-800 overflow-hidden shadow-2xs"
    >
      {/* Görsel Alanı: Tek Sol Üst Rozet + Tek Alt Başlık */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        <img
          src={breed.featuredImage}
          alt={breed.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/65 text-white backdrop-blur-xs">
          {getSizeLabel(breed.sizeCategory)}
        </span>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-2.5 py-2 pt-5">
          <h3 className="text-xs font-extrabold text-white truncate">
            {breed.name}
          </h3>
        </div>
      </div>

      {/* Alt Özellikler: Çakışmasız Tek Satırlı Bilgiler */}
      <div className="p-2.5 flex flex-col gap-1 flex-1 justify-between">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#dc5075] truncate">
            {breed.physical.originCountry} • {breed.physical.lifeExpectancy}
          </div>
          <div className="text-[10px] text-neutral-600 dark:text-neutral-300 font-medium truncate">
            Apartman: {breed.ratings.apartmentSuitability}/5 • Eğitim: {breed.ratings.trainability}/5
          </div>
        </div>

        <div className="mt-1.5 py-1.5 rounded-lg bg-[#dc5075] text-white text-[10px] font-extrabold text-center">
          🐾 İlanları Gör
        </div>
      </div>
    </Link>
  );
}
