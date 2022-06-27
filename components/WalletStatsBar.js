import React from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { Bars } from "react-loading-icons";

const WalletStatsBar = ({
  nfts,
  walletScore,
  fafzCount,
  seCount,
  sortFAFZ,
  isHighSorted,
  isLoading,
}) => {
  return (
    <>
      <div
        id="wallet-stats"
        className="bg-white flex w-full px-2 md:px-4 wallet-stats items-center mb-2"
      >
        <div className="w-3/12 flex flex-col items-center text-center py-2 px-1">
          {isLoading ? (
            <Bars fill="#1d1f91" style={{ height: "15px", width: "15px" }} />
          ) : (
            <p className="font-inter text-border text-lg md:text-xl">
              {walletScore}
            </p>
          )}
          <p className="font-inter text-border text-sm lg:text-base">
            Wallet Score
          </p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex flex-col items-center text-center py-2 px-1">
          {isLoading ? (
            <Bars fill="#1d1f91" style={{ height: "15px", width: "15px" }} />
          ) : (
            <p className="font-inter text-border text-lg md:text-xl">-</p>
          )}
          <p className="font-inter text-border text-sm lg:text-base">Tier</p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex flex-col items-center text-center py-2 px-1">
          {isLoading ? (
            <Bars fill="#1d1f91" style={{ height: "15px", width: "15px" }} />
          ) : (
            <p className="font-inter text-border text-lg md:text-xl">
              {fafzCount}
            </p>
          )}
          <p className="font-inter text-border text-sm lg:text-base">FAFz</p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex flex-col items-center text-center py-2 px-1">
          {isLoading ? (
            <Bars fill="#1d1f91" style={{ height: "15px", width: "15px" }} />
          ) : (
            <p className="font-inter text-border text-lg md:text-xl">
              {seCount}
            </p>
          )}
          <p className="font-inter text-border text-sm lg:text-base">FAFz SE</p>
        </div>
        <div
          className="text-2xl text-border cursor-pointer pr-1"
          onClick={() => {
            sortFAFZ(nfts, isHighSorted);
          }}
        >
          <TiArrowUnsorted />
        </div>
      </div>
    </>
  );
};

export default WalletStatsBar;
