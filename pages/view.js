import React, { useContext, useEffect, useState, useCallback } from "react";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import { UserContext } from "../context/UserContext";
import SEOMeta from "../components/SEOMeta";
import dynamic from "next/dynamic";

const DynamicView = dynamic(() => import("../components/NFTView"));

const SEOdesc =
  "Page to view all Special Edition FAFz and FAFz generative collection";

const View = () => {
  const { account, provider, chainId } = useContext(UserContext);
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
        <DynamicView />
      </NftPageViewWrapper>
    </div>
  );
};

export default View;
