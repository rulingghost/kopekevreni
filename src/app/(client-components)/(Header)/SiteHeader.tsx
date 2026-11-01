"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { PathName } from "@/routers/types";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { useThemeMode } from "@/utils/useThemeMode";

const PAGES_HIDE_HEADER_BORDER: PathName[] = [
  "/home-3",
  "/listing-car-detail",
  "/listing-experiences-detail",
  "/listing-stay-detail",
];

const SiteHeader: FC = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsTopOfPage(window.pageYOffset < 5);
  }, []);

  useThemeMode();

  return (
    <>
      <Header
        className={
          isTopOfPage && PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)
            ? ""
            : "shadow-sm border-b border-neutral-100 dark:border-neutral-800"
        }
        navType="MainNav1"
      />
      <div ref={anchorRef} className="h-1 absolute invisible"></div>
    </>
  );
};

export default SiteHeader;
