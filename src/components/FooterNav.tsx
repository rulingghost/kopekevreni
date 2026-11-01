"use client";

import {
  HeartIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { PathName, Route } from "@/routers/types";
import MenuBar from "@/shared/MenuBar";
import isInViewport from "@/utils/isInViewport";
import Link from "next/link";
import { usePathname } from "next/navigation";

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link?: PathName | Route;
  icon: any;
  isSpecial?: boolean;
}

const NAV: NavItem[] = [
  {
    name: "Keşfet",
    link: "/",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "İlanlar",
    link: "/listing-stay" as Route,
    icon: HeartIcon,
  },
  {
    name: "İlan Ver",
    link: "/add-listing/1" as Route,
    icon: PlusCircleIcon,
    isSpecial: true,
  },
  {
    name: "Cinsler",
    link: "/listing-car" as Route,
    icon: BookOpenIcon,
  },
  {
    name: "Menü",
    icon: MenuBar,
  },
];

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = () => {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(showHideHeaderMenu);
    }
  };

  const showHideHeaderMenu = () => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }
      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  const renderItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.link;

    if (item.isSpecial && item.link) {
      return (
        <Link
          key={index}
          href={item.link as PathName}
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
            <PlusCircleIcon className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-1">
            {item.name}
          </span>
        </Link>
      );
    }

    return item.link ? (
      <Link
        key={index}
        href={item.link as PathName}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? "text-amber-500 dark:text-amber-400 font-medium" : ""
        }`}
      >
        <item.icon className={`w-5 h-5 ${isActive ? "text-amber-500 dark:text-amber-400" : ""}`} />
        <span
          className={`text-[10px] leading-none mt-1 ${
            isActive ? "text-amber-500 dark:text-amber-400" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    ) : (
      <div
        key={index}
        className="flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90"
      >
        <item.icon iconClassName="w-5 h-5" className="" />
        <span className="text-[10px] leading-none mt-1">{item.name}</span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav block md:!hidden py-1.5 px-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-200 dark:border-neutral-800 
      transition-transform duration-300 ease-in-out shadow-lg"
    >
      <div className="w-full max-w-lg flex justify-around items-center mx-auto text-sm text-center">
        {NAV.map(renderItem)}
      </div>
    </div>
  );
};

export default FooterNav;
