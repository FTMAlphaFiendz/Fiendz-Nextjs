import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logoBig from "../../public/images/titles/logo-big.png";
import { FaTwitter, FaDiscord, FaRegPaperPlane } from "react-icons/fa";
import { GrTransaction, GrView } from "react-icons/gr";
import { IconContext } from "react-icons";
import MainButton from "../MainButton";
import Waves from "../Waves";
import FiendsFooter from "../FiendsFooter";
import { motion } from "framer-motion";

const twitterLink = "https://twitter.com/FtmAlphaFiendz";
const discordLink = "https://discord.gg/Cmq7H3hncc";
const mediumLink =
  "https://medium.com/@timecop0487/ftm-alpha-fiendz-de1acf053ea4";
const pageText =
  "We are building the biggest community on the FTM Network and " +
  "for that we need your help. We are offering the FAFz Collection " +
  "to the community that will help us build our project and give exclusive and unique perks to the holders.";

const Landing = () => {
  return (
    <div
      id="main"
      className={`flex flex-col mx-auto h-full w-full justify-center place-items-center landing-background relative`}
    >
      <Waves fillColor="#fedf87" />
      <motion.header
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-3 flex justify-center"
      >
        <div className="main-title lg:w-1/2 md:mt-10 2xl:mt-0">
          <img src="/images/titles/logo-big.png" alt="Alpha Fiendz Logo Big" />
        </div>
        <h1 className="hidden">FTM Alpha Fiendz</h1>
      </motion.header>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="flex flex-col justify-center w-10/12 lg:w-8/12 lg:w-1/2 lg:mb-20 "
      >
        <p className="text-center font-inter text-base sm:text-lg md:text-xl font-normal my-3 content-line">
          {pageText}
        </p>
        <IconContext.Provider
          value={{
            style: {
              color: "#1d1f91",
            },
          }}
        >
          <div className="flex justify-center items-center mt-3 flex-wrap">
            <MainButton
              link={twitterLink}
              icon={<FaTwitter />}
              text="Join us"
            />
            <MainButton
              link={discordLink}
              icon={<FaDiscord />}
              text="Join us"
            />
            <Link href="/view">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`link-button bg-white p-3 font-freckle w-[150px] text-center flex items-center justify-center text-border m-2 button-border px-10`}
              >
                <span className="text-2xl mr-1 ">
                  <GrView />
                </span>
                <span className="">NFTs</span>
              </motion.button>
            </Link>
            <Link href="/view">
              <motion.a
                href="https://dynamic-nft-steel.vercel.app/"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`link-button bg-white p-3 font-freckle w-[150px] text-center flex items-center justify-center text-border m-2 button-border px-10`}
              >
                <span className="">Customizer</span>
              </motion.a>
            </Link>
          </div>
        </IconContext.Provider>
      </motion.div>
      <FiendsFooter />
    </div>
  );
};

export default Landing;
