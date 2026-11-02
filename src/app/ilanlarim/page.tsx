"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { useAuth, SAMPLE_DEMO_USER } from "@/context/AuthContext";
import {
  LockClosedIcon,
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

  if (!user) {
    return (
      <div className="min-h-[82vh] py-6 md:py-16 bg-[#FAF8F5] dark:bg-[#151312] flex items-center justify-center px-3 md:px-4">
        <div className="w-full max-w-lg bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-8 space-y-5">
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-[#dc5075] flex items-center justify-center mx-auto">
              <LockClosedIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[#dc5075] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              Üye Girişi Gerekli
            </span>
            <h1 className="font-serif text-xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              İlanlarım Sayfası İçin Giriş Yapın
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              Kendi ilanlarınızı görüntülemek, düzenlemek veya yeni ilan eklemek için lütfen kullanıcı girişi yapınız.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 dark:text-amber-300">
                <SparklesIcon className="w-4 h-4 text-[#dc5075]" />
                <span>Örnek Kullanıcı Bilgileri</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                Hazır Hesap
              </span>
            </div>

            <div className="text-xs space-y-1 bg-white dark:bg-neutral-900 p-2.5 rounded-xl border border-amber-200/60 dark:border-neutral-800 font-mono text-neutral-700 dark:text-neutral-300">
              <div className="truncate">
                <strong>E-posta:</strong> {SAMPLE_DEMO_USER.email}
              </div>
              <div>
                <strong>Şifre:</strong> 123456
              </div>
              <div className="truncate">
                <strong>Üye:</strong> {SAMPLE_DEMO_USER.name} (3 İlan)
              </div>
            </div>

            <button
              type="button"
              onClick={loginAsDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              🚀 Örnek Kullanıcı İle Hemen Giriş Yap
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, password);
            }}
            className="space-y-3.5 pt-2 border-t border-neutral-100 dark:border-neutral-800"
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
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#dc5075]"
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
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#dc5075]"
                />
                <LockClosedIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-[#dc5075] hover:bg-[#c23d60] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              Giriş Yap ve İlanlarımı Aç
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 md:py-12 bg-[#FAF8F5] dark:bg-[#151312]">
      {/* ===================================================================== */}
      {/* 1. SIFIRDAN YAZILMIŞ MOBİL İLANLARIM SAYFASI (< 768px)                 */}
      {/* ===================================================================== */}
      <div className="block md:hidden px-3 pt-3 space-y-3.5">
        {/* Mobil Profil Kartı */}
        <div className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3.5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#dc5075] shrink-0"
              />
              <div className="min-w-0">
                <h1 className="font-serif text-base font-extrabold text-neutral-900 dark:text-white truncate">
                  {user.name}
                </h1>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  📍 {user.city} / {user.district} • {myListings.length} İlan
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 text-xs font-bold shrink-0"
            >
              Çıkış
            </button>
          </div>
        </div>

        {/* Mobil Yayındaki İlanlarım Başlık */}
        <h2 className="font-serif text-base font-extrabold text-neutral-900 dark:text-white px-0.5">
          📋 Yayındaki İlanlarım ({myListings.length})
        </h2>

        {/* Mobil İlanlarım Grid (2 Sütunlu Çakışmasız Kartlar) */}
        {myListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {myListings.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-600 text-white">
                    Aktif
                  </span>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2 py-1.5 pt-4">
                    <span className="block text-[10px] font-bold text-white truncate">
                      📍 {item.location.city}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 flex flex-col gap-1 flex-1 justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <img
                        src={`/images/breeds/${item.breedSlug}.png`}
                        alt={item.breed}
                        className="w-4 h-4 rounded-full object-cover ring-1 ring-[#dc5075] shrink-0"
                      />
                      <span className="text-[10px] font-extrabold text-[#dc5075] truncate">
                        {item.breed}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <div className="text-[10px] text-neutral-500 truncate">
                      {item.exactAgeText} • {item.viewsCount} Görüntülenme
                    </div>
                  </div>

                  <div className="pt-1.5 flex items-center gap-1.5">
                    <Link
                      href={`/listing-stay-detail?id=${item.id}` as Route}
                      className="flex-1 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-extrabold text-center"
                    >
                      İncele
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeMyListing(item.id)}
                      className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-rose-600 shrink-0"
                      title="İlanı Kaldır"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center space-y-2.5">
            <p className="text-xs text-neutral-500">Henüz aktif bir ilanınız bulunmuyor.</p>
            <Link
              href={"/add-listing/1" as Route}
              className="inline-block px-4 py-2 rounded-xl bg-[#dc5075] text-white text-xs font-bold"
            >
              + İlk İlanınızı Verin
            </Link>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 2. MASAÜSTÜ İLANLARIM SAYFASI (>= 768px - BİREBİR KORUNAN TASARIM)     */}
      {/* ===================================================================== */}
      <div className="hidden md:block max-w-[1720px] mx-auto px-6 lg:px-8 xl:px-10 space-y-8">
        <div className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-[#dc5075]"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  <CheckBadgeIcon className="w-4 h-4" />
                  <span>{user.badge}</span>
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {user.email} • {user.phone} • 📍 {user.city} / {user.district} Merkez
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Üyelik Tarihi: {user.memberSince} • Toplam{" "}
                <strong className="text-[#dc5075]">{myListings.length} Aktif İlan</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-rose-500 hover:text-rose-600 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-all"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
              📋 Yayındaki İlanlarım ({myListings.length})
            </h2>
          </div>

          {myListings.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-sm">
                        ✓ Doğrulanmış İlan (Aktif)
                      </span>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white flex items-center gap-1">
                        <EyeIcon className="w-3.5 h-3.5" />
                        <span>{item.viewsCount}</span>
                      </span>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-2 font-bold text-[#dc5075]">
                          <img
                            src={`/images/breeds/${item.breedSlug}.png`}
                            alt={item.breed}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-[#dc5075]"
                          />
                          <span>{item.breed}</span>
                        </span>
                        <span className="text-neutral-500 font-medium">
                          {item.exactAgeText} • {item.gender === "MALE" ? "Erkek ♂" : "Dişi ♀"}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-neutral-900 dark:text-white line-clamp-2">
                        {item.title}
                      </h3>

                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-700 text-xs flex items-center justify-between text-neutral-700 dark:text-neutral-300">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <MapPinIcon className="w-4 h-4 text-[#dc5075]" />
                          <span>
                            Harita Konumu:{" "}
                            <strong>
                              {item.location.city} / {item.location.district} Merkez
                            </strong>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                    <Link
                      href={`/listing-stay-detail?id=${item.id}` as Route}
                      className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold text-center hover:opacity-90 transition-opacity"
                    >
                      İlanı Görüntüle
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeMyListing(item.id)}
                      className="py-2 px-3 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Kaldır</span>
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
