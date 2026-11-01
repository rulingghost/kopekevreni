"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PET_LISTINGS } from "@/data/mockPets";

const MobileFooterSticky = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const pet = MOCK_PET_LISTINGS.find((p) => p.id === id) || MOCK_PET_LISTINGS[0];

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2.5 px-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 z-40 shadow-xl">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div>
          <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Sahiplenme Türü
          </span>
          <span className="block text-sm font-black text-emerald-600 dark:text-emerald-400">
            %100 ÜCRETSİZ
          </span>
        </div>

        <a
          href={`https://wa.me/${pet.contact.whatsapp}?text=Merhaba,%20Köpek%20Evreni'ndeki%20"${encodeURIComponent(pet.title)}"%20ilanınız%20için%20yazıyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
        >
          <span>WhatsApp ile Ulaş</span>
        </a>
      </div>
    </div>
  );
};

export default MobileFooterSticky;
