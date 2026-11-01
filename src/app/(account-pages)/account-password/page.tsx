"use client";

import React, { useState } from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const AccountPass = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-xl">
      {/* HEADING */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Şifre ve Hesap Güvenliği
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Hesabınızın güvenliği için güçlü ve tahmin edilmesi zor bir şifre belirleyin.
        </p>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>Mevcut Şifreniz</Label>
          <Input
            type="password"
            className="mt-1.5"
            placeholder="••••••••"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
          />
        </div>

        <div>
          <Label>Yeni Şifre</Label>
          <Input
            type="password"
            className="mt-1.5"
            placeholder="••••••••"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <span className="block mt-1 text-xs text-neutral-400">
            En az 8 karakter, büyük harf ve bir rakam içermelidir.
          </span>
        </div>

        <div>
          <Label>Yeni Şifreyi Tekrar Girin</Label>
          <Input
            type="password"
            className="mt-1.5"
            placeholder="••••••••"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>

        <div className="pt-2 flex items-center gap-4">
          <ButtonPrimary type="submit" className="!px-8 !py-3">
            Şifreyi Güncelle
          </ButtonPrimary>
          {success && (
            <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
              <CheckBadgeIcon className="w-5 h-5" />
              Şifreniz başarıyla güncellendi!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountPass;
