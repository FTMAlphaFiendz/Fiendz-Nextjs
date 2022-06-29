import React, { useEffect, useState, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import LatestSold from "../components/LatestSold";
import { UserContext } from "../context/UserContext";
import { getAllBoughtEvents } from "../helpers/NFTHelper";
import NFTViewSection from "../components/NFTViewSection";

const SEOdesc =
  "Page to view all Special Edition FAFz and FAFz generative collection";

const View = () => {
  const { user, userNFTData } = useContext(UserContext);
  const [lastSold, setLastSold] = useState(null);
  const [isNFTDataLoading, setIsNFTDataLoading] = useState(true);
  const [isSoldDataLoading, setIsSoldDataLoading] = useState(true);

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
        setIsNFTDataLoading(false);
        let allEvents = await getAllBoughtEvents();
        setLastSold(allEvents);
        setIsSoldDataLoading(false);
      })();
    }
  }, [user]);

  return (
    <div>
      <SEOMeta description={SEOdesc} path="/view" page="View" />
      <div className="mint-page relative flex">
        <div className="w-full mt-16 md:mt-20 mx-10">
          <header className="flex justify-center mb-4 lg:mt-8">
            <h1 className="font-freckle text-5xl md:text-7xl text-border page-title">
              MY NFTs
            </h1>
          </header>
          <div className="flex flex-col md:flex-row h-full w-full">
            <div id="view" className="w-full md:w-8/12 lg:w-9/12 ">
              <NFTViewSection
                nftData={userNFTData}
                isLoading={isNFTDataLoading}
              />
            </div>
            <div className="w-4/12 flex justify-center">
              <div
                id="sold"
                className="flex justify-center nft-border bg-white mb-3 hidden md:block"
              >
                <LatestSold lastSold={lastSold} isLoading={isSoldDataLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
