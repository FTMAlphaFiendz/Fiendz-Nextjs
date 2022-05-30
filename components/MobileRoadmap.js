import React from "react";
import RoadmapCard from "./RoadmapCard.js";

const roadMapContent = [
  {
    title: "PHASE 1",
    phaseComplete: true,
    phaseItems: [
      {
        content: "Set up discord and build Epic community for FTM Alpha",
        completed: true,
      },
      {
        content:
          "Host frequent AMA's with all of the best projects in FTM with weekly giveaways",
        completed: true,
      },
    ],
  },
  {
    title: "PHASE 2",
    phaseComplete: true,
    phaseItems: [
      {
        content: "Design FTM Alpha Fiendz NFTs",
        completed: true,
      },
      {
        content: "Build FAFz mint website",
        completed: true,
      },
    ],
  },
  {
    title: "PHASE 3",
    phaseComplete: false,
    phaseItems: [
      {
        content: "Live Discord launch party",
        completed: false,
      },
      {
        content: "FAFz NFT Exclusive mint goes live",
        completed: false,
      },
    ],
  },
  {
    title: "PHASE 4",
    phaseComplete: false,
    phaseItems: [
      {
        content:
          "Staking live on Potluck Protocol to earn Fang once we reach 50% mint",
        completed: false,
      },
    ],
  },
  {
    title: "PHASE 5",
    phaseComplete: false,
    phaseItems: [
      {
        content: "Fiendz are continuing to build, stay tuned!",
        completed: false,
      },
    ],
  },
];
const MobileRoadmap = () => {
  return (
    <div className="mt-8 flex flex-col w-10/12 mx-auto items-center">
      {roadMapContent.map((phase, i) => {
        return (
          <RoadmapCard
            title={phase.title}
            phaseComplete={phase.phaseComplete}
            phaseItems={phase.phaseItems}
            key={phase.title}
          />
        );
      })}
    </div>
  );
};

export default MobileRoadmap;
