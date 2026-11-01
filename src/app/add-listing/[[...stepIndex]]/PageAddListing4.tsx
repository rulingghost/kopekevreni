"use client";

import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import Link from "next/link";
import InteractiveMap from "@/components/InteractiveMap";
import { useAuth } from "@/context/AuthContext";
import { Route } from "@/routers/types";
import {
  TURKEY_LOCATIONS,
  CITIES_LIST,
  getDistrictsOfCity,
  getLocationCoordinates,
} from "@/data/turkeyLocations";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export interface PageAddListing4Props {}

const PageAddListing4: FC<PageAddListing4Props> = () => {
  const { user } = useAuth();
  // Default to Konya / Karatay as user specifically requested
  const [city, setCity] = useState(user?.city || "Konya");
  const [district, setDistrict] = useState(user?.district || "Karatay");
  const [coords, setCoords] = useState(() => getLocationCoordinates("Konya", "Karatay"));
  const [address, setAddress] = useState("Mevlana Civarı, Karatay");
  const [authorName, setAuthorName] = useState(user?.name || "Ahmet Karataylı");
  const [phone, setPhone] = useState(user?.phone || "0532 442 00 42");
  const [allowWhatsapp, setAllowWhatsapp] = useState(true);
  const [showPhone, setShowPhone] = useState(true);

  const [agreement1, setAgreement1] = useState(true);
  const [agreement2, setAgreement2] = useState(true);
  const [isPublished, setIsPublished] = useState(false);

  const currentDistricts = getDistrictsOfCity(city);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const districts = getDistrictsOfCity(newCity);
    const firstDistrict = districts[0]?.name || "Merkez";
    setDistrict(firstDistrict);
    const newCoords = getLocationCoordinates(newCity, firstDistrict);
    setCoords(newCoords);
  };

  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
    const newCoords = getLocationCoordinates(city, newDistrict);
    setCoords(newCoords);
  };

  if (isPublished) {
    return (
      <div className="text-center py-12 px-4 space-y-6">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircleIcon className="w-12 h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          🐾 İlanınız Başarıyla Yayına Alındı!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto text-sm leading-relaxed">
          Köpek ilanınız başarıyla oluşturuldu ve haritada <strong>{city} / {district}</strong> konumunda yayınlandı.
        </p>

        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl max-w-sm mx-auto text-left border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">İlan Başlığı:</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">Safkan Yavru İlanı</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Konum (Şehir / İlçe):</span>
            <span className="font-semibold text-emerald-600">{city} / {district}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Harita Koordinatı:</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">İlan Numarası:</span>
            <span className="font-semibold text-[#dc5075]">#KE-2026-9812</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href={"/ilanlarim" as Route}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#dc5075] text-white font-semibold text-sm hover:bg-[#c23d60] transition-colors shadow-sm"
          >
            📋 İlanlarım Sayfasına Git
          </Link>
          <Link
            href={"/listing-stay" as Route}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Tüm İlanları Gör
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* KONUM SEÇİMİ */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-[#dc5075]" />
          <span>İlan Konumu ve Gerçek Harita Seçimi</span>
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
          İlanınızın bulunacağı şehir ve ilçeyi seçin. Harita seçilen ilçenin merkezine otomatik olarak odaklanacaktır.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormItem label="Şehir">
            <Select
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="mt-1 font-semibold"
            >
              {CITIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </FormItem>

          <FormItem label="İlçe (Harita Otomatik Odaklanır)">
            <Select
              value={district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="mt-1 font-semibold"
            >
              {currentDistricts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name} {city === "Konya" && d.name === "Karatay" ? "(Karatay Merkez)" : ""}
                </option>
              ))}
            </Select>
          </FormItem>

          <FormItem label="Açık Adres / Mahalle / Tarif (Opsiyonel)" className="sm:col-span-2">
            <Input
              placeholder="Örn: Mevlana Civarı, Alaaddin Tepesi Yakını, Karatay"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1"
            />
          </FormItem>
        </div>

        {/* GERÇEK İNTERAKTİF HARİTA */}
        <div className="mt-5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Canlı Harita Konumu: <span className="text-[#dc5075]">{city} / {district} Merkez</span></span>
            </label>
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
              Enlem: {coords.lat.toFixed(4)} | Boylam: {coords.lng.toFixed(4)}
            </span>
          </div>

          <InteractiveMap
            lat={coords.lat}
            lng={coords.lng}
            zoom={coords.zoom || 14}
            interactive={true}
            currentLocationLabel={`${city} - ${district} Merkez`}
            onLocationSelect={(c) => setCoords({ ...c, zoom: 15 })}
            height="380px"
          />

          <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200">
            <span className="text-base">📌</span>
            <span>
              Harita şu anda <strong>{city} {district}</strong> merkezine ayarlandı. Teslimat için spesifik bir nokta seçmek isterseniz harita üzerinde istediğiniz sokağa veya binaya tıklayabilirsiniz.
            </span>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      {/* İLETİŞİM BİLGİLERİ */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          İletişim Tercihleri
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
          Köpek arayan kişilerin sizinle nasıl iletişime geçmesini istediğinizi belirleyin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <FormItem label="Adınız Soyadınız">
            <Input
              placeholder="Örn: Ahmet Yılmaz"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="mt-1"
            />
          </FormItem>

          <FormItem label="Telefon Numaranız">
            <Input
              placeholder="05XX XXX XX XX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </FormItem>
        </div>

        {/* TOGGLES */}
        <div className="space-y-3 bg-neutral-50 dark:bg-neutral-800/60 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={allowWhatsapp}
              onChange={(e) => setAllowWhatsapp(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
            />
            <div>
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <ChatBubbleLeftRightIcon className="w-4 h-4 text-emerald-600" />
                WhatsApp ile Mesaj Alımına İzin Ver
              </span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Adaylar ilan detayından tek tıkla doğrudan WhatsApp hattınıza mesaj yazabilir.
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPhone}
              onChange={(e) => setShowPhone(e.target.checked)}
              className="w-4 h-4 text-[#dc5075] rounded border-neutral-300 focus:ring-[#dc5075]"
            />
            <div>
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <PhoneIcon className="w-4 h-4 text-[#dc5075]" />
                Telefon Numaramı Sitede Göster
              </span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Açık olduğunda telefon numaranız 'Numarayı Göster' butonu arkasında görünür.
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      {/* YASAL TAAHHÜT VE PLATFORM KURALLARI ONAYI */}
      <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-4">
        <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-bold text-sm">
          <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
          İlan Kuralları & Güvenlik Beyanı
        </div>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreement1}
            onChange={(e) => setAgreement1(e.target.checked)}
            className="w-4 h-4 text-[#dc5075] rounded border-neutral-300 focus:ring-[#dc5075] mt-0.5"
          />
          <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Bu ilan kapsamında <strong>verdiğim tüm bilgilerin doğruluğunu</strong>, önceden kapora talep etmeyeceğimi ve platform kurallarına uygun hareket edeceğimi beyan ederim.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreement2}
            onChange={(e) => setAgreement2(e.target.checked)}
            className="w-4 h-4 text-[#dc5075] rounded border-neutral-300 focus:ring-[#dc5075] mt-0.5"
          />
          <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Görüşmelerde köpeğin <strong>veteriner aşı karnesi ve mikroçip</strong> bilgilerinin mevcut olduğunu teyit ederim.
          </span>
        </label>
      </div>

      {/* YAYINLAMA AKSİYON BUTONU */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!agreement1 || !agreement2}
          onClick={() => setIsPublished(true)}
          className={`w-full py-4 rounded-2xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
            agreement1 && agreement2
              ? "bg-[#dc5075] hover:bg-[#c23d60] text-white shadow-[#dc5075]/25 cursor-pointer"
              : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed"
          }`}
        >
          <SparklesIcon className="w-5 h-5" />
          🐾 İlanı Doğrula ve Yayınla
        </button>
      </div>
    </div>
  );
};

export default PageAddListing4;
