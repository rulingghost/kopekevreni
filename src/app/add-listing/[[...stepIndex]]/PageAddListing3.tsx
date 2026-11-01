"use client";

import React, { FC, useState } from "react";
import Textarea from "@/shared/Textarea";
import FormItem from "../FormItem";
import Image from "next/image";
import {
  PhotoIcon,
  TrashIcon,
  SparklesIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export interface PageAddListing3Props {}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  const [description, setDescription] = useState(
    "1.5 yaşındaki sevgi dolu oğlumuz Paşa'ya ailevi sebepler ve yurt dışı taşınma nedeniyle ömürlük, şefkatli bir yuva arıyoruz. Temel ve ileri itaat eğitimleri tamdır; 'otur', 'pati ver', 'bekle', 'hayır' komutlarını eksiksiz uygular. Ev içi tuvalet eğitimi oturmuştur. Çocuklarla ve diğer evcil hayvanlarla arası son derece iyidir, asla saldırganlık huyu yoktur. Aşı karnesi ve mikroçip kayıt belgesi ile birlikte teslim edilecektir."
  );

  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
  ]);

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddSampleImage = () => {
    if (images.length < 5) {
      setImages((prev) => [
        ...prev,
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
      ]);
    }
  };

  return (
    <div className="space-y-8">
      {/* FOTOĞRAF YÜKLEME ALANI */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Fotoğraf Galerisi (En az 1, en fazla 5 fotoğraf)
          </h3>
          <span className="text-xs text-neutral-500 font-medium">
            {images.length} / 5 Fotoğraf
          </span>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
          Dostunuzun doğal ışıkta çekilmiş, yüzü ve vücudu net görünen fotoğrafları sahiplenilme hızını 4 kat artırır.
        </p>

        {/* DRAG & DROP ZONE */}
        <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-2xl p-6 sm:p-8 text-center bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100/50 dark:hover:bg-neutral-800 transition-colors">
          <PhotoIcon className="w-12 h-12 text-primary-500 mx-auto mb-3" />
          <h4 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
            Fotoğrafları buraya sürükleyin veya cihazınızdan seçin
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-4">
            PNG, JPG veya WEBP formatında (Maksimum 5MB / görsel)
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleAddSampleImage}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 transition-colors shadow-sm"
            >
              + Örnek Fotoğraf Ekle
            </button>
            <label className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors cursor-pointer shadow-sm">
              Dosya Seç
              <input type="file" multiple accept="image/*" className="hidden" />
            </label>
          </div>
        </div>

        {/* FOTOĞRAF ÖNİZLEME LİSTESİ */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden aspect-square border border-neutral-200 dark:border-neutral-700 group shadow-sm"
              >
                <img
                  src={imgUrl}
                  alt={`Yüklenen görsel ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-primary-600 text-white shadow-sm">
                    Kapak
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  title="Fotoğrafı Kaldır"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      {/* İLAN AÇIKLAMASI */}
      <div>
        <FormItem
          label="Dostunuzun Hikayesi ve Detaylı Açıklaması"
          desc="Karakteri, günlük rutini, sevdiği oyunlar, beslenme alışkanlığı ve yeni ailesinden beklentilerinizi samimiyetle anlatın."
        >
          <Textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
          />
        </FormItem>

        <div className="mt-3 p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs flex items-start gap-2.5">
          <InformationCircleIcon className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
          <p>
            <strong>İpucu:</strong> Dostunuzun çocuklarla veya kedilerle anlaşıp anlaşmadığı, yalnız kalabilme süresi ve özel bir mama ihtiyacı olup olmadığını belirtmeniz en uygun ailenin hızlıca bulunmasına yardımcı olur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageAddListing3;
