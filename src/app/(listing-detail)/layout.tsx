"use client";

import React, { ReactNode } from "react";
import MobileFooterSticky from "./(components)/MobileFooterSticky";

const DetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="ListingDetailPage relative">
      <div className="ListingDetailPage__content">{children}</div>
      <MobileFooterSticky />
    </div>
  );
};

export default DetailLayout;
