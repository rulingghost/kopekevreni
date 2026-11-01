"use client";

import React, { FC } from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import Link from "next/link";
import { Route } from "@/routers/types";
import { useAuth } from "@/context/AuthContext";
import {
  UserIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  const { user, logout, myListings } = useAuth();

  return (
    <div
      className={`nc-MainNav1 relative z-10 bg-[#FAF8F5]/95 dark:bg-[#151312]/95 backdrop-blur-md border-b border-[#EDE7DE] dark:border-neutral-800 transition-colors ${className}`}
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 max-w-[1720px] mx-auto h-20 relative flex justify-between items-center">
        {/* Sol Alan: Yeni Logo & Masaüstü Navigasyon */}
        <div className="flex justify-start items-center space-x-6 sm:space-x-8">
          <Logo className="self-center" />
          <div className="hidden lg:flex items-center">
            <Navigation />
          </div>
        </div>

        {/* Sağ Alan: Arama, Kullanıcı Girişi & "+ YENİ İLAN VER" */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 text-[#1C1917] dark:text-[#FAF8F5] shrink-0">
          <div className="hidden sm:flex items-center">
            <SearchDropdown className="flex items-center" />
          </div>

          {/* Giriş Yap veya Aktif Kullanıcı */}
          {user ? (
            <div className="flex items-center gap-1">
              <Link
                href={"/ilanlarim" as Route}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-200"
                title="Profilim ve İlanlarım"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500 shrink-0"
                />
                <span className="hidden md:inline truncate max-w-[95px]">
                  {user.name}
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#dc5075] text-white text-[10px]">
                  {myListings.length}
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-950/50 text-rose-600 transition-colors"
                title="Çıkış Yap"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href={"/login" as Route}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-neutral-300 dark:border-neutral-700 hover:border-[#dc5075] hover:text-[#dc5075] transition-colors bg-white dark:bg-neutral-800"
              title="Kullanıcı Girişi"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Giriş Yap</span>
            </Link>
          )}

          <SwitchDarkMode />

          {/* KÖPEK DÜNYASI TARZI BELİRGİN VE FERAH YENİ İLAN VER BUTONU */}
          <Link
            href={"/add-listing/1" as Route}
            className="shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#dc5075] hover:bg-[#c93f64] text-white shadow-md shadow-[#dc5075]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircleIcon className="w-4 h-4 shrink-0" />
            <span className="tracking-wide">+ YENİ İLAN VER</span>
          </Link>

          <div className="flex lg:hidden items-center ml-1">
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
