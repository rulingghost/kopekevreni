"use client";

import React, { FC, useState } from "react";
import { ListingType, AgeGroup, SizeGroup, Gender } from "@/types/pet";
import { ALL_BREEDS } from "@/data/kopekDunyasiData";
import {
  FunnelIcon,
  XMarkIcon,
  CheckIcon,
  SparklesIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export interface FilterState {
  listingType: "ALL" | ListingType;
  breed: string;
  city: string;
  ageGroup: "ALL" | AgeGroup;
  gender: "ALL" | Gender;
  size: "ALL" | SizeGroup;
  vaccinated: boolean;
  microchipped: boolean;
  neutered: boolean;
  houseTrained: boolean;
  apartmentFriendly: boolean;
  pedigree: boolean;
  isUrgentOnly: boolean;
}

export interface PetListingFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
}

const CITIES = [
  "Tümü",
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Muğla",
  "Eskişehir",
  "Adana",
  "Konya",
];

const PetListingFilter: FC<PetListingFilterProps> = ({
  filters,
  onChange,
  onReset,
  className = "",
}) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* 1. İlan Türü */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5">
          İlan Türü
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "ALL", label: "Tüm İlanlar" },
            { id: "ADOPTION", label: "✨ Vitrin İlanları" },
            { id: "MATING", label: "⚡ Yeni Eklenenler" },
            { id: "LOST_FOUND", label: "🛡️ Doğrulanmış" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateFilter("listingType", item.id)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all ${
                filters.listingType === item.id
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Köpek Irkı */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          Köpek Irkı
        </label>
        <select
          value={filters.breed}
          onChange={(e) => updateFilter("breed", e.target.value)}
          className="w-full text-xs font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-2.5 text-neutral-800 dark:text-neutral-200 focus:ring-[#dc5075] focus:border-[#dc5075]"
        >
          <option value="">Tüm Irklar</option>
          {ALL_BREEDS.map((b) => (
            <option key={b.slug} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        {filters.breed && (
          <div className="mt-2 flex items-center gap-2 p-2 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/50">
            {(() => {
              const b = ALL_BREEDS.find((x) => x.name === filters.breed);
              return (
                <>
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-white shrink-0 ring-2 ring-[#dc5075] shadow-xs flex items-center justify-center">
                    <img
                      src={b?.image || `/images/breeds/${b?.slug || "poodle-toy"}.png`}
                      alt={filters.breed}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#dc5075] truncate">
                    {filters.breed}
                  </span>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* 3. Şehir */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          Şehir
        </label>
        <select
          value={filters.city}
          onChange={(e) => updateFilter("city", e.target.value === "Tümü" ? "" : e.target.value)}
          className="w-full text-xs font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-2.5 text-neutral-800 dark:text-neutral-200 focus:ring-amber-500 focus:border-amber-500"
        >
          {CITIES.map((c) => (
            <option key={c} value={c === "Tümü" ? "" : c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Cinsiyet */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          Cinsiyet
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "ALL", label: "Tümü" },
            { id: "MALE", label: "Erkek ♂" },
            { id: "FEMALE", label: "Dişi ♀" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateFilter("gender", item.id)}
              className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                filters.gender === item.id
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Yaş Grubu */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          Yaş Grubu
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "ALL", label: "Farketmez" },
            { id: "PUPPY", label: "Yavru (0-6 Ay)" },
            { id: "YOUNG", label: "Genç (6 Ay-2 Yaş)" },
            { id: "ADULT", label: "Yetişkin (2-6 Yaş)" },
            { id: "SENIOR", label: "Kıdemli (7+ Yaş)" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateFilter("ageGroup", item.id)}
              className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all ${
                filters.ageGroup === item.id
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Boyut */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          Boyut
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "ALL", label: "Tümü" },
            { id: "MINI", label: "Minyatür" },
            { id: "SMALL", label: "Küçük" },
            { id: "MEDIUM", label: "Orta" },
            { id: "LARGE", label: "Büyük" },
            { id: "GIANT", label: "Dev" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateFilter("size", item.id)}
              className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                filters.size === item.id
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Sağlık ve Özel Durumlar (Checkboxes) */}
      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
          Sağlık & Yaşam Kriterleri
        </label>
        <div className="space-y-2.5">
          {[
            { key: "vaccinated", label: "Aşıları Tamamlanmış" },
            { key: "microchipped", label: "Mikroçipli" },
            { key: "neutered", label: "Kısırlaştırılmış" },
            { key: "houseTrained", label: "Tuvalet Eğitimli" },
            { key: "apartmentFriendly", label: "Apartman Yaşamına Uygun" },
            { key: "pedigree", label: "Secereli (KIF / FCI)" },
            { key: "isUrgentOnly", label: "🚨 Yalnızca Acil Yuva Arayanlar" },
          ].map((item) => {
            const isChecked = filters[item.key as keyof FilterState] as boolean;
            return (
              <label
                key={item.key}
                className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => updateFilter(item.key as keyof FilterState, e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
                <span className={item.key === "isUrgentOnly" ? "font-bold text-red-600 dark:text-red-400" : ""}>
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Temizle Butonu */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Filtreleri Sıfırla
        </button>
      </div>
    </div>
  );

  return (
    <div className={className}>
      {/* Mobil Filtre Aç Butonu */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsOpenMobile(true)}
          className="w-full py-3 px-4 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
        >
          <FunnelIcon className="w-4 h-4" />
          <span>Filtreleri Göster & Düzenle</span>
        </button>
      </div>

      {/* Mobil Modal Çekmecesi */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpenMobile(false)}
          />
          <div className="relative ml-auto w-full max-w-xs h-full bg-white dark:bg-neutral-900 p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
                <span className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                  <FunnelIcon className="w-5 h-5 text-amber-500" />
                  İlan Filtreleri
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpenMobile(false)}
                  className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              {renderFilterContent()}
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={() => setIsOpenMobile(false)}
                className="w-full py-3 rounded-xl bg-amber-500 text-white font-bold text-xs"
              >
                Sonuçları Göster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Masaüstü Sabit Filtre Kartı */}
      <div className="hidden lg:block bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm sticky top-28">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-5">
          <span className="font-extrabold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-amber-500" />
            Detaylı Arama
          </span>
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-semibold text-amber-600 hover:underline"
          >
            Temizle
          </button>
        </div>
        {renderFilterContent()}
      </div>
    </div>
  );
};

export default PetListingFilter;

