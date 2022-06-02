import React from "react";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import MainButton from "./MainButton";

const WhiteListResult = ({ result, resetChecker }) => {
  const twitterLink = "https://twitter.com/FtmAlphaFiendz";
  const discordLink = "https://discord.gg/Cmq7H3hncc";
  const notWhitelistedResponse =
    "Follow our twitter and join discord " +
    "for opportunities to join the whitelist!";
  const whitelistedResponse =
    "Thanks for supporting us. We will regularly update our Twitter and " +
    "Discord. We have a lot of surprises for you!";

  return (
    <>
      {result ? (
        <>
          <div className="flex flex-col items-center whitelisted px-5 py-2 rounded">
            <h2 className="text-green-500 text-base md:text-lg font-inter">
              Congratulations this wallet is whitelisted!
            </h2>
            <p className="whitespace-pre-wrap keep-all text-sm md:text-base font-inter">
              {whitelistedResponse}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center non-whitelist px-5 w-full rounded">
            <h2 className="text-red-500 text-base md:text-lg font-inter">
              This wallet is not whitelisted yet!
            </h2>
            <p className="whitespace-pre-wrap keep-all text-sm md:text-base font-inter">
              {notWhitelistedResponse}
            </p>
            <div className="flex flex-wrap md:mt-2 justify-center">
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WhiteListResult;
