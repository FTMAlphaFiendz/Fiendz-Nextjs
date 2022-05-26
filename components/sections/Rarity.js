import React from "react";
import FiendCard from "../FiendCard";
import LegendaryTitle from "../../public/images/titles/title-legendary.png";
import FiendLegendary from "../../public/images/fiend-card/fiend-legendary-v3.png";
import FiendRare from "../../public/images/fiend-card/fiend-rare-v3.png";
import RareTitle from "../../public/images/titles/title-rare.png";
import EpicTitle from "../../public/images/titles/title-epic.png";
import FiendEpic from "../../public/images/fiend-card/fiend-epic-v3.png";
import CommonTitle from "../../public/images/titles/title-common.png";
import FiendCommon from "../../public/images/fiend-card/fiend-common-v3.png";
import FiendsFooter from "../FiendsFooter";
import Waves from "../Waves";

const pageContent =
  "FAFz is a collection that we will only run for a limited time and limted mint, but we will have very long-term " +
  "benefits to holders. Each Fiend is unique in its own way, characterized by a rarity from Common to Legendary. Being apart of the " +
  "whitelist will get you a FAFz Pet NFT";

const allItems = [
  {
    title: CommonTitle,
    image: FiendCommon,
    alt: "Common Fiendz Image",
    perks: [
      {
        emoji: "🖼",
        label: "picture frame",
        text: "Owning an awesome PFP",
      },
      {
        emoji: "🔒",
        label: "lock",
        text: "Exclusive private channel",
      },
      {
        emoji: "🎁",
        label: "gift",
        text: "Access to exclusive giveaways",
      },
      {
        emoji: "🦇",
        label: "bat",
        text: "Potluck Staking",
      },
    ],
    background: "bg-common",
  },
  {
    title: RareTitle,
    image: FiendRare,
    alt: "Rare Fiendz Image",
    perks: [
      {
        emoji: "🖼",
        label: "picture frame",
        text: "Owning an awesome PFP",
      },
      {
        emoji: "🔒",
        label: "lock",
        text: "Exclusive private channel",
      },
      {
        emoji: "🎁",
        label: "gift",
        text: "Access to exclusive giveaways",
      },
      {
        emoji: "🦇",
        label: "bat",
        text: "Potluck Staking",
      },
    ],
    background: "bg-rare",
  },
  {
    title: EpicTitle,
    image: FiendEpic,
    alt: "Epic Fiendz Image",
    perks: [
      {
        emoji: "🖼",
        label: "picture frame",
        text: "Owning an awesome PFP",
      },
      {
        emoji: "🔒",
        label: "lock",
        text: "Exclusive private channel",
      },
      {
        emoji: "🎁",
        label: "gift",
        text: "Access to exclusive giveaways",
      },
      {
        emoji: "🦇",
        label: "bat",
        text: "Potluck Staking",
      },
    ],
    background: "bg-epic",
  },
  {
    title: LegendaryTitle,
    image: FiendLegendary,
    alt: "Legendary Fiendz Image",
    perks: [
      {
        emoji: "🖼",
        label: "picture frame",
        text: "Owning an awesome PFP",
      },
      {
        emoji: "🔒",
        label: "lock",
        text: "Exclusive private channel",
      },
      {
        emoji: "🎁",
        label: "gift",
        text: "Access to exclusive giveaways",
      },
      {
        emoji: "🦇",
        label: "bat",
        text: "Potluck Staking",
      },
    ],
    background: "bg-legendary",
  },
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
        </div>
        <div className="mt-8">
          <div className="flex flex-col min-h-full">
            <div id="desktop section" className="mb-10">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center lg:mx-10">
                {allItems.map((item, i) => {
                  return (
                    <FiendCard
                      title={item.title}
                      image={item.image}
                      alt={item.alt}
                      perks={item.perks}
                      background={item.background}
                      key={i}
                    />
                  );
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
