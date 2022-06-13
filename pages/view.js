import React, { useEffect } from "react";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import SEOMeta from "../components/SEOMeta";
import NFTView from "../components/NFTView";

const SEOdesc =
  "Page to view all Special Edition FAFz and FAFz generative collection";

const View = () => {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  return (
    <div>
      <SEOMeta page="View" description={SEOdesc} path="/view" />
      <NftPageViewWrapper>
        <NFTView />
      </NftPageViewWrapper>
    </div>
  );
};

export default View;
