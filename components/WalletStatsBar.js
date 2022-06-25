import React from "react";
import { TiArrowUnsorted } from "react-icons/ti";

const WalletStatsBar = ({
  nfts,
  walletScore,
  fafzCount,
  seCount,
  sortFAFZ,
  isHighSorted,
}) => {
  return (
    <>
      <div
        id="wallet-stats"
        className="bg-white flex w-full md:px-4 wallet-stats items-center mb-2"
      >
        <div className="w-3/12 flex-col text-center py-2 px-1">
          <p className="font-inter text-border text-lg md:text-xl">
            {walletScore}
          </p>
          <p className="font-inter text-border text-sm md:text-base">
            Wallet Score
          </p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex-col text-center py-2 px-1">
          <p className="font-inter text-border text-lg md:text-xl">3</p>
          <p className="font-inter text-border text-sm md:text-base">Tier</p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex-col text-center py-2 px-1">
          <p className="font-inter text-border text-lg md:text-xl">
            {fafzCount}
          </p>
          <p className="font-inter text-border text-sm md:text-base">FAFz</p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex-col text-center py-2 px-1">
          <p className="font-inter text-border text-lg md:text-xl">{seCount}</p>
          <p className="font-inter text-border text-sm md:text-base">FAFz SE</p>
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
