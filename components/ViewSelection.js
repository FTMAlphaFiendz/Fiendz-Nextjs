import React from "react";
import NFTViewSection from "../components/NFTViewSection";
import NFTStakingSection from "../components/NFTStakingSection";

const ViewSelection = ({ selected, nfts, skeletonCount }) => {
  switch (selected) {
    case "view":
      return <NFTViewSection nfts={nfts} skeletonCount={skeletonCount} />;
    case "stake":
      return <NFTStakingSection />;
    case "activity":
      return <NFTActivitySection />;
  }
};

export default ViewSelection;
