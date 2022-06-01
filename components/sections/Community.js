import React from "react";
import Image from "next/image";
import Waves from "../Waves";
import Head2 from "../../public/images/heads/FAFZ-head-2.png";
import CommunityTitle from "../../public/images/titles/title-community.png";

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
      <div className="w-5/6 lg:w-6/12 md:p-10 flex flex-col items-center bg-white relative community-content">
        {/* <div className="absolute -top-6 md:-top-10 lg:-top-100 w-10/12 md:w-8/12 mb-2">
          <Image src={CommunityTitle} alt="A Community" />
        </div> */}
        <div className="community-fiendz-head -bottom-20 -left-10">
          <Image src={Head2} alt="fiendz head" />
        </div>
        <div className="flex flex-col font-inter content-line text-base lg:text-lg font-normal text-center w-10/12 lg:w-full ">
          <h1 className="">Community</h1>
          <p className="mb-3">{firstParagraph}</p>
          <p>{secondParagraph}</p>
        </div>
      </div>
    </div>
  );
};

export default Community;
