import React from "react";
import TeamCard from "../TeamCard";
import Waves from "../Waves";
import Adam from "../../public/images/team-pics/adamFAFz.png";
import Brett from "../../public/images/team-pics/brettFAFz.png";
import Vinny from "../../public/images/team-pics/vinnyFAFz.png";
import Cole from "../../public/images/team-pics/coleFAFz.png";
import BrokeDegen from "../../public/images/team-pics/team5.png";
import Georgory from "../../public/images/team-pics/team6.png";

const pageContent =
  "We are a collaborative of Degen creators committed to gripping the world with impactful projects";

const teamInfo = [
  {
    image: Brett,
    name: "Brett Smith",
    position: "Project Director",
    handle: "@TimeCop0487",
    links: [{ type: "twitter", url: "https://twitter.com/TimeCop0487" }],
  },
  {
    image: Adam,
    name: "Adam Nasri",
    position: "Artist/Designer",
    handle: "@KuroCrypto_",
    links: [
      { type: "twitter", url: "https://twitter.com/KuroCrypto_" },
      { type: "instagram", url: "https://www.instagram.com/adam2d.design/" },
    ],
  },
  {
    image: Vinny,
    name: "Vinícius Vargas",
    position: "Tech Lead",
    handle: "@vinnyski",
    links: [{ type: "twitter", url: "https://twitter.com/vinnyski" }],
  },
  {
    image: Cole,
    name: "Cole Miller",
    position: "Web Dev",
    handle: "@cmxCole",
    links: [{ type: "twitter", url: "https://twitter.com/cmxCole" }],
  },
];

const brainiacInfo = [
  {
    image: BrokeDegen,
    name: "unkown",
    position: "DeFi Project Analyst & Investment Strategist",
    handle: "@ProjectResearc3",
    links: [{ type: "twitter", url: "https://twitter.com/ProjectResearc3" }],
  },
  {
    image: Georgory,
    name: "unkown",
    position: "DeFi Project Analyst & Investment Strategist",
    handle: "@gorgory_ct",
    links: [{ type: "twitter", url: "https://twitter.com/gorgory_ct" }],
  },
];

const TeamSection = () => {
  return (
    <div
      id="team"
      className="flex flex-col mx-auto h-full w-full justify-center items-center md:place-items-center min-h-full team-bg relative p-10 md:pb-40"
    >
      <Waves fillColor="#fedf87" />
      <header className="xs:mt-20 mt-20 2xl:mt-5 mb-5 text-center">
        <h1 className="font-freckle text-4xl md:text-7xl text-border page-title">
          FIENDZ TEAM
        </h1>
      </header>
      <p className="font-inter leading-6 text-base sm:text-lg md:text-xl font-bold text-center w-10/12 lg:w-8/12">
        {pageContent}
      </p>
      <div className="card-container grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center md:mt-8 mb-20 md:mb-0">
        {teamInfo.map((item) => {
          return (
            <TeamCard
              name={item.handle}
              image={item.image}
              position={item.position}
              links={item.links}
              key={item.handle}
            />
          );
        })}
      </div>
      <h1 className="font-freckle text-4xl md:text-7xl text-border page-title md:mt-10 mb-10">
        BRAINIACS
      </h1>
      <div className="card-container grid grid-cols-1 gap-1 md:grid-cols-2 justify-items-center md:mt-8 mb-20 md:mb-0">
        {brainiacInfo.map((item) => {
          return (
            <TeamCard
              name={item.handle}
              image={item.image}
              position={item.position}
              links={item.links}
              key={item.handle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeamSection;
