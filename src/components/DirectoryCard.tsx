"use client";

import React, { FC } from "react";
import Link from "next/link";
import { DirectoryPlace } from "@/types/pet";
import { Route } from "@/routers/types";
import {
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";

export interface DirectoryCardProps {
  className?: string;
  data: DirectoryPlace;
}

const DirectoryCard: FC<DirectoryCardProps> = ({ className = "", data }) => {
  return (
    <div
      className={`group relative bg-white dark:bg-[#1E1C1A] border border-[#EDE7DE] dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F5] dark:bg-neutral-800">
        <img
          src={data.featuredImage}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#7A1C30] text-white shadow-sm">
            {data.categoryLabel}
          </span>
          {data.is24Hours && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#2E6B4A] text-white tracking-wider">
              7/24 Nöbetçi
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-xs font-bold text-[#1C1917] dark:text-neutral-100 shadow-sm">
          <StarIcon className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{data.rating}</span>
          <span className="text-[#A8A29E] font-normal">({data.reviewCount})</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center text-xs text-[#78716C] dark:text-[#A8A29E] gap-1 mb-1">
            <MapPinIcon className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="truncate">{data.district}, {data.city}</span>
          </div>

          <h3 className="font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] text-base group-hover:text-[#7A1C30] transition-colors line-clamp-1">
            {data.name}
          </h3>

          <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-1 line-clamp-2 leading-relaxed">
            {data.description}
          </p>

          {/* HİZMET ROZETLERİ */}
          <div className="flex flex-wrap gap-1 mt-3">
            {data.services.slice(0, 3).map((srv, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAF8F5] dark:bg-neutral-800 text-[#78716C] dark:text-[#A8A29E] border border-[#EDE7DE] dark:border-neutral-700"
              >
                {srv}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#EDE7DE] dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#78716C] dark:text-[#A8A29E]">
            <ClockIcon className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px] truncate">{data.workingHours}</span>
          </div>

          <a
            href={`tel:${data.phone}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE1] dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-[#EDE7DE] dark:border-neutral-700 text-[#1C1917] dark:text-[#FAF8F5] text-xs font-semibold transition-all shadow-sm"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-[#7A1C30]" />
            <span>Hemen Ara</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DirectoryCard;
