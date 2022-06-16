import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logoBig from "../../public/images/titles/logo-big.png";
import Div100vh from "react-div-100vh";
import { FaTwitter, FaDiscord, FaRegPaperPlane } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import MainButton from "../MainButton";
import Waves from "../Waves";
import FiendsFooter from "../FiendsFooter";

const Landing = () => {
  const twitterLink = "https://twitter.com/FtmAlphaFiendz";
  const discordLink = "https://discord.gg/Cmq7H3hncc";
  const mediumLink =
    "https://medium.com/@timecop0487/ftm-alpha-fiendz-de1acf053ea4";
  const pageText =
    "We are building the biggest community on the FTM Network and " +
    "for that we need your help. We are offering the FAFz Collection " +
    "to the community that will help us build our project and give exclusive and unique perks to the holders.";
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);
  return (
    <div
      id="main"
      className={`flex flex-col mx-auto h-full w-full justify-center place-items-center landing-background relative`}
    >
      <Waves fillColor="#fedf87" />
      <header className="mb-3 flex justify-center">
        <div className="main-title lg:w-1/2 md:mt-10 2xl:mt-0">
          <Image src={logoBig} alt="Alpha Fiendz Logo Big" />
        </div>
        <h1 className="hidden">FTM Alpha Fiendz</h1>
      </header>
      <div className="flex flex-col justify-center w-10/12 lg:w-8/12 lg:w-1/2 lg:mb-20 ">
        <p className="text-center font-inter text-base sm:text-lg md:text-xl font-normal my-3 content-line">
          {pageText}
        </p>
        <div className="flex justify-center items-center mt-3 flex-wrap">
          {/* <MainButton link={twitterLink} icon={<FaTwitter />} text="Join us" />
          <MainButton link={discordLink} icon={<FaDiscord />} text="Join us" /> */}
          <Link href="/coming-soon">
            <button
              className={`link-button bg-white p-3 font-freckle w-150 text-center flex items-center justify-center text-border m-2 button-border px-10`}
            >
              <span className="text-2xl mr-1 button-text">
                <FaRegPaperPlane />
              </span>
              <span className="button-text">Check Whitelist</span>
            </button>
          </Link>
          <Link href="/mint">
            <button
              className={`link-button bg-white p-3 font-freckle w-150 text-center flex items-center justify-center text-border m-2 button-border px-10`}
            >
              <span className="text-2xl mr-1 button-text">
                <GrTransaction />
              </span>
              <span className="button-text">Go To Mint</span>
            </button>
          </Link>
        </div>
      </div>
      <FiendsFooter />
    </div>
  );
};

export default Landing;
