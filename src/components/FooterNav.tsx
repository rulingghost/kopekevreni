"use client";

import {
  HomeIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  SparklesIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { PathName, Route } from "@/routers/types";
import isInViewport from "@/utils/isInViewport";
import Link from "next/link";
import { usePathname } from "next/navigation";

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link: PathName | Route;
  icon: any;
  isSpecial?: boolean;
}

const NAV: NavItem[] = [
  {
    name: "Ana Sayfa",
    link: "/" as Route,
    icon: HomeIcon,
  },
  {
    name: "İlanlar",
    link: "/listing-stay" as Route,
    icon: Squares2X2Icon,
  },
  {
    name: "İlan Ver",
    link: "/add-listing/1" as Route,
    icon: PlusCircleIcon,
    isSpecial: true,
  },
  {
    name: "48 Cins",
    link: "/listing-car" as Route,
    icon: SparklesIcon,
  },
  {
    name: "İlanlarım",
    link: "/ilanlarim" as Route,
    icon: UserCircleIcon,
  },
];

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleEvent);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleEvent);
      }
    };
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

    if (item.isSpecial) {
      return (
        <Link
          key={index}
          href={item.link as PathName}
          className="flex flex-col items-center justify-center -mt-3.5"
        >
          <div className="w-10 h-10 rounded-full bg-[#dc5075] text-white flex items-center justify-center shadow-md shadow-[#dc5075]/40 ring-2 ring-white dark:ring-[#151312]">
            <PlusCircleIcon className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-bold text-[#dc5075] mt-0.5">
            {item.name}
          </span>
        </Link>
      );
    }

    return (
      <Link
        key={index}
        href={item.link as PathName}
        className={`flex flex-col items-center justify-between py-0.5 ${
          isActive
            ? "text-[#dc5075] font-bold"
            : "text-neutral-500 dark:text-neutral-400"
        }`}
      >
        <item.icon
          className={`w-4 h-4 ${isActive ? "text-[#dc5075]" : ""}`}
        />
        <span className="text-[9px] leading-none mt-1">{item.name}</span>
      </Link>
    );
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav block md:!hidden py-1.5 px-2 bg-[#FAF8F5]/95 dark:bg-[#151312]/95 backdrop-blur-md fixed top-auto bottom-0 inset-x-0 z-30 border-t border-[#EDE7DE] dark:border-neutral-800 transition-transform duration-300 ease-in-out shadow-lg"
    >
      <div className="w-full max-w-md flex justify-around items-center mx-auto text-center">
        {NAV.map(renderItem)}
      </div>
    </div>
  );
};

export default FooterNav;
