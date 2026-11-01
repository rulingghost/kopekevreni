"use client";

import React from "react";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import { Disclosure } from "@headlessui/react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "@/data/navigation";
import SocialsList from "@/shared/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import Link from "next/link";
import { Route } from "@/routers/types";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-4 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              href={(i.href || "/") as Route}
              onClick={onClickClose}
              className="flex px-4 text-neutral-800 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-1"
            >
              <span className={`py-2 pr-3 ${!i.children ? "block w-full" : ""}`}>
                {i.name}
              </span>
              {i.children && (
                <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
                  <Disclosure.Button as="span" className="py-2 flex justify-end flex-1">
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure key={item.id} as="li" className="text-neutral-900 dark:text-white">
        <Link
          className="flex w-full px-4 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={(item.href || "/") as Route}
          onClick={item.children ? undefined : onClickClose}
        >
          <span className={`py-3 pr-3 ${!item.children ? "block w-full" : ""}`}>
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button as="span" className="py-3 flex items-center justify-end flex-1">
                <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-4 text-neutral-600 dark:text-neutral-300 text-xs">
          <span>
            Türkiye'nin köpek ilanları ve köpek sahipleri ile köpek arayanların buluşma platformu.
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>

      <ul className="flex flex-col py-4 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>

      {/* Alt Aksiyon Butonları */}
      <div className="flex flex-col gap-2.5 py-6 px-5">
        <Link
          href={"/add-listing/1" as Route}
          onClick={onClickClose}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 transition-all text-center"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 10c1.2 0 2.2-.9 2.2-2.1 0-1.2-1-2.1-2.2-2.1s-2.2.9-2.2 2.1c0 1.2 1 2.1 2.2 2.1zm-4.8-.8c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8-1.8.8-1.8 1.8.8 1.8 1.8 1.8zm9.6 0c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8-1.8.8-1.8 1.8.8 1.8 1.8 1.8zM12 12.2c-2.3 0-4.3 1.6-4.9 3.8-.3 1.1.5 2.2 1.6 2.2h6.6c1.1 0 1.9-1.1 1.6-2.2-.6-2.2-2.6-3.8-4.9-3.8z"/>
          </svg>
          <span>🐾 Ücretsiz İlan Ver</span>
        </Link>
        <Link
          href={"/login" as Route}
          onClick={onClickClose}
          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          Giriş Yap / Üye Ol
        </Link>
      </div>
    </div>
  );
};

export default NavMobile;
