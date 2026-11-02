"use client";

import React, { FC, useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Route } from "@/routers/types";
import { ALL_BREEDS, VITRIN_LISTINGS } from "@/data/kopekDunyasiData";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface Props {
  className?: string;
}

const QUICK_BREEDS = [
  "Poodle - Toy",
  "Maltipoo",
  "Pomeranian Boo",
  "Golden Retriever",
  "Cane Corso",
  "Kangal",
];

const SearchDropdown: FC<Props> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const matchedBreeds = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return ALL_BREEDS.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const matchedListings = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return VITRIN_LISTINGS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.breed.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    setIsOpen(false);
    if (trimmed) {
      router.push(`/listing-stay?q=${encodeURIComponent(trimmed)}` as Route);
    } else {
      router.push("/listing-stay" as Route);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* ARAMA TETİKLEYİCİ BUTON (Hem Mobil Hem Masaüstü) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 md:w-11 md:h-11 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center transition-colors"
        title="İlan veya Köpek Cinsi Ara"
      >
        <MagnifyingGlassIcon className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* AÇILIR ARAMA PANELİ / MODAL */}
      {isOpen && (
        <>
          {/* Arka Plan Karartma */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Arama Kutusu */}
          <div className="fixed inset-x-3 top-16 md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-2 md:w-[420px] z-50 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-2xl p-3.5 space-y-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="relative flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Irk, şehir veya ilan ara..."
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#dc5075]"
                />
                <MagnifyingGlassIcon className="w-4 h-4 text-[#dc5075] absolute left-3 top-1/2 -translate-y-1/2" />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#dc5075] hover:bg-[#c23d60] text-white text-xs font-extrabold whitespace-nowrap shrink-0 shadow-xs"
              >
                Ara
              </button>
            </form>

            {/* CANLI ARAMA SONUÇLARI VEYA HIZLI CİNSLER */}
            {query.trim() ? (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-0.5">
                {matchedBreeds.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-1">
                      Eşleşen Köpek Cinsleri
                    </div>
                    {matchedBreeds.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/listing-stay?breed=${encodeURIComponent(b.name)}` as Route}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={`/images/breeds/${b.slug}.png`}
                            alt={b.name}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#dc5075] shrink-0"
                          />
                          <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                            {b.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-[#dc5075]/10 text-[#dc5075] whitespace-nowrap shrink-0">
                          {b.count} İlan →
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {matchedListings.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-1">
                      Eşleşen İlanlar
                    </div>
                    {matchedListings.map((item) => (
                      <Link
                        key={item.id}
                        href={`/listing-stay-detail?id=${item.id}` as Route}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-neutral-500 truncate">
                            {item.breed} • 📍 {item.city}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {matchedBreeds.length === 0 && matchedListings.length === 0 && (
                  <div className="py-4 text-center text-xs text-neutral-500">
                    &ldquo;{query}&rdquo; için sonuç bulunamadı. Tüm ilanlarda aramak için{" "}
                    <strong>Ara</strong> butonuna basın.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-1">
                  Popüler Köpek Cinsleri
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_BREEDS.map((name) => (
                    <Link
                      key={name}
                      href={`/listing-stay?breed=${encodeURIComponent(name)}` as Route}
                      onClick={() => setIsOpen(false)}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-[#dc5075] hover:text-white text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      🐾 {name}
                    </Link>
                  ))}
                </div>
                <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <Link
                    href={"/listing-stay" as Route}
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-[#dc5075] flex items-center gap-1 py-1"
                  >
                    <span>Tüm İlanları İncele</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={"/listing-car" as Route}
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-neutral-600 dark:text-neutral-400 py-1"
                  >
                    Tüm Cinsler (48)
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchDropdown;
