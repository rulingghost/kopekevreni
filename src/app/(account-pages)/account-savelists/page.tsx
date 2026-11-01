"use client";

import { Tab } from "@headlessui/react";
import PetCard from "@/components/PetCard";
import BreedCard from "@/components/BreedCard";
import { MOCK_PET_LISTINGS } from "@/data/mockPets";
import { MOCK_BREEDS } from "@/data/mockBreeds";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import {
  HeartIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const AccountSavelists = () => {
  const [categories] = useState([
    { name: "Yayındaki İlanlarım (2)", key: "my_listings" },
    { name: "Favori Canlar (6)", key: "favorite_pets" },
    { name: "Kaydettiğim Irklar (4)", key: "saved_breeds" },
  ]);

  // Kullanıcının yayındaki ilanları
  const myListings = MOCK_PET_LISTINGS.slice(0, 2);
  // Favori olarak kaydettiği ilanlar
  const favoritePets = MOCK_PET_LISTINGS.slice(2, 8);
  // Takip ettiği ırklar
  const savedBreeds = MOCK_BREEDS.slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING & QUICK ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            İlanlarım ve Favorilerim
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Yayındaki aktif evcil hayvan ilanlarınızı yönetin ve beğendiğiniz canları takip edin.
          </p>
        </div>

        <Link
          href="/add-listing/1"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Ücretsiz Yeni İlan Ver
        </Link>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <Tab.Group>
        <Tab.List className="flex space-x-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <Tab key={item.key} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-shrink-0 block font-semibold px-5 py-2.5 text-sm sm:text-base rounded-full transition-all focus:outline-none ${
                    selected
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {item.name}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-8">
          {/* TAB 1: YAYINDAKİ İLANLARIM */}
          <Tab.Panel>
            <div className="space-y-4">
              {myListings.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        pet.featuredImage ||
                        pet.galleryImages?.[0] ||
                        (pet as any).gallery?.[0] ||
                        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
                      }
                      alt={pet.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                          {pet.listingType === "ADOPTION" ? "🏡 Yuva Arıyor" : "❤️ Eş Arıyor"}
                        </span>
                        <span className="text-xs text-neutral-400">
                          İlan No: #{pet.id.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                        {pet.name} - {pet.breed}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {pet.location.city} / {pet.location.district} • {pet.exactAgeText} • {pet.publishedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-700">
                    <Link
                      href={`/listing-stay-detail?id=${pet.id}`}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 transition-colors"
                    >
                      İlanı Gör
                    </Link>
                    <Link
                      href="/add-listing/1"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 transition-colors"
                    >
                      Düzenle
                    </Link>
                    <button
                      type="button"
                      onClick={() => alert("Tebrikler! İlanınız 'Sıcak Yuvasına Kavuştu' olarak işaretlendi.")}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                    >
                      ✓ Yuvalandı Olarak İşaretle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* TAB 2: FAVORİ CANLAR */}
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {favoritePets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </Tab.Panel>

          {/* TAB 3: KAYITLI IRKLAR */}
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedBreeds.map((breed) => (
                <BreedCard key={breed.id} breed={breed} />
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AccountSavelists;
