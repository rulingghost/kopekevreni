import React from "react";
import Link from "next/link";

export interface LogoProps {
  className?: string;
  lightMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", lightMode = false }) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-flex items-center gap-1.5 sm:gap-3 focus:outline-none focus:ring-0 group shrink-0 ${className}`}
    >
      {/* KULLANICININ YÜKLEDİĞİ YENİ RESMİ LOGO */}
      <div className="relative w-7 h-7 sm:w-11 sm:h-11 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
        <img
          src="/images/logo.png"
          alt="Köpek Evreni Logo"
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>

      <div className="flex flex-col">
        <span
          className={`text-base sm:text-2xl font-serif font-bold tracking-tight leading-none whitespace-nowrap ${
            lightMode ? "text-white" : "text-[#1C1917] dark:text-[#FAF8F5]"
          }`}
        >
          Köpek<span className="italic font-normal text-[#7A1C30] dark:text-[#E2A9B5] ml-0.5">Evreni</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
