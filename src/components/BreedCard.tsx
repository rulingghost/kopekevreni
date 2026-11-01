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
      className={`group relative rounded-3xl overflow-hidden bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#dc5075]/40 transition-all duration-300 flex flex-col justify-between ${className}`}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

        {/* ÜST BOYUT ROZETİ */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/90 dark:bg-neutral-900/90 text-[#1C1917] dark:text-[#FAF8F5] backdrop-blur-md shadow-sm">
            {getSizeBadge(breed.sizeCategory)}
          </span>
        </div>

        {/* GÖRSEL ÜZERİ BİLGİ */}
        <div className="absolute bottom-3 inset-x-3.5 z-10 text-white">
          <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-medium block">
            {breed.physical.originCountry} • {breed.physical.lifeExpectancy}
          </span>
          <h3 className="font-serif font-bold text-lg text-white group-hover:text-rose-200 transition-colors leading-tight">
            {breed.name}
          </h3>
        </div>
      </Link>

      {/* METRİKLER VE AKSİYON BUTONLARI */}
      <div className="p-4 bg-white dark:bg-[#1E1C1A] flex flex-col justify-between flex-grow space-y-3">
        {/* ÖZELLİK METRİKLERİ */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#78716C] dark:text-[#A8A29E]">
            <span>Apartman Yaşamı:</span>
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < breed.ratings.apartmentSuitability
                      ? "bg-amber-500"
                      : "bg-[#EDE7DE] dark:bg-neutral-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[#78716C] dark:text-[#A8A29E]">
            <span>Eğitilebilirlik:</span>
            <div className="flex gap-1 text-[#dc5075]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
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
        <div className="pt-3 border-t border-[#EDE7DE] dark:border-neutral-800">
          <Link
            href={`/listing-stay?breed=${encodeURIComponent(breed.name)}` as Route}
            className="w-full py-2 px-4 rounded-full bg-[#dc5075] hover:bg-[#c93f64] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>🐾 {breed.name} İlanlarını Gör</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BreedCard;
