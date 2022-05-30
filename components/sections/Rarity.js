import React from "react";
import CommonCard from "../../public/images/fiend-card/common-card.png";
import EpicCard from "../../public/images/fiend-card/epic-card.png";
import LegendaryCard from "../../public/images/fiend-card/legendary-card.png";
import RareCard from "../../public/images/fiend-card/rare-card.png";
import FiendsFooter from "../FiendsFooter";
import Image from "next/image";
import Waves from "../Waves";

const pageContent =
  "FAFz is a collection that we will only run for a limited time and limted mint, but we will have very long-term " +
  "benefits to holders. Each Fiend is unique in its own way, characterized by a rarity from Common to Legendary.";

const perks = [
  "Owning an awesome PFP",
  "Exclusive private discord channels",
  "Access to exclusive giveaways",
  "Potluck Staking",
];

const imageCards = [
  { title: "common", alt: "common card", image: CommonCard },
  { title: "rare", alt: "rare card", image: RareCard },
  { title: "epic", alt: "epic card", image: EpicCard },
  { title: "legendary", alt: "legendary card", image: LegendaryCard },
];

const Rarity = () => {
  return (
    <div
      id="rarity"
      className="flex flex-col lg:flex-row mx-auto h-full w-full justify-center items-center md:place-items-center min-h-full rarity-bg relative"
    >
      <Waves fillColor="#fedf87" />
      <div className="flex flex-col items-center justify-center">
        <header className="xs:mt-20 mt-20 2xl:mt-10 mb-5 text-center w-10/12">
          <h1 className="font-freckle text-4xl md:text-7xl text-border page-title">
            RARITY & PERKS
          </h1>
        </header>
        <div className="w-10/12 lg:w-8/12">
          <p className="font-inter content-line text-base lg:text-lg font-normal text-center mb-8">
            {pageContent}
          </p>
          <h6 className="font-inter content-line text-lg lg:text-xl font-normal text-center">
            PERKS
          </h6>
          <ul className="font-inter content-line text-base lg:text-lg font-normal text-center mb-6">
            {perks.map((perk) => {
              return <li>{perk}</li>;
            })}
          </ul>
          <p className="font-inter content-line text-base lg:text-lg font-normal text-center mb-8"></p>
        </div>
        <div className="mt-8">
          <div className="flex flex-col min-h-full">
            <div id="desktop section" className="mb-10 flex justify-center">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 justify-items-center lg:mx-10 w-9/12">
                {imageCards.map((card) => {
                  return <Image src={card.image} key={card.title} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <FiendsFooter />
      </div>
    </div>
  );
};

export default Rarity;
