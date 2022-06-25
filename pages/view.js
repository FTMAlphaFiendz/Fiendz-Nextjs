import React, { useEffect, useState, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import LatestSold from "../components/LatestSold";
import { UserContext } from "../context/UserContext";
import { getAllBoughtEvents, getAllUserNFTs } from "../helpers/NFTHelper";
import NFTViewSection from "../components/NFTViewSection";
import rarityMap from "../public/files/rarityMap.json";

const SEOdesc =
  "Page to view all Special Edition FAFz and FAFz generative collection";

const View = () => {
  const { user } = useContext(UserContext);
  const [userNFTData, setUserNFTData] = useState(null);
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
        let userData = await getAllUserNFTs(
          user?.provider,
          user?.account,
          rarityMap
        );
        console.log(userData);
        setUserNFTData(userData);
        setIsNFTDataLoading(false);
        let allEvents = await getAllBoughtEvents(user?.provider);
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
            <h1 className="text-white font-inter text-3xl">MY NFTs</h1>
          </header>
          <div className="flex flex-col md:flex-row h-full w-full">
            <div id="view" className="w-full md:w-8/12 lg:w-9/12 md:mr-4">
              <NFTViewSection
                nftData={userNFTData}
                isLoading={isNFTDataLoading}
              />
            </div>
            <div
              id="sold"
              className="flex justify-center md:w-4/12 lg:3/12 nft-border bg-white mb-3 hidden md:block"
            >
              <LatestSold lastSold={lastSold} isLoading={isSoldDataLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
