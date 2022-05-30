import React, { useContext, useState } from "react";
import MintButton from "./MintButton";
import { UserContext } from "../context/UserContext";
import ProgressBar from "./ProgressBar";
import { FaMinus, FaPlus } from "react-icons/fa";

const NFTMint = ({ isLoading, mintFunction }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [amountMinted, setAmountMinted] = useState(220);
  const {
    account,
    chainId,
    provider,
    connectWallet,
    disconnectWallet,
    web3Modal,
  } = useContext(UserContext);

  const increment = () => {
    if (mintAmount < 3) {
      setMintAmount(mintAmount + 1);
    }
  };

  const decrement = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };

  const moralis = () => {
    console.log("moralis");
  };
  return (
    <div className="flex flex-col font-inter content-line text-base lg:text-lg font-normal text-center w-full my-4 md:my-16 xl:mt-18 items-center px-4">
      <h1 className="font-inter text-border text-lg md:text-3xl lg:text-4xl">
        <b>YOU'RE ABOUT TO ENTER IN THE FAFZ UNIVERSE</b>
      </h1>
      <p className="my-3">You can mint up to 5 NFT MAX at 30 $FTM</p>
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
          account={account}
          chainId={chainId}
          mintAmount={mintAmount}
          mintFunction={mintFunction}
        />
      </p>
      {isFinished ? (
        <p className="text-intern text-base">
          Mint is complete! Head over to the view page to see your NFTs
        </p>
      ) : (
        <p className="text-intern text-base">
          {" "}
          The minting is in progess ({amountMinted} FAFz left)
        </p>
      )}
      <ProgressBar completed={70} />
    </div>
  );
};

export default NFTMint;
