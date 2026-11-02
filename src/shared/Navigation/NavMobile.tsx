"use client";

import React from "react";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import { Disclosure } from "@headlessui/react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "@/data/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import Link from "next/link";
import { Route } from "@/routers/types";
import { useAuth } from "@/context/AuthContext";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {
  const { user, loginAsDemo, logout } = useAuth();

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-3 pb-2 pt-1 max-h-64 overflow-y-auto custom-scrollbar space-y-1">
        {item.children?.map((i, index) => (
          <li key={i.href + index}>
            <Link
              href={(i.href || "/") as Route}
              onClick={onClickClose}
              className="flex items-center gap-2.5 px-3 py-1.5 text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {i.image && (
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-[#dc5075] shrink-0"
                />
              )}
              <span className="truncate">{i.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <div className="flex items-center justify-between w-full px-3 py-2 font-bold text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl">
          <Link
            href={(item.href || "/") as Route}
            onClick={onClickClose}
            className="flex-1 py-1"
          >
            {item.name}
          </Link>
          {item.children && (
            <Disclosure.Button
              as="button"
              className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800"
            >
              <ChevronDownIcon
                className="h-4 w-4 text-neutral-500"
                aria-hidden="true"
              />
            </Disclosure.Button>
          )}
        </div>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-800 bg-[#FAF8F5] dark:bg-[#151312] divide-y divide-[#EDE7DE] dark:divide-neutral-800">
      <div className="py-4 px-4 relative">
        <div className="flex items-center justify-between pr-8">
          <Logo />
          <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-[11px] leading-snug">
          Köpek sahipleri ile köpek arayanların buluştuğu Türkiye&apos;nin güncel köpek ilanları ve 48 ırk portalı.
        </p>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>

      {/* KULLANICI DURUMU / HIZLI ÖRNEK GİRİŞ */}
      <div className="p-3.5 bg-white dark:bg-[#1E1C1A]">
        {user ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#dc5075] shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                  {user.name}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {user.badge}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                onClickClose?.();
              }}
              className="px-2.5 py-1 rounded-lg border border-rose-300 text-rose-600 text-[10px] font-bold shrink-0"
            >
              Çıkış
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                loginAsDemo();
                onClickClose?.();
              }}
              className="w-full py-2 px-3 rounded-xl bg-emerald-600 text-white text-[11px] font-bold text-center shadow-xs whitespace-nowrap"
            >
              🚀 Örnek Kullanıcı İle Giriş Yap
            </button>
            <Link
              href={"/login" as Route}
              onClick={onClickClose}
              className="block w-full py-1.5 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-center text-[11px] font-bold text-neutral-700 dark:text-neutral-200 whitespace-nowrap"
            >
              E-Posta ve Şifre İle Giriş Yap
            </Link>
          </div>
        )}
      </div>

      <ul className="flex flex-col py-3 px-2 space-y-0.5">
        {data.map(_renderItem)}
      </ul>

      <div className="p-4">
        <Link
          href={"/add-listing/1" as Route}
          onClick={onClickClose}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#dc5075] hover:bg-[#c93f64] text-white shadow-sm text-center"
        >
          <span>🐾 + YENİ İLAN VER</span>
        </Link>
      </div>
    </div>
  );
};

export default NavMobile;
