"use client";

import React from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { VitrinListing, GuncelListing } from "@/data/kopekDunyasiData";
import { PetListing, DogBreed } from "@/types/pet";

/**
 * 1. MOBİL VİTRİN KARTI
 * - Tamamı tıklanabilir (<Link>), kaba 'İlanı İncele' butonu gizlendi
 * - Başlık 2 satır (line-clamp-2 leading-snug) okunaklı hale getirildi
 * - Kart içi boşluklar (p-2) daraltıldı
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
      className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 overflow-hidden shadow-2xs active:scale-[0.98] transition-transform"
    >
      {/* Üst Görsel */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span
          className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-tight shadow-2xs ${badgeBg}`}
        >
          {item.superIlan ? "⭐ Süper" : item.status}
        </span>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-2 py-1 pt-3">
          <span className="block text-[9px] font-semibold text-white/95 truncate">
            📍 {item.city}
          </span>
        </div>
      </div>

      {/* Daraltılmış Kart İçi Boşluk (p-2) & 2 Satır Okunaklı Başlık */}
      <div className="p-2 flex flex-col justify-between flex-1 gap-1">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 min-w-0">
            <img
              src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
              alt={item.breed}
              className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-[#dc5075]/60 shrink-0"
            />
            <span className="text-[9px] font-extrabold text-[#dc5075] uppercase tracking-tight truncate">
              {item.breed}
            </span>
          </div>

          <h3 className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
            {item.title}
          </h3>
        </div>

        <div className="pt-1 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-[9px] text-neutral-500 dark:text-neutral-400 font-medium">
          <span>{item.gender}</span>
          <span>{item.ageText}</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * 2. MOBİL YATAY LİSTE KARTI
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
      className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xs active:bg-neutral-50 dark:active:bg-neutral-700/60 transition-colors"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-14 h-14 rounded-lg object-cover shrink-0 bg-neutral-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700"
        loading="lazy"
      />
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-1 min-w-0">
          <img
            src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
            alt={item.breed}
            className="w-3.5 h-3.5 rounded-full object-cover shrink-0 ring-1 ring-neutral-300"
          />
          <span
            className={`text-[9px] font-extrabold uppercase truncate ${
              accent === "pink"
                ? "text-[#dc5075] dark:text-[#f26ba8]"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {item.breed}
          </span>
        </div>

        <h4 className="text-[11px] font-bold text-neutral-900 dark:text-white leading-snug line-clamp-1">
          {item.title}
        </h4>

        <div className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">
          📍 {item.city}/{item.district} • {item.gender} • {item.ageText}
        </div>
      </div>
    </Link>
  );
}

/**
 * 3. MOBİL İLAN KARTI (Köpek İlanları Sayfası İçin - Tamamı Tıklanabilir, Zarif)
 */
export function MobilePetCard({ item }: { item: PetListing }) {
  const petImage =
    item.featuredImage ||
    item.galleryImages?.[0] ||
    "/images/breeds/poodle-toy.png";

  return (
    <Link
      href={`/listing-stay-detail?id=${item.id}` as Route}
      className="flex flex-col bg-white dark:bg-[#1E1C1A] rounded-xl border border-[#EDE7DE] dark:border-neutral-800 overflow-hidden shadow-2xs active:scale-[0.98] transition-transform"
    >
      <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img
          src={petImage}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span
          className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-extrabold text-white shadow-2xs ${
            item.featured ? "bg-[#dc5075]" : "bg-emerald-600"
          }`}
        >
          {item.featured ? "✨ Vitrin" : "✓ Doğrulanmış"}
        </span>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-2 py-1 pt-3">
          <span className="block text-[9px] font-semibold text-white/95 truncate">
            📍 {item.location?.city} / {item.location?.district}
          </span>
        </div>
      </div>

      <div className="p-2 flex flex-col justify-between flex-1 gap-1">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 min-w-0">
            <img
              src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
              alt={item.breed}
              className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-[#dc5075]/60 shrink-0"
            />
            <span className="text-[9px] font-extrabold text-[#dc5075] uppercase tracking-tight truncate">
              {item.breed}
            </span>
          </div>

          <h3 className="text-[11px] font-bold text-neutral-900 dark:text-white leading-snug line-clamp-2">
            {item.title}
          </h3>
        </div>

        <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[9px] font-medium text-neutral-500 dark:text-neutral-400">
          <span>{item.gender === "MALE" ? "Erkek ♂" : "Dişi ♀"}</span>
          <span>{item.exactAgeText}</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * 4. MOBİL KÖPEK CİNSİ KARTI (48 Irk Sayfası İçin - Tamamı Tıklanabilir)
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
      className="flex flex-col bg-white dark:bg-[#1E1C1A] rounded-xl border border-[#EDE7DE] dark:border-neutral-800 overflow-hidden shadow-2xs active:scale-[0.98] transition-transform"
    >
      <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        <img
          src={breed.featuredImage}
          alt={breed.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-black/65 text-white backdrop-blur-xs">
          {getSizeLabel(breed.sizeCategory)}
        </span>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-2 py-1.5 pt-4">
          <h3 className="text-[11px] font-extrabold text-white leading-tight line-clamp-1">
            {breed.name}
          </h3>
        </div>
      </div>

      <div className="p-2 flex flex-col justify-between flex-1 gap-1">
        <div className="text-[9px] font-semibold text-[#dc5075] truncate">
          {breed.physical.originCountry} • {breed.physical.lifeExpectancy}
        </div>
        <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[9px] text-neutral-600 dark:text-neutral-300 font-medium">
          <span>Apartman: {breed.ratings.apartmentSuitability}/5</span>
          <span className="text-[#dc5075] font-bold">İlanlar →</span>
        </div>
      </div>
    </Link>
  );
}
