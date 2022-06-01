import React, { useContext, useEffect, useState, useCallback } from "react";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import { UserContext } from "../context/UserContext";
import dynamic from "next/dynamic";

const DynamicView = dynamic(() => import("../components/NFTView"));

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
    <NftPageViewWrapper>
      <DynamicView />
    </NftPageViewWrapper>
  );
};

export default View;
