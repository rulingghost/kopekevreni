import React, { FC } from "react";
import { Nav } from "./(components)/Nav";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="nc-CommonLayoutAccount bg-[#FAF8F5] dark:bg-[#151312] min-h-screen transition-colors">
      <div className="border-b border-[#EDE7DE] dark:border-neutral-800 pt-10 bg-white/80 dark:bg-[#1E1C1A]/80 backdrop-blur-md">
        <Nav />
      </div>
      <div className="container px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24 lg:pb-32">{children}</div>
    </div>
  );
};

export default CommonLayout;
