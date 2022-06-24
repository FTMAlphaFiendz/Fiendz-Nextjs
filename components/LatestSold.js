/* eslint-disable @next/next/no-img-element */
import React from "react";
import { GoKey } from "react-icons/go";
import { GiCampfire } from "react-icons/gi";
import FantomIcon from "./svg-icons/FantomIcon";
import { ThreeDots } from "react-loading-icons";
import { formatName } from "../helpers/utils";

const LatestSold = ({ lastSold, isLoading }) => {
  const getMarketplaceIcon = (marketplace) => {
    console.log(marketplace);
    let icon;
    switch (marketplace) {
      case "nftkey":
        icon = <GoKey />;
        break;
      case "campfire":
        icon = <GiCampfire />;
      default:
        console.log(marketplace);
    }
    return icon;
  };

  return (
    <div className="px-3">
      <h2 className="text-border font-inter p-2 text-xl">Recent Sales</h2>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center mb-6 text-border">
          <span className="text-sm my-4">
            <ThreeDots stroke="#1d1f91" fill="#1d1f91" speed={0.75} />
          </span>

          <h2 className="text-border font-inter text-lg">
            Fetching Sold Data....
          </h2>
        </div>
      ) : (
        lastSold?.map((nft, i) => {
          return (
            <>
              <div className="flex flex-row mx-2 my-2" key={nft.data?.name}>
                <img
                  src={nft.data?.image}
                  className="latest-sold-img nft-border"
                />
                <div className="flex-col ml-3">
                  <p className="text-border font-inter">
                    {formatName(nft.data?.name)}
                  </p>
                  <div className="flex items-center">
                    <p className="text-border font-inter text-base">Sold</p>
                    <FantomIcon />
                    <p className="text-border font-inter text-base">
                      {nft?.purchasedPrice}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-bottom"></div>
            </>
          );
        })
      )}
    </div>
  );
};

export default LatestSold;
