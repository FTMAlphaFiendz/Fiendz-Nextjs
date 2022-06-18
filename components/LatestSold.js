/* eslint-disable @next/next/no-img-element */
import React from "react";

const LatestSold = ({ lastSold }) => {
  return (
    <div className="latestSoldFooter">
      {lastSold?.map((nft) => {
        return (
          <div>
            <img src={nft.data?.image} className="latest-sold-img" />
          </div>
        );
      })}
    </div>
  );
};

export default LatestSold;
