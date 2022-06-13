import React, { useContext, useState, useEffect, useCallback } from "react";
import MintButton from "./MintButton";
import { UserContext } from "../context/UserContext";
import ProgressBar from "./ProgressBar";
import { FaMinus, FaPlus } from "react-icons/fa";
import toast from "./Toast";

const NFTMint = ({
  isLoading,
  mintFunction,
  fmFunction,
  mintCompletePercent,
  mintAmountLeft,
  maxMintAmount,
  isFreeMintEligible,
  isWhitelist,
}) => {
  const [mintingProgressText, setMintingProgressText] = useState(
    "The minting is in progess"
  );
  const [mintAmount, setMintAmount] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [amountMinted, setAmountMinted] = useState(0);
  const [isWhitelist, setIsWhitelist] = useState(true);
  const { user } = useContext(UserContext);

  const increment = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1);
    }
  };

  const decrement = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };

  useEffect(() => {
    console.log({ user });
    if (mintAmountLeft === 0) {
      setMintingProgressText("Minting Complete");
    } else {
      setAmountMinted(mintAmountLeft);
    }
  }, [mintAmountLeft, isFreeMintEligible]);

  return (
    <div className="flex flex-col font-inter content-line text-base lg:text-lg font-normal text-center w-full my-4 md:my-16 xl:mt-18 items-center px-4 md:py-8">
      <h1 className="font-freckle text-4xl md:text-5xl main-title-text-secondary mb-2">
        <b>YOU'RE ABOUT TO ENTER </b>
      </h1>
      <h1 className="font-freckle text-4xl md:text-5xl main-title-text-secondary ">
        <b>IN THE FAFZ UNIVERSE</b>
      </h1>
      <p className="my-3">
        You can mint up to {maxMintAmount} NFT MAX at 22 $FTM
      </p>

      <div className="flex justify-center items-center w-full">
        <div className="flex">
          <button
            className="text-2xl sm:ml-2 hover:shadow-xl duration-500 hover:text-white font-freckle text-border check-whitelist-btn button-border m-page-btn flex justify-center items-center"
            onClick={decrement}
          >
            <FaMinus />
          </button>
          <button className="text-3xl sm:ml-2 hover:shadow-xl duration-500 font-intern button-border  m-page-btn bg-purple">
            {mintAmount}
          </button>
          <button
            className="text-2xl sm:ml-2 hover:shadow-xl duration-500 hover:text-white font-freckle text-border check-whitelist-btn button-border m-page-btn flex justify-center items-center"
            onClick={increment}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <p className="my-8 w-11/12 md:w-10/12">
        <MintButton
          isLoading={isLoading}
          user={user}
          mintAmount={mintAmount}
          mintFunction={mintFunction}
          fmFunction={fmFunction}
          isFreeMintEligible={isFreeMintEligible}
          buttonText={isFreeMintEligible ? "Claim Free Mint" : "Mint"}
        />
      </p>
      {isFinished ? (
        <p className="text-intern text-base mb-2">
          Mint is complete! Head over to the view page to see your NFTs
        </p>
      ) : (
        <p className="text-intern text-base mb-2">
          {mintingProgressText} ({amountMinted} FAFz left)
        </p>
      )}
      <ProgressBar completed={mintCompletePercent} />
    </div>
  );
};

export default NFTMint;
