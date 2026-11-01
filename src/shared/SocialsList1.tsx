import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: "Facebook", icon: "lab la-facebook-f", href: "#" },
  { name: "Twitter", icon: "lab la-twitter", href: "#" },
  { name: "Youtube", icon: "lab la-youtube", href: "#" },
  { name: "Instagram", icon: "lab la-instagram", href: "#" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SocialsList1 flex flex-wrap items-center gap-2.5 ${className}`}
      data-nc-id="SocialsList1"
    >
      {socials.map((item, index) => (
        <a
          href={item.href}
          key={index}
          title={item.name}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800/90 hover:bg-[#dc5075] border border-neutral-700 hover:border-[#dc5075] text-neutral-300 hover:text-white text-xs font-medium transition-all"
        >
          <i className={`${item.icon} text-base leading-none`}></i>
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialsList1;
