"use client";

import React from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { ALL_BREEDS } from "@/data/kopekDunyasiData";
import {
  CheckBadgeIcon,
  MapPinIcon,
  SparklesIcon,
  ArrowRightIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

export interface MemberCompany {
  id: string;
  name: string;
  image: string;
  city: string;
  district: string;
  badge: string;
  activeListingsCount: number;
  memberSince: string;
  phone: string;
  specialties: string[];
  description: string;
}

export const CORPORATE_COMPANIES: MemberCompany[] = [
  {
    id: "firma-1",
    name: "Vonalp Pet & Irk Merkezi",
    image: "/images/breeds/poodle-toy.png",
    city: "İstanbul",
    district: "Kadıköy",
    badge: "Kurumsal Üye • 5. Yıl",
    activeListingsCount: 28,
    memberSince: "Ocak 2021",
    phone: "0532 411 10 10",
    specialties: ["Poodle - Toy", "Maltipoo", "Pomeranian Boo"],
    description:
      "Ev ve apartman yaşamına uygun minyatür ve süs ırklarında veteriner hekim kontrolünde mikroçipli ve aşı karneli ilan merkezi.",
  },
  {
    id: "firma-2",
    name: "Karatay Elit Köpek Çiftliği",
    image: "/images/breeds/golden-retriever.png",
    city: "Konya",
    district: "Karatay Merkez",
    badge: "Doğrulanmış Firma",
    activeListingsCount: 19,
    memberSince: "Mart 2022",
    phone: "0532 999 42 42",
    specialties: ["Poodle - Toy", "Golden Retriever", "Kangal"],
    description:
      "Konya Karatay merkezde aile ortamında yetişen, tüm iç-dış parazit ve karma aşıları tamamlanmış safkan köpek ilanları.",
  },
  {
    id: "firma-3",
    name: "KIF Lisanslı Patiler Çiftliği",
    image: "/images/breeds/cane-corsa.png",
    city: "Bursa",
    district: "Nilüfer",
    badge: "Lisanslı Çiftlik • 6. Yıl",
    activeListingsCount: 34,
    memberSince: "Mayıs 2020",
    phone: "0533 616 16 16",
    specialties: ["Cane Corso", "Doberman", "Rottweiler"],
    description:
      "Bursa Nilüfer'de FCI ve KIF standartlarına uygun, kalça ve genetik sağlık kontrolleri yapılmış koruma ve aile ırkları merkezi.",
  },
  {
    id: "firma-4",
    name: "Anadolu Safkan Köpek Kulübü",
    image: "/images/breeds/alman-kurdu.png",
    city: "Ankara",
    district: "Çankaya",
    badge: "Kurumsal Kulüp",
    activeListingsCount: 24,
    memberSince: "Eylül 2021",
    phone: "0542 312 06 06",
    specialties: ["Alman Kurdu", "Belçika Kurdu (Malinois)", "Labrador"],
    description:
      "Ankara Çankaya'da temel ve ileri itaat eğitimine uygun, yüksek zekalı iş ve aile köpekleri yetiştirici ve sahip kulübü.",
  },
  {
    id: "firma-5",
    name: "Ege Elit Süs Köpekleri Merkezi",
    image: "/images/breeds/terrier-maltese.png",
    city: "İzmir",
    district: "Karşıyaka",
    badge: "Doğrulanmış Firma • 4. Yıl",
    activeListingsCount: 21,
    memberSince: "Şubat 2022",
    phone: "0535 350 35 35",
    specialties: ["Maltese Terrier", "French Bulldog", "Yorkshire Terrier"],
    description:
      "İzmir Karşıyaka'da tüy dökmeyen, anti-alerjik ve apartman dairesi yaşamına tam uyumlu elit ırkların buluşma noktası.",
  },
  {
    id: "firma-6",
    name: "Akdeniz Dostlar Köpek Evi",
    image: "/images/breeds/border-collie.png",
    city: "Antalya",
    district: "Muratpaşa",
    badge: "Kurumsal Üye",
    activeListingsCount: 17,
    memberSince: "Haziran 2023",
    phone: "0538 777 07 07",
    specialties: ["Border Collie", "Beagle", "Samoyed"],
    description:
      "Antalya Muratpaşa'da enerjik, çocuk dostu ve sosyal karakterli safkan köpek sahipleri ile köpek arayanları buluşturan merkez.",
  },
];

export default function UyelerPage() {
  return (
    <div className="min-h-screen py-4 sm:py-10 lg:py-14 bg-[#FAF8F5] dark:bg-[#151312] transition-colors">
      <div className="max-w-[1720px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 space-y-5 sm:space-y-10">
        {/* ÜST BAŞLIK */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#dc5075]/10 text-[#dc5075] font-bold text-[10px] sm:text-xs uppercase tracking-wider">
            <BuildingStorefrontIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Kurumsal Firmalar, Çiftlikler & Kulüpler</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
            Kurumsal Üyelerimiz
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] px-2">
            Köpek Evreni platformunda yer alan doğrulanmış 6 kurumsal firma, çiftlik ve popüler ırk kulüpleri.
          </p>
        </div>

        {/* 6 FİRMA GRİDİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {CORPORATE_COMPANIES.map((company) => (
            <div
              key={company.id}
              className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xs hover:shadow-lg hover:border-[#dc5075]/40 transition-all flex flex-col justify-between space-y-3 sm:space-y-5"
            >
              <div className="space-y-2.5 sm:space-y-4">
                {/* Üst Firma Başlık & Avatar */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full p-0.5 sm:p-1 bg-gradient-to-tr from-[#dc5075] via-amber-400 to-[#802859] shrink-0">
                    <img
                      src={company.image}
                      alt={company.name}
                      className="w-full h-full rounded-full object-cover bg-white dark:bg-neutral-900"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[9px] sm:text-[10px] font-bold mb-0.5 sm:mb-1">
                      {company.badge}
                    </span>
                    <h3 className="font-bold text-sm sm:text-lg text-neutral-900 dark:text-neutral-100 flex items-center gap-1 truncate">
                      <span className="truncate">{company.name}</span>
                      <CheckBadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0" />
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                      <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#dc5075] shrink-0" />
                      <span>
                        {company.city} / {company.district}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Firma Açıklaması */}
                <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {company.description}
                </p>

                {/* Uzmanlık Irkları */}
                <div className="space-y-1">
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Öne Çıkan Cinsler:
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {company.specialties.map((spec) => (
                      <Link
                        key={spec}
                        href={`/listing-stay?breed=${encodeURIComponent(spec)}` as Route}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-[#dc5075] hover:text-white text-neutral-700 dark:text-neutral-300 text-[10px] sm:text-[11px] font-semibold transition-colors"
                      >
                        🐾 {spec}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alt İletişim & İlanlar Butonu */}
              <div className="pt-2.5 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-500">
                  <span className="flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300">
                    <PhoneIcon className="w-3.5 h-3.5 text-emerald-600" />
                    {company.phone}
                  </span>
                  <span className="font-bold text-[#dc5075]">
                    {company.activeListingsCount} Aktif İlan
                  </span>
                </div>

                <Link
                  href={`/listing-stay?city=${encodeURIComponent(company.city)}` as Route}
                  className="w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-[#dc5075] hover:bg-[#c23d60] text-white text-[11px] sm:text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Firmanın İlanlarını İncele</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* TÜM CİNSLER HIZLI GEÇİŞ */}
        <div className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3.5 sm:p-6 space-y-3 sm:space-y-4">
          <h2 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
            Cinslere Göre İlan Grupları
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
            {ALL_BREEDS.slice(0, 18).map((b) => (
              <Link
                key={b.slug}
                href={`/listing-stay?breed=${encodeURIComponent(b.name)}` as Route}
                className="flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-[#dc5075] transition-all group"
              >
                <img
                  src={b.image || `/images/breeds/${b.slug}.png`}
                  alt={b.name}
                  className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover ring-1 sm:ring-2 ring-neutral-200 dark:ring-neutral-700 group-hover:ring-[#dc5075] shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-[#dc5075]">
                    {b.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-400">{b.count} İlan</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
