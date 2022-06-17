import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";
import Waves from "../components/Waves";
import { UserContext } from "../context/UserContext";
import WhiteListButton from "../components/WhiteListButton";
import WhiteListResult from "../components/WhiteListResult";
import WAGMI from "../public/images/coming-soon/fafz-wgmi.png";
import diamond from "../public/images/coming-soon/ftm-diamond.png";
import ghost from "../public/images/coming-soon/ghost.png";
import planet from "../public/images/coming-soon/planet.png";
import whitelist from "../public/files/FAFz_WL.json";
import SEOMeta from "../components/SEOMeta";
import { isAccountWhitelisted } from "../helpers/MintHelper";

const SEOdesc =
  "Check you whitelist status on this page for the upcoming FAFZ Mint. Mint Date TBA";

export const getStaticProps = async () => {
  let ids = whitelist.ids;
  return {
    props: { ids },
  };
};

const ComingSoon = ({ ids }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [whiteListResult, setWhiteListResult] = useState(false);
  const content =
    "Thanks for stopping by, make sure to check back frequently, mint will be open in the near future!";
  const { user, connectWallet } = useContext(UserContext);

  const checkJson = (account) => {
    let result = ids.find((id) => id === account);
    if (!result) {
      return false;
    } else {
      return true;
    }
  };

  const checkWhitelist = async (account, chainId, provider) => {
    //if no account then connect wallet and exit
    if (!account) {
      await connectWallet();
      return;
    }
    //if the chain is not fantom then exit
    if (chainId !== 250) return;
    setIsLoading(true);
    (async () => {
      let isAccWhitelisted = await isAccountWhitelisted(
        null,
        account,
        provider
      );
      setWhiteListResult(isAccWhitelisted);
      setIsResult(true);
    })();
  };

  const resetChecker = () => {
    setIsResult(false);
    setWhiteListResult(false);
  };

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  useEffect(() => {
    if (!user?.account) {
      resetChecker();
    }
  }, [user]);

  return (
    <div
      id="main"
      className={`flex flex-col mx-auto h-full w-full justify-center place-items-center coming-soon-bg relative overflow-hidden`}
    >
      <SEOMeta page="Whitelist" description={SEOdesc} path="/coming-soon" />
      <div className="cs-image cs-wagmi hidden md:block">
        <Image src={WAGMI} alt="wagmi fiend" />
      </div>
      <div className="cs-image cs-planet hidden md:block">
        <Image src={planet} alt="planet from outerspace" />
      </div>
      <div className="cs-image cs-diamond hidden md:block">
        <Image src={diamond} alt="diamond" />
      </div>
      <div className="cs-image cs-ghost hidden md:block">
        <Image src={ghost} alt="ghost" />
      </div>

      <Waves fillColor="#fedf87" />
      <div className="fiendz-card-container w-5/6 md:w-7/12 lg:m-3 relative justify-center mt-16 flex flex-col bg-white items-center pt-10 lg:w-8/12">
        <h1 className="font-freckle text-4xl md:text-6xl main-title-text-secondary text-center">
          MINT IS COMING SOON
        </h1>
        <div className="flex flex-col font-inter content-line text-base sm:text-lg md:text-xl font-normal text-center w-full my-4 md:my-10 xl:mt-18 items-center px-4">
          <p className="mb-8 w-11/12 md:w-10/12">{content}</p>
          {isResult ? (
            <WhiteListResult
              result={whiteListResult}
              resetChecker={resetChecker}
            />
          ) : (
            <WhiteListButton
              isLoading={isLoading}
              account={user?.account}
              chainId={user?.chainId}
              checkWhitelist={() =>
                checkWhitelist(user?.account, user?.chainId, user?.provider)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
