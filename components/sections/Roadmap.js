import { useEffect, useState } from "react";
import DesktopRoadmap from "../DesktopRoadmap.js";
import MobileRoadmap from "../MobileRoadmap.js";
import Waves from "../Waves";

const Roadmap = () => {
  const mediumBPWidth = 768;
  const [pageWidth, setPageWidth] = useState(null);
  const pageContent =
    "The team has outlined a roadmap to ensure that any prospects smoothly sail into the project promises";

  const appWidth = () => {
    setPageWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", appWidth);
    appWidth();
  }, [pageWidth]);

  return (
    <div
      id="roadmap"
      className="flex flex-col mx-auto h-full w-full justify-center items-center md:place-items-center min-h-full roadmap-bg relative md:pb-40"
    >
      <Waves fillColor="#9a91ec" />
      <header className="xs:mt-20 mt-20 2xl:mt-5 mb-5 text-center w-10/12">
        <h1 className="font-freckle text-4xl md:text-7xl text-border page-title">
          FIENDZ MAP
        </h1>
      </header>
      <p className="font-inter content-line text-base sm:text-lg md:text-xl  font-normal text-center w-10/12 lg:w-8/12">
        {pageContent}
      </p>
      <div className="mb-10">
        <RoadmapRender pageWidth={pageWidth} />
      </div>
    </div>
  );
};

const RoadmapRender = ({ pageWidth }) => {
  const mediumBPWidth = 768;
  if (mediumBPWidth >= pageWidth) {
    return <MobileRoadmap />;
  } else {
    return <DesktopRoadmap />;
  }
};

export default Roadmap;
