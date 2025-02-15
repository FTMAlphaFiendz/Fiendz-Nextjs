import React from "react";
import CommonCard from "../../public/images/fiend-card/common-card.png";
import EpicCard from "../../public/images/fiend-card/epic-card.png";
import LegendaryCard from "../../public/images/fiend-card/legendary-card.png";
import RareCard from "../../public/images/fiend-card/rare-card.png";
import Image from "next/image";
import Waves from "../Waves";
import PerksCard from "../PerksCard";

const pageContent =
  "The FAFz Genesis collection is our first edition. Genesis holders will be able to receive long term benefits including exclusive WL access to our future collections. " +
  "Each Fiend is unique in its own way, characterized by a rarity from Common to Legendary.";

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
        <div className="w-10/12 lg:w-8/12 flex flex-col items-center">
          <p className="font-inter content-line text-base sm:text-lg md:text-xl  font-normal text-center mb-8">
            {pageContent}
          </p>
          <PerksCard />
        </div>
        <div className="my-10 w-full">
          <div className="flex flex-col min-h-full">
            <div id="desktop section" className="mb-10 flex justify-center">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:mx-10 w-9/12 place-content-center">
                {imageCards.map((card) => {
                  return (
                    <div key={card.title} className="flex justify-center">
                      <Image src={card.image} alt={card.alt} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rarity;
