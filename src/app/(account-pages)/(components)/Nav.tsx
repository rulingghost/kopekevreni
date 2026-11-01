"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  UserCircleIcon,
  HeartIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

export const Nav = () => {
  const pathname = usePathname();

  const listNav: { route: Route; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      route: "/account" as Route,
      label: "Profil Bilgilerim",
      icon: UserCircleIcon,
    },
    {
      route: "/account-savelists" as Route,
      label: "İlanlarım ve Favorilerim",
      icon: HeartIcon,
    },
    {
      route: "/account-password" as Route,
      label: "Şifre ve Güvenlik",
      icon: KeyIcon,
    },
  ];

  return (
    <div className="container">
      <div className="flex space-x-6 md:space-x-10 overflow-x-auto hiddenScrollbar">
        {listNav.map((item) => {
          const isActive = pathname === item.route;
          const Icon = item.icon;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`flex items-center gap-2 py-5 md:py-6 border-b-2 flex-shrink-0 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
