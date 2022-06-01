import React from "react";
import Emoji from "./Emoji";

const perks = [
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
];
const PerksCard = () => {
  return (
    <div
      className={`bg-white phase-card-container m-4 relative flex justify-center w-11/12 md:w-6/12`}
    >
      <div
        className={`absolute perk-title w-9/12 md:w-7/12 block flex place-items-center px-8 -top-7 justify-center`}
      >
        <h1 className="phase-text font-bakbak text-center text-xl text-border">
          PERKS
        </h1>
      </div>
      <div className="py-8 px-3">
        <ul className="font-inter content-line text-base lg:text-lg font-normal text-border text-center">
          {perks.map((perk, i) => {
            return (
              <li key={perk.label}>
                <span className="mr-3 text-xl">
                  <Emoji symbol={perk.emoji} label={perk.label} />
                </span>{" "}
                {perk.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PerksCard;
