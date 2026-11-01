"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { useAuth, SAMPLE_DEMO_USER } from "@/context/AuthContext";
import {
  LockClosedIcon,
  PlusCircleIcon,
  TrashIcon,
  EyeIcon,
  MapPinIcon,
  CheckBadgeIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function IlanlarimPage() {
  const { user, isLoaded, myListings, login, loginAsDemo, logout, removeMyListing } =
    useAuth();

  const [email, setEmail] = useState(SAMPLE_DEMO_USER.email);
  const [password, setPassword] = useState("123456");

  if (!isLoaded) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-sm text-neutral-500">
        Yükleniyor...
      </div>
    );
  }

  // KULLANICI GİRİŞ YAPMAMIŞSA -> GİRİŞ İSTE (ÖRNEK KULLANICI İLE HEMEN GİRİŞ DAHİL)
  if (!user) {
    return (
      <div className="min-h-[82vh] py-10 lg:py-16 bg-[#FAF8F5] dark:bg-[#151312] flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-[#dc5075] flex items-center justify-center mx-auto">
              <LockClosedIcon className="w-8 h-8" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[#dc5075] text-[11px] font-bold uppercase tracking-wider">
              Üye Girişi Gerekli
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              İlanlarım Sayfası İçin Giriş Yapın
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              Kendi ilanlarınızı görüntülemek, düzenlemek veya yeni ilan eklemek için lütfen kullanıcı girişi yapınız.
            </p>
          </div>

          {/* ÖRNEK KULLANICI BİLGİLERİ VE TEK TIKLA GİRİŞ */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 dark:text-amber-300">
                <SparklesIcon className="w-4 h-4 text-[#dc5075]" />
                <span>Denemek İçin Örnek Kullanıcı Bilgileri</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                Hazır Hesap
              </span>
            </div>

            <div className="text-xs space-y-1 bg-white dark:bg-neutral-900 p-3 rounded-xl border border-amber-200/60 dark:border-neutral-800 font-mono text-neutral-700 dark:text-neutral-300">
              <div>
                <strong>E-posta:</strong> {SAMPLE_DEMO_USER.email}
              </div>
              <div>
                <strong>Şifre:</strong> 123456
              </div>
              <div>
                <strong>Üye Adı:</strong> {SAMPLE_DEMO_USER.name} (3 Aktif İlan)
              </div>
            </div>

            <button
              type="button"
              onClick={loginAsDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              🚀 Örnek Kullanıcı İle Hemen Giriş Yap ve İlanlarımı Gör
            </button>
          </div>

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
              Giriş Yap ve İlanlarımı Aç
            </button>
          </form>
        </div>
      </div>
    );
  }

  // KULLANICI GİRİŞ YAPMIŞSA -> İLANLARIM PANELİ
  return (
    <div className="min-h-screen py-4 sm:py-8 lg:py-12 bg-[#FAF8F5] dark:bg-[#151312]">
      <div className="max-w-[1720px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 space-y-5 sm:space-y-8">
        {/* KULLANICI PROFİL VE ÖZET BANTI */}
        <div className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-[#dc5075] shrink-0"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="font-serif text-base sm:text-2xl font-bold text-neutral-900 dark:text-white truncate">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] sm:text-xs font-bold">
                  <CheckBadgeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{user.badge}</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 sm:mt-1 truncate">
                {user.email} • 📍 {user.city} / {user.district} Merkez
              </p>
              <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5">
                Üyelik Tarihi: {user.memberSince} • Toplam{" "}
                <strong className="text-[#dc5075]">{myListings.length} Aktif İlan</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-rose-500 hover:text-rose-600 text-[11px] sm:text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-all"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* İLANLARIM LİSTESİ */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white">
              📋 Yayındaki İlanlarım ({myListings.length})
            </h2>
          </div>

          {myListings.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[11px] font-bold bg-emerald-600 text-white shadow-sm">
                        Aktif İlan
                      </span>
                      <span className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[11px] font-bold bg-black/60 text-white flex items-center gap-0.5 sm:gap-1">
                        <EyeIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        <span>{item.viewsCount}</span>
                      </span>
                    </div>

                    <div className="p-2.5 sm:p-5 space-y-1.5 sm:space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs gap-1">
                        <span className="inline-flex items-center gap-1 sm:gap-2 font-bold text-[#dc5075] min-w-0">
                          <img
                            src={`/images/breeds/${item.breedSlug}.png`}
                            alt={item.breed}
                            className="w-5 h-5 sm:w-7 sm:h-7 rounded-full object-cover ring-1 ring-[#dc5075] shrink-0"
                          />
                          <span className="truncate">{item.breed}</span>
                        </span>
                        <span className="text-neutral-500 font-medium text-[9px] sm:text-xs shrink-0">
                          {item.exactAgeText}
                        </span>
                      </div>

                      <h3 className="font-bold text-xs sm:text-base text-neutral-900 dark:text-white line-clamp-1 sm:line-clamp-2">
                        {item.title}
                      </h3>

                      {/* İLAN ALTINDA HARİTA KONUM BİLGİSİ */}
                      <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-700 text-[9px] sm:text-xs flex items-center gap-1 sm:gap-2 text-neutral-700 dark:text-neutral-300 truncate">
                        <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#dc5075] shrink-0" />
                        <span className="truncate">
                          <strong>
                            {item.location.city} / {item.location.district}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-2.5 pb-2.5 pt-2 sm:px-5 sm:pb-5 sm:pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-1.5 sm:gap-2">
                    <Link
                      href={`/listing-stay-detail?id=${item.id}` as Route}
                      className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] sm:text-xs font-bold text-center hover:opacity-90 transition-opacity truncate"
                    >
                      Görüntüle
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeMyListing(item.id)}
                      className="py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[10px] sm:text-xs font-bold flex items-center gap-0.5 sm:gap-1 transition-colors shrink-0"
                    >
                      <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Kaldır</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-12 text-center space-y-3">
              <p className="text-sm text-neutral-500">Henüz aktif bir ilanınız bulunmuyor.</p>
              <Link
                href={"/add-listing/1" as Route}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#dc5075] text-white text-xs font-bold"
              >
                + İlk İlanınızı Verin
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

