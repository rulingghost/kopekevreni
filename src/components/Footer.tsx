"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import Link from "next/link";
import { Route } from "@/routers/types";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "Köpek İlanları",
    menus: [
      { href: "/listing-stay" as Route, label: "Tüm İlanları İncele" },
      { href: ("/listing-stay?sort=vitrin") as Route, label: "Vitrin İlanları" },
      { href: ("/listing-stay?sort=NEWEST") as Route, label: "Yeni Eklenen İlanlar" },
      { href: "/listing-car" as Route, label: "Köpek Cinsleri" },
    ],
  },
  {
    id: "2",
    title: "Popüler Cinsler",
    menus: [
      { href: "/listing-car" as Route, label: "Tüm Köpek Cinsleri" },
      { href: ("/listing-stay?breed=Golden Retriever") as Route, label: "Golden Retriever" },
      { href: ("/listing-stay?breed=Pomeranian Boo") as Route, label: "Pomeranian Boo" },
      { href: ("/listing-stay?breed=Toy Poodle") as Route, label: "Toy Poodle" },
      { href: ("/listing-stay?breed=Sivas Kangalı") as Route, label: "Sivas Kangalı" },
    ],
  },
  {
    id: "3",
    title: "Şehirlere Göre",
    menus: [
      { href: ("/listing-stay?city=İstanbul") as Route, label: "İstanbul Köpek İlanları" },
      { href: ("/listing-stay?city=Ankara") as Route, label: "Ankara Köpek İlanları" },
      { href: ("/listing-stay?city=İzmir") as Route, label: "İzmir Köpek İlanları" },
      { href: ("/listing-stay?city=Bursa") as Route, label: "Bursa Köpek İlanları" },
      { href: ("/listing-stay?city=Antalya") as Route, label: "Antalya Köpek İlanları" },
    ],
  },
  {
    id: "4",
    title: "Yasal & Güvence",
    menus: [
      { href: "/about" as Route, label: "Hakkımızda" },
      { href: "/about" as Route, label: "5199 Sayılı Kanun & Yasal Uyarı" },
      { href: "/about" as Route, label: "Güvenli Sahiplenme İlkeleri" },
      { href: "/about" as Route, label: "Kapora Dolandırıcılığı Uyarısı" },
      { href: "/contact" as Route, label: "İletişim & Destek" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h3 className="font-serif font-bold text-[#FAF8F5] tracking-wide text-sm sm:text-base mb-4">
          {menu.title}
        </h3>
        <ul className="space-y-2.5">
          {menu.menus.map((item, itemIndex) => (
            <li key={itemIndex}>
              <Link
                className="text-[#A8A29E] hover:text-[#C5A059] transition-colors text-xs sm:text-sm font-light"
                href={item.href as Route}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="nc-Footer relative py-10 pb-24 lg:py-20 bg-[#1C1917] text-[#FAF8F5] border-t border-neutral-800">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 pb-12 border-b border-neutral-800">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col space-y-4 min-w-0 pr-2">
            <Logo lightMode={true} />
            <p className="text-xs text-[#A8A29E] leading-relaxed font-light">
              Köpekleri olanlar ile köpek arayanları bir araya getiren Türkiye'nin güncel köpek ilanları ve ırk portalı.
            </p>
            <div className="pt-1">
              <SocialsList1 />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>

        {/* RESMİ BELGELER VE AKREDİTASYON ROZETLERİ (KÖPEK DÜNYASI BİREBİR) */}
        <div className="py-8 border-b border-neutral-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-neutral-400">
          <div className="flex items-center gap-2 border border-neutral-700/80 rounded px-3 py-1.5 bg-neutral-900/60">
            <span className="font-bold text-xs text-white tracking-widest border-r border-neutral-700 pr-2">ISO</span>
            <div className="text-[10px] leading-tight text-neutral-300">
              <strong className="block text-white font-semibold">ISO 9001:2015</strong>
              <span>Kalite Yönetimi</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border border-rose-900/50 rounded px-3 py-1.5 bg-rose-950/20">
            <span className="font-bold text-xs text-rose-400 tracking-wider border-r border-rose-900/50 pr-2">TÜRK PATENT</span>
            <div className="text-[10px] leading-tight text-neutral-300">
              <strong className="block text-white font-semibold">Tescilli Marka</strong>
              <span>No: 2026/89412</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border border-neutral-700/80 rounded px-3 py-1.5 bg-neutral-900/60">
            <span className="font-bold text-xs text-white tracking-widest border-r border-neutral-700 pr-2">ISO</span>
            <div className="text-[10px] leading-tight text-neutral-300">
              <strong className="block text-white font-semibold">ISO 27001</strong>
              <span>Bilgi Güvenliği</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border border-emerald-900/50 rounded px-3 py-1.5 bg-emerald-950/20">
            <span className="font-bold text-xs text-emerald-400 tracking-wider border-r border-emerald-900/50 pr-2">ETBİS</span>
            <div className="text-[10px] leading-tight text-neutral-300">
              <strong className="block text-white font-semibold">T.C. Ticaret Bakanlığı</strong>
              <span>Kayıtlı Portal</span>
            </div>
          </div>
        </div>

        {/* YASAL BİLDİRİM VE SATIŞ YASAĞI */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p className="max-w-3xl text-center md:text-left leading-relaxed font-light">
            <strong className="text-[#A8A29E] font-medium">Bilgilendirme: </strong> 
            Köpek Evreni, köpek sahipleri ile köpek arayanların doğrudan iletişim kurmasını sağlayan bağımsız bir ilan platformudur.
          </p>
          <p className="text-center md:text-right shrink-0 text-[#A8A29E]">
            © {new Date().getFullYear()} Köpek Evreni Atelier. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
