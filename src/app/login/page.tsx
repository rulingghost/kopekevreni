"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Route } from "@/routers/types";
import { useAuth, SAMPLE_DEMO_USER } from "@/context/AuthContext";
import {
  UserCircleIcon,
  LockClosedIcon,
  EnvelopeIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const PageLogin: FC = () => {
  const router = useRouter();
  const { user, login, loginAsDemo, logout } = useAuth();

  const [email, setEmail] = useState(SAMPLE_DEMO_USER.email);
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Lütfen e-posta ve şifre alanlarını doldurun.");
      return;
    }
    const ok = login(email, password);
    if (ok) {
      router.push("/ilanlarim" as Route);
    } else {
      setError("Giriş bilgileri hatalı.");
    }
  };

  const handleQuickDemoLogin = () => {
    loginAsDemo();
    router.push("/ilanlarim" as Route);
  };

  return (
    <div className="min-h-[82vh] py-10 lg:py-16 bg-[#FAF8F5] dark:bg-[#151312] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1E1C1A] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
        {/* BAŞLIK */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#dc5075]/10 text-[#dc5075] flex items-center justify-center mx-auto">
            <UserCircleIcon className="w-9 h-9" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            Kullanıcı Girişi
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            İlanlarınızı yönetmek ve yeni ilan vermek için giriş yapın.
          </p>
        </div>

        {/* ZATEN GİRİŞ YAPILMIŞSA */}
        {user ? (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-emerald-500"
            />
            <div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center justify-center gap-1">
                <span>{user.name}</span>
                <CheckBadgeIcon className="w-5 h-5 text-blue-500" />
              </h3>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={"/ilanlarim" as Route}
                className="w-full py-2.5 px-4 rounded-xl bg-[#dc5075] hover:bg-[#c23d60] text-white text-xs font-bold transition-all"
              >
                📋 İlanlarım Sayfasına Git
              </Link>
              <button
                type="button"
                onClick={logout}
                className="w-full py-2 px-4 rounded-xl border border-rose-300 text-rose-600 text-xs font-bold hover:bg-rose-50 transition-all"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ÖRNEK TEST KULLANICISI KUTUSU */}
            <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 dark:text-amber-300">
                  <SparklesIcon className="w-4 h-4 text-[#dc5075]" />
                  <span>Örnek Test Kullanıcısı (Hazır Giriş)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  Demo Hesap
                </span>
              </div>

              <div className="text-xs space-y-1 bg-white/80 dark:bg-neutral-900/70 p-2.5 rounded-xl border border-amber-200/60 dark:border-neutral-800 font-mono text-neutral-700 dark:text-neutral-300">
                <div>
                  <strong>E-posta:</strong> {SAMPLE_DEMO_USER.email}
                </div>
                <div>
                  <strong>Şifre:</strong> 123456
                </div>
                <div>
                  <strong>Kullanıcı:</strong> {SAMPLE_DEMO_USER.name} ({SAMPLE_DEMO_USER.city}/{SAMPLE_DEMO_USER.district})
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>🚀 Örnek Kullanıcı İle Tek Tıkla Giriş Yap</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* GİRİŞ FORMU */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  E-Posta Adresi
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@kopekevreni.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#dc5075]"
                  />
                  <EnvelopeIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#dc5075]"
                  />
                  <LockClosedIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-[#dc5075] hover:bg-[#c23d60] text-white font-bold text-sm shadow-md shadow-[#dc5075]/20 transition-all"
              >
                Giriş Yap
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PageLogin;
