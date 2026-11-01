"use client";

import React, { FC } from "react";
import Link from "next/link";
import { DogBreed } from "@/types/pet";
import { Route } from "@/routers/types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export interface BreedCardProps {
  className?: string;
  breed: DogBreed;
}

const BreedCard: FC<BreedCardProps> = ({ className = "", breed }) => {
  const getSizeBadge = (size: string) => {
    switch (size) {
      case "MINI":
        return "Minyatür";
      case "SMALL":
        return "Küçük";
      case "MEDIUM":
        return "Orta";
      case "LARGE":
        return "Büyük";
      case "GIANT":
        return "Dev Irk";
      default:
        return "Orta";
    }
  };

  return (
    <div
      className={`group relative rounded-xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#dc5075]/40 transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      {/* GÖRSEL ALANI (TIKLAYINCA BU CİNSİN İLANLARINA GİDER) */}
      <Link
        href={`/listing-stay?breed=${encodeURIComponent(breed.name)}` as Route}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5] dark:bg-neutral-800 block cursor-pointer"
        title={`${breed.name} ilanlarını gör`}
      >
        <img
          src={breed.featuredImage}
          alt={breed.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* ÜST BOYUT ROZETİ */}
        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 z-10">
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase bg-white/90 dark:bg-neutral-900/90 text-[#1C1917] dark:text-[#FAF8F5] backdrop-blur-md shadow-sm">
            {getSizeBadge(breed.sizeCategory)}
          </span>
        </div>

        {/* GÖRSEL ÜZERİ BİLGİ */}
        <div className="absolute bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-3.5 z-10 text-white">
          <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-neutral-300 font-medium block truncate">
            {breed.physical.originCountry} • {breed.physical.lifeExpectancy}
          </span>
          <h3 className="font-serif font-bold text-xs sm:text-lg text-white group-hover:text-rose-200 transition-colors leading-tight truncate">
            {breed.name}
          </h3>
        </div>
      </Link>

      {/* METRİKLER VE AKSİYON BUTONLARI */}
      <div className="p-2.5 sm:p-4 bg-white dark:bg-[#1E1C1A] flex flex-col justify-between flex-grow space-y-2 sm:space-y-3">
        {/* ÖZELLİK METRİKLERİ */}
        <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
          <div className="flex items-center justify-between text-[#78716C] dark:text-[#A8A29E]">
            <span className="truncate pr-1">Apartman:</span>
            <div className="flex gap-0.5 sm:gap-1 text-amber-500 shrink-0">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    i < breed.ratings.apartmentSuitability
                      ? "bg-amber-500"
                      : "bg-[#EDE7DE] dark:bg-neutral-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[#78716C] dark:text-[#A8A29E]">
            <span className="truncate pr-1">Eğitim:</span>
            <div className="flex gap-0.5 sm:gap-1 text-[#dc5075] shrink-0">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    i < breed.ratings.trainability
                      ? "bg-[#dc5075]"
                      : "bg-[#EDE7DE] dark:bg-neutral-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* AKSİYON ALANI: DOĞRUDAN BU CİNSİN İLANLARINA GİT */}
        <div className="pt-2 sm:pt-3 border-t border-[#EDE7DE] dark:border-neutral-800">
          <Link
            href={`/listing-stay?breed=${encodeURIComponent(breed.name)}` as Route}
            className="w-full py-1.5 sm:py-2 px-2 sm:px-4 rounded-full bg-[#dc5075] hover:bg-[#c93f64] text-white font-bold text-[10px] sm:text-xs shadow-xs transition-all flex items-center justify-center gap-1"
          >
            <span className="sm:hidden truncate">🐾 İlanları Gör</span>
            <span className="hidden sm:inline truncate">🐾 {breed.name} İlanlarını Gör</span>
            <ArrowRightIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BreedCard;
