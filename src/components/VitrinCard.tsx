"use client";

import React from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { VitrinListing } from "@/data/kopekDunyasiData";
import { EyeIcon, SparklesIcon } from "@heroicons/react/24/solid";

interface VitrinCardProps {
  item: VitrinListing;
}

export default function VitrinCard({ item }: VitrinCardProps) {
  const getBadgeStyle = (status: VitrinListing["status"]) => {
    switch (status) {
      case "Süper İlan":
        return "bg-amber-600 text-white";
      case "Vitrin İlanı":
        return "bg-[#dc5075] text-white";
      case "Doğrulanmış":
        return "bg-blue-600 text-white";
      case "Aktif İlan":
      default:
        return "bg-emerald-600 text-white";
    }
  };

  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
      {/* ÜST GÖRSEL ALANI (1/1 Kare) */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Link href={`/listing-stay-detail?id=${item.id}` as Route} className="block w-full h-full">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Süper İlan Rozeti */}
        {item.superIlan && (
          <span
            className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5"
            title="Öne Çıkan Süper İlan"
          >
            <SparklesIcon className="w-3 h-3 text-white" />
            <span>Süper İlan</span>
          </span>
        )}

        {/* Görüntülenme Sayısı */}
        <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-medium">
          <EyeIcon className="w-3 h-3 text-neutral-300" />
          <span>{item.views}</span>
        </div>

        {/* Görsel Altı Yarı Saydam Bilgi Bandı (Irk / Yaş) */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2 pt-5 text-white">
          <div className="text-xs font-bold tracking-tight truncate drop-shadow-xs flex items-center gap-2">
            <span className="w-7 h-7 rounded-full overflow-hidden bg-white/20 shrink-0 ring-2 ring-white/80 inline-flex items-center justify-center shadow-sm">
              <img
                src={`/images/breeds/${item.breedSlug || "poodle-toy"}.png`}
                alt={item.breed}
                className="w-full h-full object-cover"
              />
            </span>
            <span className="truncate">
              {item.breed} / {item.ageText}
            </span>
          </div>
        </div>
      </div>

      {/* METİN VE BİLGİ ALANI */}
      <div className="p-2 flex-1 flex flex-col justify-between space-y-1.5">
        <Link
          href={`/listing-stay-detail?id=${item.id}` as Route}
          className="block font-semibold text-xs text-neutral-900 dark:text-neutral-100 hover:text-[#dc5075] dark:hover:text-[#dc5075] transition-colors line-clamp-2 leading-snug"
          title={item.title}
        >
          {item.title}
        </Link>

        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-neutral-100 dark:border-neutral-700/60">
          <span className="font-bold text-[#007f00] dark:text-emerald-400 truncate">
            {item.city}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 font-medium text-[10px]">
            {item.gender}
          </span>
        </div>

        {/* Durum Rozeti */}
        <div className="pt-0.5">
          <span
            className={`block text-center text-[10px] font-bold py-0.5 px-1.5 rounded ${getBadgeStyle(
              item.status
            )} truncate`}
          >
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
}
