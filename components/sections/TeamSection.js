import React from "react";
import Waves from "../Waves";
import Carousel from "../Carousel";

const pageContent =
  "We are a collaborative of Degen creators committed to gripping the world with impactful projects";

const teamInfo = [
  {
    image: "/images/team-pics/brettFAFz.png",
    name: "Brett Smith",
    position: "Project Director",
    handle: "@TimeCop0487",
    links: [{ type: "twitter", url: "https://twitter.com/TimeCop0487" }],
  },
  {
    image: "/images/team-pics/adamFAFz.png",
    name: "Adam Nasri",
    position: "Artist/Designer",
    handle: "@KuroCrypto_",
    links: [
      { type: "twitter", url: "https://twitter.com/KuroCrypto_" },
      { type: "instagram", url: "https://www.instagram.com/adam2d.design/" },
    ],
  },
  {
    image: "/images/team-pics/vinnyFAFz.png",
    name: "Vinícius Vargas",
    position: "Tech Lead",
    handle: "@vinnyski",
    links: [{ type: "twitter", url: "https://twitter.com/vinnyski" }],
  },
  {
    image: "/images/team-pics/coleFAFz.png",
    name: "Cole Miller",
    position: "Web Dev",
    handle: "@b0nesFAFZ",
    links: [{ type: "twitter", url: "https://twitter.com/b0nesFAFZ" }],
  },
  {
    image: "/images/team-pics/team5.png",
    name: "unkown",
    position: "DeFi Project Analyst & Investment Strategist",
    handle: "@BrokeDegenFAFz",
    links: [{ type: "twitter", url: "https://twitter.com/BrokeDegenFAFz" }],
  },
  {
    image: "/images/team-pics/team6.png",
    name: "unkown",
    position: "DeFi Project Analyst & Investment Strategist",
    handle: "@gorgory_ct",
    links: [{ type: "twitter", url: "https://twitter.com/gorgory_ct" }],
  },
  // {
  //   image: "/images/team-pics/wm_Morello.png",
  //   name: "unkown",
  //   position: "DeFi Project Analyst & Investment Strategist",
  //   handle: "@gorgory_ct",
  //   links: [{ type: "twitter", url: "https://twitter.com/gorgory_ct" }],
  // },
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
      <Carousel data={teamInfo} />
    </div>
  );
};

export default TeamSection;
