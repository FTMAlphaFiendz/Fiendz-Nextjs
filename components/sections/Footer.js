import React from "react";
import MainButton from "../MainButton";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { SiNotion } from "react-icons/si";

const twitterLink = "https://twitter.com/FtmAlphaFiendz";
const discordLink = "https://discord.gg/Cmq7H3hncc";
const notionLink =
  "https://nebulous-spy-2ae.notion.site/Fiendz-Update-e513d65db0d64047aff197ccaf26e3fb";

const Footer = () => {
  return (
    <div
      id="team"
      className="flex flex-col mx-auto h-full w-full justify-center items-center md:place-items-center min-h-full footer-bg relative p-10 "
    >
      <div className="flex flex-wrap justify-center items-center mt-3">
        <MainButton link={twitterLink} icon={<FaTwitter />} text="Join us" />
        <MainButton link={discordLink} icon={<FaDiscord />} text="Join us" />
        <MainButton link={notionLink} icon={<SiNotion />} text="Read this" />
      </div>
      <p className="mt-3 font-inter text-xs md:text-lg">
        Copyright | Fantom Alpha Fiendz | All rights reserved
      </p>
    </div>
  );
};

export default Footer;
