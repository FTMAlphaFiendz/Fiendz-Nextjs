import Image from "next/image";
import RoadmapCard from "./RoadmapCard.js";
import FiendMap from "../public/images/roadmap/fiend-map.png";
import FiendAlien from "../public/images/roadmap/fiend-alien.png";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
const variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, x: "-100%" },
};

const rightvariants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, x: "100%" },
};

const alienvariants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.5 } },
  hidden: { opacity: 0, x: "100%" },
};
//update
const DesktopRoadmap = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <div className="flex relative justify-center">
      <div id="left-content" className="flex flex-col items-end w-5/12">
        {leftContent.map((phase, i) => {
          return (
            <motion.div
              className={`bg-white phase-card-container m-4 lg:m-10 relative flex mb-10 justify-center w-full lg:w-9/12 `}
              key={i}
              ref={ref}
              animate={controls}
              initial="hidden"
              variants={variants}
            >
              <RoadmapCard
                title={phase.title}
                phaseComplete={phase.phaseComplete}
                phaseItems={phase.phaseItems}
              />
            </motion.div>
          );
        })}
      </div>
      <div id="right-content" className=" flex flex-col mt-24 w-5/12">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={alienvariants}
          className="alien-fiend z-10 h-32 w-32"
        >
          <Image src={FiendAlien} alt="Fiend in a ufo" />
        </motion.div>
        <div className="absolute -bottom-10 right-10 z-10">
          <Image src={FiendMap} alt="Fiend looking at map" />
        </div>
        {rightContent.map((phase, i) => {
          return (
            <motion.div
              className={`bg-white phase-card-container m-4 lg:m-10 relative flex mb-10 justify-center w-full lg:w-9/12 `}
              key={i}
              ref={ref}
              animate={controls}
              initial="hidden"
              variants={rightvariants}
            >
              <RoadmapCard
                title={phase.title}
                phaseComplete={phase.phaseComplete}
                phaseItems={phase.phaseItems}
                key={i}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopRoadmap;
