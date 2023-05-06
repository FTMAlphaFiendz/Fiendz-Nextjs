import React, { useEffect, useState, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import LatestSold from "../components/LatestSold";
import { getAllBoughtEvents } from "../helpers/NFTHelper";
import NFTViewSection from "../components/NFTViewSection";
import { useAccount } from "wagmi";
import axios from "axios";

const SEOdesc =
  "Page to view all Special Edition FAFz and FAFz generative collection";

const View = () => {
  const { isConnected, address } = useAccount();
  const [lastSold, setLastSold] = useState(null);
  const [isNFTDataLoading, setIsNFTDataLoading] = useState(false);
  const [isSoldDataLoading, setIsSoldDataLoading] = useState(true);
  const [userNFTs, setUserNFTs] = useState(null);

  useEffect(() => {
    if (isConnected) {
      setIsNFTDataLoading(true);
      (async () => {
        let headers = {
          secret: process.env.NEXT_PUBLIC_FAFZ_SECRET,
        };
        let { data } = await axios.post(
          "/api/nft/getUserNFTs",
          { address },
          { headers }
        );
        setUserNFTs(data.nfts);
        setIsNFTDataLoading(false);
      })();
    }
  }, [isConnected, address]);

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
          <div className="flex flex-col md:flex-row h-full w-full justify-center">
            <div id="view" className="w-full md:w-9/12 lg:w-9/12 mr-4">
              <NFTViewSection nftData={userNFTs} isLoading={isNFTDataLoading} />
            </div>
            {/* <div className="w-3/12 flex justify-center">
              <div
                id="sold"
                className="flex justify-center nft-border bg-white mb-3 hidden md:block w-full"
              >
                <LatestSold lastSold={lastSold} isLoading={isSoldDataLoading} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
