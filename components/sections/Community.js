import React from "react";
import Image from "next/image";
import Waves from "../Waves";
import Head2 from "../../public/images/heads/FAFZ-head-2.png";
import CommunityImageOverlay from "../CommunityImageOverlay";

const Community = () => {
  const firstParagraph =
    "Hey Fiendz! Welcome to the FAFz DApp. We are a team of Degens that want to show the world " +
    "that the Fantom family is the best! After creating the FTM Alpha Fiendz Discord, " +
    "it was YOU, the Fiendz, that made it an amazing community where we can come together and talk all things Fantom.";
  const secondParagraph =
    "The FAFz NFT will not only be our homage to the community that we've built, " +
    "but minting will also grant you access to Potluck Labs staking to earn $FANG, as well as exclusive giveaways and member perks in the Fiendz Discord.";

  return (
    <div
      id="community"
      className="flex lg:flex-row mx-auto w-full justify-center items-center md:place-items-center overflow-hidden community-bg relative h-full"
    >
      <Waves fillColor="#cc5ef5" />
      <CommunityImageOverlay />
      <div className="w-5/6 lg:w-6/12 flex flex-col items-center bg-white relative community-content my-32 md:my-20 py-5">
        <div className="flex flex-col font-inter content-line text-base sm:text-lg md:text-xl  font-normal text-center w-10/12 lg:w-full p-6 ">
          <h1 className="font-freckle text-4xl md:text-7xl main-title-text mb-5">
            Community
          </h1>
          <p className="mb-3">{firstParagraph}</p>
          <p>{secondParagraph}</p>
        </div>
      </div>
    </div>
  );
};

export default Community;
