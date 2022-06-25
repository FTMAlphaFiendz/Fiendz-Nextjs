/* eslint-disable @next/next/no-img-element */
import React from "react";
import CommonCard from "../../public/images/fiend-card/common-card.png";
import EpicCard from "../../public/images/fiend-card/epic-card.png";
import LegendaryCard from "../../public/images/fiend-card/legendary-card.png";
import RareCard from "../../public/images/fiend-card/rare-card.png";
import Image from "next/image";
import Waves from "../Waves";
import Link from "next/link";
import GenesisFiend from "../../public/images/fiendz/fiend-5.png";

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
      className="flex flex-col lg:flex-row mx-auto h-full w-full justify-center items-center md:place-items-center min-h-full footer-bg relative"
    >
      <Waves fillColor="#fedf87" />
      <div className="flex flex-col items-center justify-center w-full">
        <header className="xs:mt-20 mt-20 2xl:mt-10 mb-5 text-center w-10/12">
          <h1 className="font-freckle text-4xl md:text-7xl text-border page-title">
            COLLECTIONS
          </h1>
        </header>
        <Link href="/genesis-collection">
          <div
            className={`coming-soon-bg collection-card phase-card-container mt-24 mb-40 relative flex justify-center w-10/12 md:w-9/12 lg:w-7/12 xl:w-5/12 skew cursor-pointer`}
            style={{ height: "170px" }}
          >
            <div className="flex items-center w-full">
              <h1 className="main-title-text font-freckle text-3xl md:text-4xl ml-6">
                GENESIS COLLECTION
              </h1>
            </div>
            <div
              className="no-skew"
              style={{
                height: "120px",
                width: "120px",
                position: "absolute",
                bottom: 0,
                right: 5,
              }}
            >
              <Image src={GenesisFiend} alt="team member" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Rarity;
