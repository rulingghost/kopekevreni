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
      <div className="px-2.5 sm:px-6 lg:px-8 xl:px-10 max-w-[1720px] mx-auto h-14 sm:h-20 relative flex justify-between items-center gap-1.5">
        {/* Sol Alan: Logo & Masaüstü Navigasyon */}
        <div className="flex justify-start items-center space-x-3 sm:space-x-6 lg:space-x-8 min-w-0">
          <Logo className="self-center" />
          <div className="hidden lg:flex items-center">
            <Navigation />
          </div>
        </div>

        {/* Sağ Alan: Arama, Kullanıcı Girişi & "+ YENİ İLAN VER" */}
        <div className="flex items-center space-x-1 sm:space-x-2.5 text-[#1C1917] dark:text-[#FAF8F5] shrink-0">
          <div className="hidden sm:flex items-center">
            <SearchDropdown className="flex items-center" />
          </div>

          {/* Giriş Yap veya Aktif Kullanıcı */}
          {user ? (
            <div className="flex items-center gap-1">
              <Link
                href={"/ilanlarim" as Route}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[10px] sm:text-xs font-bold text-emerald-800 dark:text-emerald-200"
                title="Profilim ve İlanlarım"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover ring-1 ring-emerald-500 shrink-0"
                />
                <span className="hidden md:inline truncate max-w-[95px]">
                  {user.name}
                </span>
                <span className="px-1 sm:px-1.5 py-0.2 rounded-full bg-[#dc5075] text-white text-[9px] sm:text-[10px]">
                  {myListings.length}
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="p-1 sm:p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-950/50 text-rose-600 transition-colors"
                title="Çıkış Yap"
              >
                <ArrowRightOnRectangleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <Link
              href={"/login" as Route}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-neutral-300 dark:border-neutral-700 hover:border-[#dc5075] hover:text-[#dc5075] transition-colors bg-white dark:bg-neutral-800"
              title="Kullanıcı Girişi"
            >
              <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Giriş Yap</span>
            </Link>
          )}

          <div className="scale-75 sm:scale-100 -mx-1 sm:mx-0">
            <SwitchDarkMode />
          </div>

          {/* KÖPEK DÜNYASI TARZI BELİRGİN VE FERAH YENİ İLAN VER BUTONU */}
          <Link
            href={"/add-listing/1" as Route}
            className="shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold bg-[#dc5075] hover:bg-[#c93f64] text-white shadow-md shadow-[#dc5075]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="tracking-wide hidden xs:inline sm:inline">+ YENİ İLAN VER</span>
            <span className="tracking-wide xs:hidden sm:hidden">İLAN VER</span>
          </Link>

          <div className="flex lg:hidden items-center">
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
