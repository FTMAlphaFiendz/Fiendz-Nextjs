import React from "react";
import Image from "next/image";
import Head1 from "../public/images/heads/FAFZ-head-1.png";
import Head4 from "../public/images/heads/FAFZ-head-4.png";
import Head7 from "../public/images/heads/FAFZ-head-7.png";
import Head9 from "../public/images/heads/FAFZ-head-9.png";
import Head10 from "../public/images/heads/FAFZ-head-10.png";
import Head13 from "../public/images/heads/FAFZ-head-13.png";

const LandingHeadOverlay = () => {
  return (
    <>
      <div className="fiendz-heads head1">
        <Image src={Head1} alt="Fiend Head 1" layout="responsive" />
      </div>
      <div className="fiendz-heads head4">
        <Image src={Head4} alt="Fiend Head 4" layout="responsive" />
      </div>
      <div className="fiendz-heads head10">
        <Image src={Head10} alt="Fiend Head 10" layout="responsive" />
      </div>
      <div className="fiendz-heads head13">
        <Image src={Head13} alt="Fiend Head 13" layout="responsive" />
      </div>
      <div className="fiendz-heads hidden sm:block head7">
        <Image src={Head7} alt="Fiend Head 7" layout="responsive" />
      </div>
      <div className="fiendz-heads hidden sm:block head9">
        <Image src={Head9} alt="Fiend Head 9" layout="responsive" />
      </div>
    </>
  );
};

export default LandingHeadOverlay;
