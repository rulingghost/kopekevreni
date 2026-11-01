"use client";

import React from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { GuncelListing } from "@/data/kopekDunyasiData";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

interface GuncelListCardProps {
  item: GuncelListing;
  themeColor?: "pink" | "green";
}

export default function GuncelListCard({
  item,
  themeColor = "pink",
}: GuncelListCardProps) {
  const isPink = themeColor === "pink";

  return (
    <div className="group bg-white dark:bg-neutral-800/90 rounded-md border border-neutral-200 dark:border-neutral-700 p-1.5 sm:p-2 hover:border-[#e66095] dark:hover:border-[#e66095] transition-all flex gap-2 sm:gap-2.5 items-center shadow-2xs hover:shadow-xs">
      {/* SOL KÜÇÜK GÖRSEL */}
      <Link
        href={`/listing-stay-detail?id=${item.id}` as Route}
        className="relative w-16 h-14 sm:w-24 sm:h-20 shrink-0 rounded overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* SAĞ METİN DETAYLARI */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <Link
          href={`/listing-stay-detail?id=${item.id}` as Route}
          className="block font-bold text-[11px] sm:text-xs text-neutral-900 dark:text-neutral-100 hover:text-[#e66095] transition-colors truncate"
          title={item.title}
        >
          {item.title}
        </Link>

        {/* IRK ADI VE YAŞ */}
        <div className="text-[10px] sm:text-[11px] font-medium flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 truncate">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-700 shrink-0 ring-1 ring-neutral-300 dark:ring-neutral-600 inline-flex items-center justify-center shadow-2xs">
            <img
              src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
              alt={item.breed}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`font-bold truncate ${
              isPink
                ? "text-[#e7277d] dark:text-[#f26ba8]"
                : "text-[#007f00] dark:text-emerald-400"
            }`}
          >
            {item.breed}
          </span>
          <span className="text-neutral-400 dark:text-neutral-500 shrink-0">•</span>
          <span className="text-neutral-600 dark:text-neutral-300 shrink-0">
            {item.gender} / {item.ageText}
          </span>
        </div>

        {/* LOKASYON VE ZAMAN */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 pt-0.5 sm:pt-1 border-t border-neutral-100 dark:border-neutral-700/50">
          <div className="flex items-center gap-1 truncate">
            <MapPinIcon className="w-3 h-3 text-neutral-400 shrink-0" />
            <span className="truncate">
              {item.city} / {item.district}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 text-neutral-400">
            <ClockIcon className="w-3 h-3 shrink-0" />
            <span>{item.dateText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
