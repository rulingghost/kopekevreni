import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="nc-BreedEncyclopediaPage relative">{children}</div>;
};

export default Layout;
