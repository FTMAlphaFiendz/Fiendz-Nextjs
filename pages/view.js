import React, { useEffect, useState, useContext } from "react";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import SEOMeta from "../components/SEOMeta";
import NFTView from "../components/NFTView";
import LatestSold from "../components/LatestSold";
import { UserContext } from "../context/UserContext";
import { getLatestBoughtFromNK } from "../helpers/NFTHelper";
import FantomIcon from "../public/images/misc/illustration-404.png";

const SEOdesc =
  "Page to view all Special Edition FAFz and FAFz generative collection";

const View = () => {
  const { user } = useContext(UserContext);
  const [lastSold, setLastSold] = useState(null);
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  useEffect(() => {
    if (user && user?.provider) {
      (async () => {
        let events = await getLatestBoughtFromNK(user?.provider);
        console.log({ events });
        setLastSold(events);
      })();
    }
  }, [user]);

  return (
    <div>
      <SEOMeta description={SEOdesc} path="/view" />
      <NftPageViewWrapper>
        <NFTView />
        <LatestSold lastSold={lastSold} />
      </NftPageViewWrapper>
    </div>
  );
};

export default View;
