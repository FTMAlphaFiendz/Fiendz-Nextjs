import React, { useContext, useState } from "react";
import MintButton from "./MintButton";
import { UserContext } from "../context/UserContext";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const NFTMint = ({ isLoading, mintFunction }) => {
  const [mintAmount, setMintAmount] = useState(1);
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
    <div className="flex flex-col font-inter content-line text-base lg:text-lg font-normal text-center w-full my-4 md:my-10 xl:mt-18 items-center px-4">
      <h1 className="font-freckle text-border text-xl md:text-2xl md:text-4xl lg:text-6xl">
        <b>MINT!</b>
      </h1>
      <div className="flex justify-center items-center">
        <div
          className="font-freckle text-border text-lg md:text-xl md:text-3xl lg:text-6xl cursor-pointer page-title"
          onClick={decrement}
        >
          <IoIosArrowDown />
        </div>
        <span className="font-freckle text-border text-xl md:text-2xl md:text-4xl lg:text-6xl page-title px-5 my-2">
          {mintAmount}
        </span>
        <div
          className="font-freckle text-border text-lg md:text-xl md:text-3xl lg:text-6xl cursor-pointer page-title"
          onClick={increment}
        >
          <IoIosArrowUp />
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
    </div>
  );
};

export default NFTMint;
