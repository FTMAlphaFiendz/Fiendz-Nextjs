import React from "react";
import RoadmapCard from "./RoadmapCard.js";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

const variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, x: "-100%" },
};

const MobileRoadmap = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <div className="mt-8 flex flex-col w-10/12 mx-auto items-center" ref={ref}>
      {roadMapContent.map((phase, i) => {
        return (
          <motion.div
            className={`bg-white phase-card-container m-4 lg:m-10 relative flex mb-10 justify-center w-full lg:w-9/12 `}
            key={phase.title}
            animate={controls}
            initial="hidden"
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, delay: Number(`0.${i}`) },
              },
              hidden: { opacity: 0, x: "-100%" },
            }}
          >
            <RoadmapCard
              title={phase.title}
              phaseComplete={phase.phaseComplete}
              phaseItems={phase.phaseItems}
              key={phase.title}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default MobileRoadmap;
