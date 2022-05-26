import DesktopRoadmap from "../DesktopRoadmap.js";
import MobileRoadmap from "../MobileRoadmap.js";
import Waves from "../Waves";

const Roadmap = () => {
  const pageContent =
    "The team has outlined a roadmap to ensure that any prospects smoothly sail into the project promises";

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
      <p className="font-inter content-line text-base lg:text-lg font-normal text-center w-10/12 lg:w-8/12">
        {pageContent}
      </p>
      <div className="mt-8 hidden md:block">
        <DesktopRoadmap />
      </div>
      <div className="md:hidden mb-20">
        <MobileRoadmap />
      </div>
    </div>
  );
};

export default Roadmap;
