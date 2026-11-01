"use client";

import { Popover, Transition } from "@headlessui/react";
import Input from "@/shared/Input";
import React, { FC, Fragment } from "react";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const SearchDropdown: FC<Props> = ({ className = "" }) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent, close: () => void) => {
    e.preventDefault();
    const val = inputRef.current?.value.trim();
    if (val) {
      router.push(`/listing-stay?q=${encodeURIComponent(val)}`);
    } else {
      router.push("/listing-stay");
    }
    close();
  };

  return (
    <React.Fragment>
      <Popover className={`relative ${className}`}>
        {({ open, close }) => {
          if (open) {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }

          return (
            <>
              <Popover.Button className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                <i className="las la-search"></i>
              </Popover.Button>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute right-0 z-20 top-full w-screen max-w-sm mt-2 shadow-xl rounded-full"
                >
                  <form onSubmit={(e) => handleSubmit(e, close)}>
                    <Input
                      ref={inputRef}
                      rounded="rounded-full"
                      type="search"
                      placeholder="İlan ara..."
                      className="border-2 border-[#dc5075] shadow-lg text-sm"
                    />
                    <input type="submit" hidden value="" />
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </React.Fragment>
  );
};

export default SearchDropdown;
