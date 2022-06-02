import React from "react";
import Image from "next/image";
import Cat from "../public/images/community-images/cat.png";
import Diamond from "../public/images/community-images/ftm-diamond.png";
import Ghost from "../public/images/community-images/ghost.png";
import Planet from "../public/images/community-images/planet.png";
import Skull from "../public/images/community-images/skull.png";

const CommunityImageOverlay = () => {
  return (
    <>
      <div className="fiendz-heads c-planet hidden md:block">
        <Image src={Planet} alt="Fiend Head 1" layout="responsive" />
      </div>
      <div className="fiendz-heads c-skull">
        <Image src={Skull} alt="Fiend Head 4" layout="responsive" />
      </div>
      <div className="fiendz-heads c-ghost">
        <Image src={Ghost} alt="Fiend Head 10" layout="responsive" />
      </div>
      <div className="fiendz-heads c-diamond">
        <Image src={Diamond} alt="Fiend Head 13" layout="responsive" />
      </div>
      <div className="fiendz-heads c-cat hidden md:block">
        <Image src={Cat} alt="Fiend Head 7" layout="responsive" />
      </div>
    </>
  );
};

export default CommunityImageOverlay;
