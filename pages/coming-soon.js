import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";
import Div100vh from "react-div-100vh";
import Waves from "../components/Waves";
import logoBig from "../public/images/titles/logo-big.png";
import { UserContext } from "../context/UserContext";
import WhiteListButton from "../components/WhiteListButton";
import WhiteListResult from "../components/WhiteListResult";
// import { ids } from "../config/whitelist.json";
import WAGMI from "../public/images/coming-soon/fafz-wgmi.png";
import diamond from "../public/images/coming-soon/ftm-diamond.png";
import ghost from "../public/images/coming-soon/ghost.png";
import planet from "../public/images/coming-soon/planet.png";
import whitelist from "../public/files/FAFz_WL.json";
import SEOMeta from "../components/SEOMeta";

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
  const { account, chainId, provider, connectWallet } = useContext(UserContext);

  const checkJson = (account) => {
    let result = ids.find((id) => id === account);
    if (!result) {
      return false;
    } else {
      return true;
    }
  };

  const checkWhitelist = async (account, chainId) => {
    //if no account then connect wallet and exit
    if (!account) {
      await connectWallet();
      return;
    }
    //if the chain is not fantom then exit
    if (chainId !== 250) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      //checking array and getting result
      setWhiteListResult(checkJson(account));
      //after getting the result from checking the whitelist array
      setIsResult(true);
    }, "2000");
  };

  const resetChecker = () => {
    setIsResult(false);
    setWhiteListResult(false);
  };

  useEffect(() => {
    if (!account) {
      resetChecker();
    }
  }, [account]);

  return (
    <Div100vh>
      <SEOMeta page="Whitelist" description={SEOdesc} path="/coming-soon" />
      <div
        id="main"
        className={`flex flex-col mx-auto h-full w-full justify-center place-items-center coming-soon-bg relative overflow-hidden`}
      >
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
        <div className="fiendz-card-container w-50 md:w-7/12 lg:m-3 relative justify-center mt-16 flex flex-col bg-white items-center pt-10 lg:w-8/12">
          <h1 className="font-freckle text-4xl md:text-6xl main-title-text">
            Fantom{" "}
            <span className="main-title-text-secondary">Alpha Fiendz</span>
          </h1>
          <div className="flex flex-col font-inter content-line text-base sm:text-lg md:text-xl font-normal text-center w-full my-4 md:my-10 xl:mt-18 items-center px-4">
            <h1 className="font-freckle text-border text-xl md:text-2xl md:text-4xl lg:text-6xl">
              <b>MINT IS COMING SOON</b>
            </h1>
            <p className="my-8 w-11/12 md:w-10/12">{content}</p>
            {isResult ? (
              <WhiteListResult
                result={whiteListResult}
                resetChecker={resetChecker}
              />
            ) : (
              <WhiteListButton
                isLoading={isLoading}
                account={account}
                chainId={chainId}
                checkWhitelist={() => checkWhitelist(account, chainId)}
              />
            )}
          </div>
        </div>
      </div>
    </Div100vh>
  );
};

export default ComingSoon;
