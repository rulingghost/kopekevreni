"use client";

import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Checkbox from "@/shared/Checkbox";
import FormItem from "../FormItem";
import { Gender, AgeGroup, SizeGroup } from "@/types/pet";
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const [petName, setPetName] = useState("Paşa");
  const [gender, setGender] = useState<Gender>("MALE");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("YOUNG");
  const [exactAge, setExactAge] = useState("1.5 Yaşında");
  const [size, setSize] = useState<SizeGroup>("LARGE");

  const [badges, setBadges] = useState({
    vaccinated: true,
    microchipped: true,
    neutered: false,
    internalParasite: true,
    houseTrained: true,
    apartmentFriendly: true,
    pedigree: false,
    urgent: false,
  });

  const toggleBadge = (key: keyof typeof badges) => {
    setBadges((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const HEALTH_ITEMS = [
    {
      key: "vaccinated" as const,
      label: "Aşıları Tam & Karneli",
      desc: "Karma, kuduz ve yıllık periyodik aşıları yapılmış ve veteriner onaylı.",
      emoji: "💉",
    },
    {
      key: "microchipped" as const,
      label: "Mikroçipli (PETVET Kayıtlı)",
      desc: "Tarım ve Orman Bakanlığı evcil hayvan kayıt sistemine kayıtlı mikroçipi var.",
      emoji: "📡",
    },
    {
      key: "neutered" as const,
      label: "Kısırlaştırılmış",
      desc: "Veteriner hekim tarafından cerrahi kısırlaştırma operasyonu tamamlanmış.",
      emoji: "✂️",
    },
    {
      key: "internalParasite" as const,
      label: "İç / Dış Parazit Uygulandı",
      desc: "Düzenli pire, kene ve iç parazit damla/hap tedavisi yapılmış.",
      emoji: "🛡️",
    },
    {
      key: "houseTrained" as const,
      label: "Tuvalet Eğitimli",
      desc: "Dışarıya veya ped üzerine tuvalet alışkanlığı oturmuş durumda.",
      emoji: "🚽",
    },
    {
      key: "apartmentFriendly" as const,
      label: "Apartman Yaşamına Uygun",
      desc: "Gereksiz havlama huyu olmayan, komşuları rahatsız etmeyecek mizaçta.",
      emoji: "🏢",
    },
    {
      key: "pedigree" as const,
      label: "Secereli (KIF / FCI Kayıtlı)",
      desc: "Resmi federasyon onaylı ırk soy kütüğü belgesi mevcut.",
      emoji: "📜",
    },
    {
      key: "urgent" as const,
      label: "🚨 Acil Yuva Arıyor",
      desc: "Geçici yuvadan çıkması gereken veya acil sahiplendirme ihtiyacı olan durum.",
      emoji: "⏰",
    },
  ];

  return (
    <div className="space-y-8">
      {/* TEMEL BİLGİLER */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          Dostunuzun Kimlik Bilgileri
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
          Sahiplenecek kişilerin dostunuzu daha yakından tanımasını sağlayacak fiziksel özellikleri girin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormItem label="Dostunuzun Adı">
            <Input
              placeholder="Örn: Paşa, Pamuk, Zeytin"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="mt-1"
            />
          </FormItem>

          <FormItem label="Cinsiyeti">
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="mt-1"
            >
              <option value="MALE">Erkek</option>
              <option value="FEMALE">Dişi</option>
            </Select>
          </FormItem>

          <FormItem label="Yaş Grubu">
            <Select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
              className="mt-1"
            >
              <option value="PUPPY">Yavru (0 - 6 Ay)</option>
              <option value="YOUNG">Genç (6 Ay - 2 Yaş)</option>
              <option value="ADULT">Yetişkin (2 - 6 Yaş)</option>
              <option value="SENIOR">Kıdemli / Yaşlı (7+ Yaş)</option>
            </Select>
          </FormItem>

          <FormItem
            label="Net Yaş Metni"
            desc="İlanda görünecek net yaş ifadesi"
          >
            <Input
              placeholder="Örn: 8 Aylık, 2 Yaşında, 45 Günlük"
              value={exactAge}
              onChange={(e) => setExactAge(e.target.value)}
              className="mt-1"
            />
          </FormItem>

          <FormItem label="Boyut Grubu" className="sm:col-span-2">
            <Select
              value={size}
              onChange={(e) => setSize(e.target.value as SizeGroup)}
              className="mt-1"
            >
              <option value="MINI">Minyatür Irk (1 - 4 kg)</option>
              <option value="SMALL">Küçük Irk (4 - 10 kg)</option>
              <option value="MEDIUM">Orta Boy Irk (10 - 25 kg)</option>
              <option value="LARGE">Büyük Boy Irk (25 - 45 kg)</option>
              <option value="GIANT">Dev Irk (45+ kg)</option>
            </Select>
          </FormItem>
        </div>
      </div>

      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      {/* SAĞLIK VE DURUM ROZETLERİ */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Sağlık, Aşı ve Bakım Durumları
          </h3>
          <span className="text-xs text-primary-600 font-medium">Seçimi kartlara tıklayarak yapabilirsiniz</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-4 sm:mb-5">
          Aşağıdaki onay rozetleri ilan kartınızın üstünde yeşil onay işaretiyle görünür ve güven oranını artırır.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {HEALTH_ITEMS.map((item) => {
            const isChecked = badges[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleBadge(item.key)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isChecked
                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm"
                    : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-800"
                }`}
              >
                <div className="text-xl mt-0.5">{item.emoji}</div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                      {item.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500 pointer-events-none"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageAddListing2;
