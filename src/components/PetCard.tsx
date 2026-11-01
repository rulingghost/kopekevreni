"use client";

import React, { FC } from "react";
import Link from "next/link";
import { PetListing } from "@/types/pet";
import { Route } from "@/routers/types";
import {
  MapPinIcon,
  CheckBadgeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

export interface PetCardProps {
  className?: string;
  pet?: PetListing;
  data?: PetListing;
}

const PetCard: FC<PetCardProps> = ({ className = "", pet, data }) => {
  const item = pet || data;
  const [isLiked, setIsLiked] = React.useState(false);

  if (!item) return null;

  const renderBadge = () => {
    if (item.featured) {
      return (
        <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[11px] font-semibold bg-[#dc5075] text-white backdrop-blur-md shadow-sm">
          <SparklesIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
          <span>Süper İlan</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[11px] font-semibold bg-[#18b418] text-white backdrop-blur-md shadow-sm">
        <CheckBadgeIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
        <span>Doğrulanmış</span>
      </span>
    );
  };

  const getGenderLabel = () => {
    return item.gender === "MALE" ? "Erkek ♂" : "Dişi ♀";
  };

  const petImage =
    item.featuredImage ||
    item.galleryImages?.[0] ||
    (item as any).gallery?.[0] ||
    "/images/breeds/poodle-toy.png";

  return (
    <div
      className={`nc-PetCard group relative bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col ${className}`}
    >
      {/* GÖRSEL ALANI */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5] dark:bg-neutral-800">
        <Link href={`/listing-stay-detail?id=${item.id}` as Route} className="block w-full h-full">
          <img
            src={petImage}
            alt={item.title || "Evcil Can"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* ÜST ROZETLER */}
        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {renderBadge()}
        </div>

        {/* FAVORİ BUTONU */}
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-[#7A1C30] transition-colors shadow-sm z-10"
          title="Favorilere Ekle"
        >
          {isLiked ? (
            <HeartSolidIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#7A1C30]" />
          ) : (
            <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
        </button>

        {/* ALT ŞEFFAF BİLGİ ŞERİDİ */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2.5 sm:left-3 sm:right-3 flex items-center justify-between text-[9px] sm:text-[11px] font-medium text-white/95 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-black/50 backdrop-blur-md">
          <span className="flex items-center gap-0.5 sm:gap-1 truncate pr-1">
            <MapPinIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#C5A059] shrink-0" />
            <span className="truncate">
              {item.location?.city} • {item.location?.district}
            </span>
          </span>
          <span className="shrink-0">{getGenderLabel()}</span>
        </div>
      </div>

      {/* İÇERİK ALANI */}
      <div className="p-2.5 sm:p-5 flex flex-col flex-grow justify-between bg-white dark:bg-[#1E1C1A]">
        <div>
          {/* IRK ETİKETİ */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#78716C] dark:text-[#A8A29E] uppercase tracking-wider font-semibold mb-1 sm:mb-1.5 gap-1">
            <span className="flex items-center gap-1 sm:gap-2 min-w-0">
              <span className="w-5 h-5 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-700 shrink-0 ring-1 sm:ring-2 ring-[#dc5075]/50 inline-flex items-center justify-center shadow-xs">
                <img
                  src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
                  alt={item.breed}
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate">
                {item.breed}
              </span>
            </span>
            <span className="text-[9px] sm:text-[11px] font-normal normal-case text-[#A8A29E] dark:text-neutral-400 shrink-0">
              {item.exactAgeText}
            </span>
          </div>

          {/* İLAN BAŞLIĞI */}
          <Link href={`/listing-stay-detail?id=${item.id}` as Route} className="block group">
            <h3 className="font-serif font-bold text-xs sm:text-lg text-[#1C1917] dark:text-[#FAF8F5] group-hover:text-[#7A1C30] transition-colors line-clamp-1">
              {item.title}
            </h3>
          </Link>

          {/* SAĞLIK VE DURUM İŞARETLERİ */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-3">
            {item.badges?.vaccinated && (
              <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-medium bg-[#FAF8F5] dark:bg-neutral-800 text-[#2E6B4A] dark:text-emerald-400 border border-[#EDE7DE] dark:border-neutral-700">
                <CheckBadgeIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2E6B4A]" />
                Aşılı
              </span>
            )}
            {item.badges?.microchipped && (
              <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-medium bg-[#FAF8F5] dark:bg-neutral-800 text-[#7A1C30] dark:text-rose-300 border border-[#EDE7DE] dark:border-neutral-700">
                <CheckBadgeIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#7A1C30]" />
                Mikroçipli
              </span>
            )}
            {item.badges?.neutered && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAF8F5] dark:bg-neutral-800 text-[#78716C] dark:text-neutral-300 border border-[#EDE7DE] dark:border-neutral-700">
                Kısır
              </span>
            )}
            {item.badges?.apartmentFriendly && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAF8F5] dark:bg-neutral-800 text-[#C5A059] dark:text-[#D4B373] border border-[#EDE7DE] dark:border-neutral-700">
                Apartmana Uygun
              </span>
            )}
          </div>
        </div>

        {/* ALT ALAN: İLAN DURUMU VE WHATSAPP İLETİŞİM */}
        <div className="mt-2 sm:mt-5 pt-2 sm:pt-3.5 border-t border-[#EDE7DE] dark:border-neutral-800 flex items-center justify-between gap-1">
          <div className="min-w-0">
            <span className="hidden sm:block text-[10px] uppercase tracking-wider text-[#A8A29E]">
              İlan Durumu
            </span>
            <span className="text-[9px] sm:text-xs font-serif font-bold text-[#dc5075] dark:text-[#f26ba8] truncate block">
              Aktif İlan
            </span>
          </div>

          {item.contact?.whatsapp && (
            <a
              href={`https://wa.me/${item.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE1] dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-[#EDE7DE] dark:border-neutral-700 text-[#1C1917] dark:text-[#FAF8F5] text-[9px] sm:text-xs font-semibold transition-all shadow-sm shrink-0"
            >
              <ChatBubbleLeftRightIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2E6B4A]" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
