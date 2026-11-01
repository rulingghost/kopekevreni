import React from "react";
import PageAddListing1 from "./PageAddListing1";
import PageAddListing2 from "./PageAddListing2";
import PageAddListing3 from "./PageAddListing3";
import PageAddListing4 from "./PageAddListing4";

const Page = ({
  params,
  searchParams,
}: {
  params: { stepIndex?: string[] | string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const rawIndex = Array.isArray(params?.stepIndex)
    ? params.stepIndex[0]
    : params?.stepIndex;
  const step = Number(rawIndex) || 1;

  let ContentComponent = PageAddListing1;
  switch (step) {
    case 1:
      ContentComponent = PageAddListing1;
      break;
    case 2:
      ContentComponent = PageAddListing2;
      break;
    case 3:
      ContentComponent = PageAddListing3;
      break;
    case 4:
      ContentComponent = PageAddListing4;
      break;
    default:
      ContentComponent = PageAddListing1;
      break;
  }

  return <ContentComponent />;
};

export default Page;
