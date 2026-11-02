"use client";

import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { ListingType } from "@/types/pet";
import { ALL_BREEDS } from "@/data/kopekDunyasiData";
import {
  HeartIcon,
  HomeModernIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const [selectedType, setSelectedType] = useState<ListingType>("ADOPTION");
  const [petType, setPetType] = useState<string>("DOG");
  const [selectedBreed, setSelectedBreed] = useState<string>("Golden Retriever");
  const [title, setTitle] = useState<string>("");

  const LISTING_TYPES = [
    {
      id: "ADOPTION" as ListingType,
      title: "🐾 Yavru Köpek İlanı",
      badge: "Yavru İlanı",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
      desc: "Yeni doğan veya büyümekte olan yavru köpekleriniz için güncel ilan oluşturun.",
      borderActive: "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20",
    },
    {
      id: "MATING" as ListingType,
      title: "🐕 Yetişkin Köpek İlanı",
      badge: "Yetişkin İlanı",
      badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
      desc: "Genç veya yetişkin köpeğiniz için detaylı ve doğrulanmış ilan oluşturun.",
      borderActive: "border-rose-500 bg-rose-50/30 dark:bg-rose-950/20 ring-2 ring-rose-500/20",
    },
    {
      id: "LOST_FOUND" as ListingType,
      title: "⭐ Özel Irk / Vitrin İlanı",
      badge: "Vitrin İlanı",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
      desc: "Özel ırk, secereli veya öne çıkarmak istediğiniz köpekleriniz için vitrin ilanı verin.",
      borderActive: "border-amber-500 bg-amber-50/30 dark:bg-amber-950/20 ring-2 ring-amber-500/20",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* İLAN TÜRÜ SEÇİMİ */}
      <div>
        <label className="block text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 sm:mb-2">
          1. İlan Türünü Belirleyin <span className="text-red-500">*</span>
        </label>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
          İlanınızın amacına en uygun kategoriyi seçin. Unutmayın, Köpek Evreni'nde her türlü ticari satış kesinlikle yasaktır.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {LISTING_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedType(item.id)}
              className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                selectedType === item.id
                  ? `${item.borderActive} shadow-sm`
                  : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-800"
              }`}
            >
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold mb-1.5 sm:mb-2.5 ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center justify-end">
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedType === item.id
                    ? "border-primary-600 bg-primary-600"
                    : "border-neutral-300 dark:border-neutral-600"
                }`}>
                  {selectedType === item.id && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      {/* HAYVAN TÜRÜ VE IRKI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormItem
          label="Evcil Hayvan Türü"
          desc="İlan vereceğiniz dostunuzun genel türünü seçin."
        >
          <Select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            className="mt-1"
          >
            <option value="DOG">🐕 Köpek</option>
            <option value="CAT">🐈 Kedi</option>
            <option value="OTHER">🐾 Diğer Evcil Can</option>
          </Select>
        </FormItem>

        <FormItem
          label="Irk / Cins"
          desc="Irk Ansiklopedimiz ile otomatik eşleşir."
        >
          <Select
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
            className="mt-1"
          >
            {ALL_BREEDS.map((breed) => (
              <option key={breed.slug} value={breed.name}>
                {breed.name}
              </option>
            ))}
          </Select>

          {selectedBreed && (
            <div className="mt-2.5 flex items-center gap-2.5 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              {(() => {
                const b = ALL_BREEDS.find((x) => x.name === selectedBreed);
                return (
                  <>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white shrink-0 ring-2 ring-[#dc5075] shadow-xs flex items-center justify-center">
                      <img
                        src={b?.image || `/images/breeds/${b?.slug || "poodle-toy"}.png`}
                        alt={selectedBreed}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
                        {selectedBreed}
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        Irk standartları fotoğrafı doğrulandı
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </FormItem>
      </div>

      {/* İLAN BAŞLIĞI */}
      <FormItem
        label="İlan Başlığı"
        desc="Arama listelerinde dikkat çekecek, net ve sevgi dolu bir başlık yazın."
      >
        <Input
          placeholder="Örn: 2 Aylık Aşıları Tam, Safkan Toy Poodle Yavrumuz"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1"
        />
      </FormItem>

      {/* YASAL BİLGİLENDİRME KUTUSU */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
        <SparklesIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
          <strong>Köpek Evreni İlan Güvencesi:</strong> Platformumuz köpek sahipleri ile köpek arayanları bir araya getirmektedir. İlanlarınızda doğru ve eksiksiz bilgi vermeniz, aşı ve sağlık durumunu belirtmeniz önemlidir. Teslim almadığınız can için önceden kapora göndermeyiniz.
        </p>
      </div>
    </div>
  );
};

export default PageAddListing1;
