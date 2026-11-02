"use client";

import React, { FC, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MOCK_PET_LISTINGS } from "@/data/mockPets";
import {
  VITRIN_LISTINGS,
  YENI_EKLENEN_ILANLAR,
  GUNUN_VITRIN_ILANLARI,
} from "@/data/kopekDunyasiData";
import { getLocationCoordinates } from "@/data/turkeyLocations";
import { PetListing } from "@/types/pet";
import { Route } from "@/routers/types";
import PetCard from "@/components/PetCard";
import { MobilePetCard } from "@/components/MobileCards";
import InteractiveMap from "@/components/InteractiveMap";
import {
  MapPinIcon,
  CheckBadgeIcon,
  XCircleIcon,
  HeartIcon,
  ShareIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  EyeIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const ListingStayDetailPage: FC = () => {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("id");

  const [isLiked, setIsLiked] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

  // İlanı bul veya Vitrin/Güncel listelerden dönüştür
  const pet: PetListing = useMemo(() => {
    const found = MOCK_PET_LISTINGS.find((p) => p.id === listingId);
    if (found) return found;

    const vitrinFound = VITRIN_LISTINGS.find((v) => v.id === listingId);
    if (vitrinFound) {
      const coords = getLocationCoordinates(vitrinFound.city, "Merkez");
      const breedImg = `/images/breeds/${vitrinFound.breedSlug}.png`;
      return {
        id: vitrinFound.id,
        slug: vitrinFound.id,
        title: vitrinFound.title,
        description: `${vitrinFound.city} merkezde veteriner hekim kontrolünde tüm aşıları ve parazit uygulamaları eksiksiz tamamlanmış, mikroçipli ve sağlıklı ${vitrinFound.breed} (${vitrinFound.ageText}, ${vitrinFound.gender}) dostumuz.`,
        listingType: "ADOPTION",
        petType: "DOG",
        breed: vitrinFound.breed,
        breedSlug: vitrinFound.breedSlug,
        gender: vitrinFound.gender === "Erkek" ? "MALE" : "FEMALE",
        ageGroup: "PUPPY",
        exactAgeText: vitrinFound.ageText,
        size: "MEDIUM",
        featured: vitrinFound.superIlan || vitrinFound.status === "Vitrin İlanı",
        badges: {
          vaccinated: true,
          microchipped: true,
          neutered: false,
          internalParasite: true,
          houseTrained: true,
          pedigree: true,
          apartmentFriendly: true,
        },
        location: {
          city: vitrinFound.city,
          district: "Merkez",
          lat: coords.lat,
          lng: coords.lng,
        },
        featuredImage: breedImg,
        galleryImages: [breedImg, breedImg, breedImg, breedImg],
        contact: {
          phone: "+90 532 444 00 00",
          whatsapp: "905324440000",
          showPhone: true,
          preferredContact: "ANY",
        },
        author: {
          id: "user-vitrin",
          name: "Doğrulanmış Köpek Sahibi",
          avatar: breedImg,
          memberSince: "Ocak 2024",
          badge: vitrinFound.status,
          verified: true,
        },
        publishedAt: "Bugün",
        viewsCount: vitrinFound.views,
        likesCount: Math.floor(vitrinFound.views / 4),
      };
    }

    const guncelFound = [...YENI_EKLENEN_ILANLAR, ...GUNUN_VITRIN_ILANLARI].find(
      (g) => g.id === listingId
    );
    if (guncelFound) {
      const coords = getLocationCoordinates(guncelFound.city, guncelFound.district);
      const breedImg = `/images/breeds/${guncelFound.breedSlug}.png`;
      return {
        id: guncelFound.id,
        slug: guncelFound.id,
        title: guncelFound.title,
        description: `${guncelFound.city} ${guncelFound.district} bölgesinde tüm sağlık kontrolleri ve aşı takvimi tamamlanmış, mikroçipli safkan ${guncelFound.breed} (${guncelFound.ageText}, ${guncelFound.gender}) dostumuz.`,
        listingType: "ADOPTION",
        petType: "DOG",
        breed: guncelFound.breed,
        breedSlug: guncelFound.breedSlug,
        gender: guncelFound.gender === "Erkek" ? "MALE" : "FEMALE",
        ageGroup: "PUPPY",
        exactAgeText: guncelFound.ageText,
        size: "MEDIUM",
        featured: true,
        badges: {
          vaccinated: true,
          microchipped: true,
          neutered: false,
          internalParasite: true,
          houseTrained: true,
          pedigree: true,
          apartmentFriendly: true,
        },
        location: {
          city: guncelFound.city,
          district: guncelFound.district,
          lat: coords.lat,
          lng: coords.lng,
        },
        featuredImage: breedImg,
        galleryImages: [breedImg, breedImg, breedImg, breedImg],
        contact: {
          phone: "+90 532 444 00 00",
          whatsapp: "905324440000",
          showPhone: true,
          preferredContact: "ANY",
        },
        author: {
          id: "user-guncel",
          name: "Doğrulanmış Köpek Sahibi",
          avatar: breedImg,
          memberSince: "Mart 2024",
          badge: guncelFound.status,
          verified: true,
        },
        publishedAt: guncelFound.dateText,
        viewsCount: 245,
        likesCount: 42,
      };
    }

    return MOCK_PET_LISTINGS[0];
  }, [listingId]);

  // Aynı ırktan veya benzer ilanlar
  const relatedPets = useMemo(() => {
    return MOCK_PET_LISTINGS.filter((p) => p.id !== pet.id).slice(0, 4);
  }, [pet]);

  const getBadgeInfo = () => {
    switch (pet.listingType) {
      case "ADOPTION":
        return {
          label: "✨ Vitrin İlanı",
          color: "bg-[#dc5075] text-white",
          sub: "Güncel Köpek İlanı",
        };
      case "MATING":
        return {
          label: "⚡ Yeni Eklenen İlan",
          color: "bg-purple-600 text-white",
          sub: "Doğrulanmış İlan",
        };
      case "LOST_FOUND":
        return {
          label: "⭐ Süper İlan",
          color: "bg-amber-600 text-white",
          sub: "Özel Irk İlanı",
        };
      default:
        return {
          label: "İlan",
          color: "bg-neutral-800 text-white",
          sub: "Evcil Hayvan İlanı",
        };
    }
  };

  const badgeInfo = getBadgeInfo();
  const gallery = pet.galleryImages && pet.galleryImages.length >= 4 
    ? pet.galleryImages 
    : [pet.featuredImage, pet.featuredImage, pet.featuredImage, pet.featuredImage, pet.featuredImage];

  return (
    <div className="min-h-screen py-6 lg:py-10 bg-white dark:bg-neutral-900">
      <div className="container max-w-7xl">
        {/* 1. ÜST BREADCRUMB & DURUM ŞERİDİ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-100 dark:border-neutral-800 text-xs">
          <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="hover:text-amber-500">Ana Sayfa</Link>
            <span>/</span>
            <Link href={"/listing-stay" as Route} className="hover:text-amber-500">İlanlar</Link>
            <span>/</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-xs">{pet.breed}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsLiked(!isLiked)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-medium"
            >
              {isLiked ? (
                <HeartSolidIcon className="w-4 h-4 text-red-500" />
              ) : (
                <HeartIcon className="w-4 h-4 text-neutral-400" />
              )}
              <span>{isLiked ? "Favorilerimde" : "Favoriye Ekle"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: pet.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("İlan bağlantısı panoya kopyalandı!");
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-medium"
            >
              <ShareIcon className="w-4 h-4 text-neutral-400" />
              <span>Paylaş</span>
            </button>
          </div>
        </div>

        {/* 2. MODERN 5'Lİ BENTO FOTOĞRAF GALERİSİ */}
        <div className="mb-10 rounded-3xl overflow-hidden relative shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[480px]">
            {/* Büyük Ana Fotoğraf (Sol 2 Kolon) */}
            <div
              className="md:col-span-2 h-56 sm:h-72 md:h-full relative overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImageModal(gallery[0])}
            >
              <img
                src={gallery[0]}
                alt={pet.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-black shadow-md ${badgeInfo.color}`}>
                  {badgeInfo.label}
                </span>
                {pet.isUrgent && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-black bg-red-600 text-white tracking-wider shadow-md">
                    ACİL YUVA
                  </span>
                )}
              </div>
            </div>

            {/* Sağ Yan Fotoğraflar (2 Kolon, 4'lü Grid) */}
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
              {gallery.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-full overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedImageModal(img)}
                >
                  <img
                    src={img}
                    alt={`${pet.title} - ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Galeri İkon Butonu */}
          <button
            type="button"
            onClick={() => setSelectedImageModal(gallery[0])}
            className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-2xl bg-neutral-900/80 hover:bg-neutral-900 text-white backdrop-blur-md text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <Squares2X2Icon className="w-4 h-4" />
            <span>Tüm Fotoğrafları Gör ({gallery.length})</span>
          </button>
        </div>

        {/* 3. ANA DETAY ALANI: SOL İÇERİK & SAĞ STICKY İLETİŞİM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* SOL KOLON (8 Kolon): Kimlik Kartı, Rozetler, Açıklama, Harita */}
          <div className="lg:col-span-8 space-y-8">
            {/* İlan Başlığı & Meta Bilgileri */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
                {pet.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                  <MapPinIcon className="w-4 h-4 text-amber-500" />
                  {pet.location.city}, {pet.location.district}
                  {pet.location.neighborhood && ` (${pet.location.neighborhood})`}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CalendarDaysIcon className="w-4 h-4" />
                  İlan Tarihi: {pet.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <EyeIcon className="w-4 h-4" />
                  {pet.viewsCount} Görüntülenme
                </span>
              </div>
            </div>

            {/* HAYVAN KİMLİK KARTI (İkonlu Özellik Tablosu) */}
            <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-amber-500" />
                <span>Hayvan Kimlik Kartı & Temel Özellikler</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block mb-0.5">Tür</span>
                  <span className="text-sm font-black text-neutral-800 dark:text-neutral-100">Köpek</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block mb-0.5">Irk</span>
                  <Link
                    href={`/listing-stay?breed=${encodeURIComponent(pet.breed)}` as Route}
                    className="text-sm font-black text-[#dc5075] hover:underline flex items-center gap-1.5"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-100 shrink-0 ring-2 ring-[#dc5075]/60 inline-flex items-center justify-center shadow-xs">
                      <img
                        src={`/images/breeds/${pet.breedSlug || 'poodle-toy'}.png`}
                        alt={pet.breed}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="truncate">{pet.breed}</span>
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block mb-0.5">Yaş</span>
                  <span className="text-sm font-black text-neutral-800 dark:text-neutral-100">{pet.exactAgeText}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block mb-0.5">Cinsiyet</span>
                  <span className="text-sm font-black text-neutral-800 dark:text-neutral-100">
                    {pet.gender === "MALE" ? "Erkek ♂" : "Dişi ♀"}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block mb-0.5">Boyut</span>
                  <span className="text-sm font-black text-neutral-800 dark:text-neutral-100">
                    {pet.size === "MINI" && "Minyatür (<4 kg)"}
                    {pet.size === "SMALL" && "Küçük (4-10 kg)"}
                    {pet.size === "MEDIUM" && "Orta Boy (10-25 kg)"}
                    {pet.size === "LARGE" && "Büyük Irk (25-45 kg)"}
                    {pet.size === "GIANT" && "Dev Irk (45+ kg)"}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block mb-0.5">İlan Durumu</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Aktif İlan</span>
                </div>
              </div>
            </div>

            {/* SAĞLIK VE YAŞAM DURUMU ROZETLERİ (Yeşil Onay İkonlu) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
                <span>Sağlık, Aşı ve Bakım Durumu</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Aşıları Tamamlanmış (Aşı Karneli)", val: pet.badges.vaccinated },
                  { label: "Mikroçipli (Tarım ve Orman Bak. Kayıtlı)", val: pet.badges.microchipped },
                  { label: "Kısırlaştırılmış", val: pet.badges.neutered },
                  { label: "İç ve Dış Parazit Uygulamaları Yapıldı", val: pet.badges.internalParasite },
                  { label: "Tuvalet Eğitimli (Ev Yaşamına Hazır)", val: pet.badges.houseTrained },
                  { label: "Apartman / Daire Yaşamına Uygun", val: pet.badges.apartmentFriendly },
                  { label: "Secereli (KIF / FCI Irk Standartı)", val: pet.badges.pedigree },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-2xl border ${
                      item.val
                        ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/30 text-emerald-900 dark:text-emerald-300"
                        : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200/50 dark:border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {item.val ? (
                      <CheckBadgeIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircleIcon className="w-5 h-5 text-neutral-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAYLI İLAN AÇIKLAMASI */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-white mb-3">
                İlan Hakkında Açıklama
              </h2>
              <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                {pet.description}
              </div>

              {pet.reward && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                  🎁 <strong>Ödül Notu:</strong> {pet.reward}
                </div>
              )}
            </div>

            {/* KONUM BİLGİSİ */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-amber-500" />
                <span>Konum & Teslim Bölgesi</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                {pet.location.city} ili, {pet.location.district} ilçesi
                {pet.location.neighborhood && `, ${pet.location.neighborhood} mahallesi`} civarı.
              </p>

              <div className="space-y-3">
                <InteractiveMap
                  lat={pet.location.lat}
                  lng={pet.location.lng}
                  zoom={14}
                  currentLocationLabel={`${pet.location.city} / ${pet.location.district}`}
                  height="280px"
                />
                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300">
                  <span>📍</span>
                  <span>
                    Haritada <strong>{pet.location.city} / {pet.location.district}</strong> merkezi gösterilmektedir. İlan sahibiyle mesajlaşarak ortak bir veteriner kliniğinde güvenle buluşabilirsiniz.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ KOLON (4 Kolon - STICKY SIDEBAR): İlan Sahibi, WhatsApp & Sözleşme Uyarısı */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-7 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xl space-y-6">
              {/* FİYAT YERİNE ÜCRETSİZ BİLDİRİMİ */}
              <div className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                  İlan Durumu
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#dc5075] dark:text-[#f26ba8]">
                    GÜNCEL İLAN
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    (Doğrulanmış)
                  </span>
                </div>
              </div>

              {/* İlan Sahibi Profili */}
              <div className="flex items-center gap-3.5">
                <img
                  src={pet.author.avatar}
                  alt={pet.author.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                      {pet.author.name}
                    </h3>
                    {pet.author.verified && (
                      <CheckBadgeIcon className="w-4 h-4 text-blue-500" title="Doğrulanmış Üye" />
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    Üyelik: {pet.author.memberSince}
                  </span>
                  <span className="inline-block px-2 py-0.5 mt-1 rounded-md text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {pet.author.badge || "Bireysel İlan"}
                  </span>
                </div>
              </div>

              {/* İletişim Aksiyon Butonları */}
              <div className="space-y-3 pt-2">
                {/* 1. Doğrudan WhatsApp Butonu */}
                <a
                  href={`https://wa.me/${pet.contact.whatsapp}?text=Merhaba,%20Köpek%20Evreni'ndeki%20"${encodeURIComponent(pet.title)}"%20ilanınız%20için%20yazıyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 transition-all text-center"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp ile Mesaj Gönder</span>
                </a>

                {/* 2. Telefon Numarası Butonu */}
                {pet.contact.showPhone ? (
                  showPhone ? (
                    <a
                      href={`tel:${pet.contact.phone.replace(/\s+/g, "")}`}
                      className="w-full py-3.5 px-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm flex items-center justify-center gap-2 transition-colors text-center"
                    >
                      <PhoneIcon className="w-5 h-5 text-amber-500" />
                      <span>{pet.contact.phone} (Şimdi Ara)</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowPhone(true)}
                      className="w-full py-3.5 px-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <PhoneIcon className="w-5 h-5 text-amber-500" />
                      <span>Telefon Numarasını Göster</span>
                    </button>
                  )
                ) : (
                  <div className="py-2.5 text-center text-xs text-neutral-400 italic">
                    İlan sahibi yalnızca WhatsApp üzerinden iletişimi tercih etmektedir.
                  </div>
                )}
              </div>

              {/* YASAL GÜVENLİK VE SAHİPLENME UYARISI */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400">
                  <ExclamationTriangleIcon className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Güvenli Sahiplenme Kuralları</span>
                </div>
                <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-300 text-[11px] list-disc list-inside leading-relaxed">
                  <li>Kesinlikle kapora, aşı parası veya nakliye bedeli göndermeyiniz.</li>
                  <li>Can dostunuzu mutlaka yerinde görüp teslim alınız.</li>
                  <li>Ücretsiz Hayvan Sahiplenme Sözleşmesi imzalamayı unutmayınız.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BENZER İLANLAR BÖLÜMÜ */}
        {relatedPets.length > 0 && (
          <div className="mt-20 pt-12 border-t border-neutral-100 dark:border-neutral-800">
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-6">
              İlginizi Çekebilecek Diğer Canlar
            </h2>
            <div className="grid grid-cols-2 gap-2.5 md:hidden">{relatedPets.map((p) => (<MobilePetCard key={p.id} item={p} />))}</div><div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPets.map((p) => (
                <PetCard key={p.id} data={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOTOĞRAF LIGHTBOX MODAL */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setSelectedImageModal(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
          >
            ✕ Kapat
          </button>
          <img
            src={selectedImageModal}
            alt="Büyük Görünüm"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ListingStayDetailPage;
