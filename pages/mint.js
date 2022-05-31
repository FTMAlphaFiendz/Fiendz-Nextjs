import React, { useContext, useEffect, useState } from "react";
import logoBig from "../public/images/titles/logo-big-v2.png";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import dynamic from "next/dynamic";
import Web3 from "web3";
import { UserContext } from "../context/UserContext";
import {
  getContract,
  mintNft,
  isAtWalletMax,
  getMintProgress,
  getMintAmountLeft,
} from "../helpers/MintHelper";
// import { initMoralis, getUserNFTs } from "../helpers/Moralis";
// import Moralis from "moralis";
import Waves from "../components/Waves";
import favicon from "../public/images/favicon/favicon-mint.ico";
import smallLogo from "../public/images/titles/logo-small-v2.png";
import MintButton from "../components/MintButton";
import NFTMint from "../components/NFTMint";
import NFTView from "../components/NFTView";
import Modal from "../components/Modal";

const Mint = ({ price }) => {
  const [errorText, setErrorText] = useState("");
  const [mintAmountLeft, setMintAmountLeft] = useState(1111);
  const [mintCompletePercent, setMintCompletePercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [nftContract, setNftContract] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const {
    account,
    chainId,
    provider,
    connectWallet,
    disconnectWallet,
    web3Modal,
  } = useContext(UserContext);

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  const mint = async (mintAmount) => {
    let web3;
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);
    console.log(process.env.NEXT_PUBLIC_TEST_ENV);
    console.log("CONTRACT METHODS", nftContract.methods);

    //getting balance
    let balance = await nftContract.methods.balanceOf(account).call();
    console.log("balance", balance);

    //getting percent of mint completed
    let complete = await getMintProgress(nftContract);
    console.log("complete", complete);
    setMintCompletePercent(complete);

    //getting the amount left to mint
    let amountLeft = await getMintAmountLeft(nftContract);
    console.log("amountLeft", amountLeft);

    //checking if wallet is at max for collection
    let isMax = await isAtWalletMax(nftContract, account);
    if (isMax) {
      setErrorText("This wallet is at max for this collection");
      //this will return right here
    }

    let events = await nftContract.getPastEvents("allEvents", { fromBlock: 1 });
    console.log(events);
    return;
    //SENDING THE TRANSACTION TO MINT
    let tx = await mintNft(account, nftContract, mintAmount, web3);
    console.log(tx);
    return;
  };

  useEffect(() => {
    if (account && provider) {
      let { Contract, contractAddress } = getContract(provider);
      setNftContract(Contract);
      setContractAddress(contractAddress);
      (async () => {
        //getting percent of mint completed
        let complete = await getMintProgress(Contract);
        setMintCompletePercent(complete);
        //getting the amount left to mint
        let amountLeft = await getMintAmountLeft(Contract);
        setMintAmountLeft(amountLeft);
      })();
    }
  }, [account, provider, chainId]);

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  return (
    <div>
      <NftPageViewWrapper>
        <NFTMint
          mintFunction={mint}
          mintCompletePercent={mintCompletePercent}
          mintAmountLeft={mintAmountLeft}
        />
      </NftPageViewWrapper>
    </div>
  );
};

export default Mint;
