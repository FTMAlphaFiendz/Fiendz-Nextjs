import React, { useContext, useEffect, useState } from "react";
import logoBig from "../public/images/titles/logo-big-v2.png";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import dynamic from "next/dynamic";
import Web3 from "web3";
import { UserContext } from "../context/UserContext";
import {
  getContract,
  mintNft,
  getMetadataById,
  getMetadataByURI,
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
  const [viewStatus, setViewStatus] = useState("mint");
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

  let testData = {
    attributes: [
      {
        trait_type: "Background",
        value: "bg1",
      },
      {},
      {
        trait_type: "Body",
        value: "blue",
      },
      {
        trait_type: "Clothes",
        value: "hoodie4",
      },
      {
        trait_type: "Eyes",
        value: "eyes9",
      },
      {
        trait_type: "Hat",
        value: "samurai1",
      },
      {
        trait_type: "Mouth",
        value: "mustache3",
      },
    ],
    compiler: "HashLips Art Engine",
    date: 1650575901515,
    description: "I wonder if Vinny will catch this.",
    dna: "686f440fced224f9e8202efc6718e503b0d938a3",
    edition: 14,
    image:
      "https://gateway.pinata.cloud/ipfs/QmUVCvZfz3mEZ8xf2ATR1eJET4KjhfbT5sHHwZq6vhM5Fb/14.png",
    name: "Fantom Alpha Fiendz #14",
  };

  const mint = async (mintAmount) => {
    let web3;
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);

    console.log("CONTRACT METHODS", nftContract.methods);
    let d = await (await web3.eth.getBlock("latest")).gasLimit;
    console.log(d);
    return;
    //GETTING BALANCE
    // let balance = await nftContract.methods.balanceOf(account).call();
    // console.log(balance);

    //SENDING THE TRANSACTION TO MINT
    let tx = await mintNft(account, nftContract, mintAmount, web3);
    console.log(tx);
  };

  useEffect(() => {
    if (account && provider) {
      let { Contract, contractAddress } = getContract(provider);
      setNftContract(Contract);
      setContractAddress(contractAddress);
    }
  }, [account, provider, chainId]);

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  return (
    <div>
      <NftPageViewWrapper>
        <NFTMint />
      </NftPageViewWrapper>
    </div>
  );
};

export default Mint;
