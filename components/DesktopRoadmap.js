import Image from "next/image";
import RoadmapCard from "./RoadmapCard.js";
import FiendMap from "../public/images/roadmap/fiend-map.png";
import FiendAlien from "../public/images/roadmap/fiend-alien.png";

const leftContent = [
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
    title: "PHASE 3",
    phaseComplete: true,
    phaseItems: [
      {
        content: "Live Discord launch party",
        completed: true,
      },
      {
        content: "FAFz NFT Exclusive mint goes live",
        completed: true,
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
const rightContent = [
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
    title: "PHASE 4",
    phaseComplete: true,
    phaseItems: [
      {
        content:
          "Staking live on Potluck Protocol to earn Fang once we reach 50% mint",
        completed: true,
      },
    ],
  },
];

const DesktopRoadmap = () => {
  return (
    <div className="flex relative justify-center">
      <div id="left-content" className="flex flex-col items-end w-5/12">
        {leftContent.map((phase, i) => {
          return (
            <RoadmapCard
              title={phase.title}
              phaseComplete={phase.phaseComplete}
              phaseItems={phase.phaseItems}
              key={i}
            />
          );
        })}
      </div>
      <div id="right-content" className=" flex flex-col mt-24 w-5/12">
        <div className="alien-fiend z-10 h-32 w-32">
          <Image src={FiendAlien} alt="Fiend in a ufo" />
        </div>
        <div className="absolute -bottom-10 right-10 z-10">
          <Image src={FiendMap} alt="Fiend looking at map" />
        </div>
        {rightContent.map((phase, i) => {
          return (
            <RoadmapCard
              title={phase.title}
              phaseComplete={phase.phaseComplete}
              phaseItems={phase.phaseItems}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DesktopRoadmap;
