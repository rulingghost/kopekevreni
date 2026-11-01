"use client";

import React, { ReactNode } from "react";

const DetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="ListingDetailPage relative">
      <div className="ListingDetailPage__content">{children}</div>
    </div>
  );
};

export default DetailLayout;
