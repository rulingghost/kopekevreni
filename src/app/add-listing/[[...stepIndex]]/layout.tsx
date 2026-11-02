"use client";

import React, { FC, useState } from "react";
import { Route } from "@/routers/types";
import Link from "next/link";
import { useAuth, SAMPLE_DEMO_USER } from "@/context/AuthContext";
import {
  SparklesIcon,
  CheckCircleIcon,
  LockClosedIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export interface CommonLayoutProps {
  children: React.ReactNode;
  params: {
    stepIndex: string;
  };
}

const STEP_TITLES: Record<number, { title: string; desc: string }> = {
  1: {
    title: "İlan Türü ve Irk Seçimi",
    desc: "İlanınızın amacını ve dostunuzun ırk kategorisini belirleyin.",
  },
  2: {
    title: "Hayvan Künyesi ve Sağlık Durumu",
    desc: "Yaş, cinsiyet, aşı, kısırlaştırma ve karakter özelliklerini belirtin.",
  },
  3: {
    title: "Fotoğraflar ve Hikayesi",
    desc: "Dostunuzun net fotoğraflarını yükleyin ve hikayesini samimiyetle anlatın.",
  },
  4: {
    title: "Konum, İletişim ve İlan Onayı",
    desc: "Bulunduğunuz şehir/ilçeyi ve iletişim kanallarını ekleyerek ilanı yayınlayın.",
  },
};

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
  const { user, isLoaded, login, loginAsDemo } = useAuth();
  const [email, setEmail] = useState(SAMPLE_DEMO_USER.email);
  const [password, setPassword] = useState("123456");

  const index = Math.min(Math.max(Number(params.stepIndex) || 1, 1), 4);
  const nextHref = (index < 4 ? `/add-listing/${index + 1}` : `/add-listing/4`) as Route;
  const backHref = (index > 1 ? `/add-listing/${index - 1}` : `/add-listing/1`) as Route;
  const nextBtnText = index >= 4 ? "🐾 İlanı Ücretsiz Yayınla" : "Devam Et";
  const progressPercent = (index / 4) * 100;

  if (!isLoaded) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-sm text-neutral-500">
        Yükleniyor...
      </div>
    );
  }

  // KULLANICI GİRİŞ YAPMAMIŞSA -> İLAN VERDİRME, GİRİŞ İSTE
  if (!user) {
    return (
      <div className="min-h-[82vh] py-10 lg:py-16 bg-[#FAF8F5] dark:bg-[#151312] flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-[#dc5075] flex items-center justify-center mx-auto">
              <LockClosedIcon className="w-8 h-8" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[#dc5075] text-[11px] font-bold uppercase tracking-wider">
              Üye Girişi Zorunlu
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              İlan Vermek İçin Giriş Yapmalısınız
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Köpek Evreni güvenlik standartları gereği giriş yapmadan ilan oluşturulamaz. Lütfen üye girişi yapın veya örnek hesap ile hemen devam edin.
            </p>
          </div>

          {/* SADECE TEK TIKLA ÖRNEK KULLANICI GİRİŞ BUTONU */}
          <button
            type="button"
            onClick={loginAsDemo}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            🚀 Tek Tıkla Örnek Kullanıcı İle Giriş Yap
          </button>

          {/* NORMAL E-POSTA & ŞİFRE GİRİŞ FORMU */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, password);
            }}
            className="space-y-4 pt-2 border-t border-neutral-100 dark:border-neutral-800"
          >
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                E-Posta Adresiniz
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#dc5075]"
                />
                <EnvelopeIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Şifreniz
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#dc5075]"
                />
                <LockClosedIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-[#dc5075] hover:bg-[#c23d60] text-white font-bold text-sm shadow-md transition-all"
            >
              Giriş Yap ve İlan Oluştur
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-8 sm:py-14 lg:pb-32 bg-[#FAF8F5] dark:bg-[#151312] min-h-screen transition-colors">
      <div className="space-y-8">
        {/* AKTİF İLAN VEREN ÜYE BİLGİ BANTI */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 text-xs">
          <div className="flex items-center gap-2.5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500"
            />
            <span className="text-neutral-700 dark:text-neutral-200">
              İlan Veren Hesap: <strong className="font-bold">{user.name}</strong>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
              <CheckBadgeIcon className="w-3.5 h-3.5" />
              <span>{user.badge}</span>
            </span>
          </div>
          <Link
            href={"/ilanlarim" as Route}
            className="font-bold text-[#dc5075] hover:underline"
          >
            İlanlarım Paneli →
          </Link>
        </div>

        {/* PROGRESS HEADER */}
        <div className="bg-white dark:bg-[#1E1C1A] rounded-3xl p-6 sm:p-7 shadow-sm border border-[#EDE7DE] dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#7A1C30]/10 text-[#7A1C30] dark:text-[#E2A9B5] mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                Adım {index} / 4
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
                {STEP_TITLES[index]?.title || "İlan Verme Sihirbazı"}
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-0.5 font-light">
                {STEP_TITLES[index]?.desc}
              </p>
            </div>
            <div className="flex items-center gap-2 text-right sm:text-left self-end sm:self-auto">
              <span className="text-3xl font-serif font-bold text-[#7A1C30] dark:text-[#E2A9B5]">
                %{Math.round(progressPercent)}
              </span>
              <span className="text-xs text-[#78716C] font-medium">Tamamlandı</span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full bg-[#FAF8F5] dark:bg-neutral-800 h-2 rounded-full overflow-hidden border border-[#EDE7DE] dark:border-neutral-700">
            <div
              className="bg-[#7A1C30] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* STEP INDICATORS */}
          <div className="grid grid-cols-4 gap-2 mt-4 text-xs font-medium text-center">
            {[1, 2, 3, 4].map((step) => (
              <Link
                key={step}
                href={`/add-listing/${step}` as Route}
                className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  step === index
                    ? "bg-[#7A1C30] text-white font-semibold shadow-sm"
                    : step < index
                    ? "text-[#2E6B4A] dark:text-emerald-400 font-semibold"
                    : "text-[#A8A29E] dark:text-neutral-500"
                }`}
              >
                {step < index && <CheckCircleIcon className="w-3.5 h-3.5 text-[#2E6B4A]" />}
                <span className="hidden sm:inline">Adım</span> {step}
              </Link>
            ))}
          </div>
        </div>

        {/* STEP CONTENT WRAP */}
        <div className="listingSection__wrap bg-white dark:bg-[#1E1C1A] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EDE7DE] dark:border-neutral-800">
          {children}
        </div>

        {/* BOTTOM NAVIGATION BUTTONS */}
        {index < 4 && (
          <div className="flex items-center justify-between pt-4 border-t border-[#EDE7DE] dark:border-neutral-800">
            {index > 1 ? (
              <Link
                href={backHref}
                className="px-6 py-3 rounded-full border border-[#EDE7DE] dark:border-neutral-700 text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5] hover:bg-[#F2ECE1] transition-colors"
              >
                ← Geri Dön
              </Link>
            ) : (
              <div />
            )}

            <Link
              href={nextHref}
              className="px-8 py-3.5 rounded-full bg-[#7A1C30] hover:bg-[#601424] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#7A1C30]/20 transition-all"
            >
              {nextBtnText} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonLayout;
