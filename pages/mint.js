import React, { useContext, useEffect, useState } from "react";
import logoBig from "../images/titles/logo-big-v2.png";
import Web3 from "web3";
import { UserContext } from "../context/UserContext";
import {
  getContract,
  mintNft,
  getMetadataById,
  getMetadataByURI,
} from "../helpers/MintHelper";
import { initMoralis, getUserNFTs } from "../helpers/Moralis";
import Moralis from "moralis";
import Waves from "../components/Waves";
import favicon from "../public/images/favicon/favicon-mint.ico";
import smallLogo from "../public/images/titles/logo-small-v2.png";
import MintButton from "../components/MintButton";
import NFTMint from "../components/NFTMint";
import NFTView from "../components/NFTView";

const Mint = () => {
  const [viewStatus, setViewStatus] = useState("mint");
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [nftContract, setNftContract] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [userNfts, setUserNfts] = useState("");
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

  const moralis = async (searchQuery) => {
    let web3;
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);

    initMoralis();
    //temp here
    let chain = "0xfa";

    let options = {
      q: searchQuery || "bored",
      chain: chain,
      filter: "name",
      limit: "30",
    };

    // 6.3. Get the search results
    let NFTs = await Moralis.Web3API.token.searchNFTs(options);
    console.log(NFTs);
    let nftAddress = "0x182Bb65f3d3787E2C6fCCFB98D051a21AB1D85cc";
    let options2 = {
      address: account,
      token_address: nftAddress,
      limit: "10",
      chain: chain,
    };
    const userfts = await Moralis.Web3API.account.getNFTs(options2);
  };

  const getAllNfts = async () => {
    let nfts = await getUserNFTs(
      "0xBc83cae02389fe6A719C49BbEA5f8bEc795c1147",
      account,
      chainId
    );
    setUserNfts(nfts.result);
  };

  const viewChange = (view) => {
    setViewStatus(view);
  };

  useEffect(() => {
    if (account && provider) {
      setIsActive(true);
      let { Contract, contractAddress } = getContract(provider);
      setNftContract(Contract);
      setContractAddress(contractAddress);
      initMoralis();
      getAllNfts();
    }
  }, [account, provider, chainId]);

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  return (
    // <Div100vh>
    <div className="mint-page relative md:flex">
      <Waves fillColor="#fedf87" className="editorial-fixed" />
      <div
        id="main"
        className={`flex flex-col mx-auto h-full w-full justify-center place-items-center `}
      >
        <div className="fiendz-card-container w-50 md:w-5/6 lg:m-3 w-5/6 relative justify-center my-24 flex flex-col bg-white items-center pt-10 lg:w-8/12">
          <header className="w-full absolute -top-0 md:-top-8 bg-titleBg bg-contain bg-no-repeat bg-center p-3 flex justify-center items-center">
            <h1
              className={`font-freckle text-border text-xl md:text-2xl md:text-4xl lg:text-6xl cursor-pointer ${
                viewStatus === "mint" ? "page-title" : "page-title-inactive"
              }`}
              onClick={() => viewChange("mint")}
            >
              Mint
            </h1>
            <span className="font-freckle text-border text-xl md:text-2xl md:text-4xl lg:text-6xl px-4 page-title">
              |
            </span>
            <h1
              className={`font-freckle text-border text-xl md:text-2xl md:text-4xl lg:text-6xl cursor-pointer ${
                viewStatus === "view" ? "page-title" : "page-title-inactive"
              }`}
              onClick={() => viewChange("view")}
            >
              View
            </h1>
          </header>
          {viewStatus === "mint" ? (
            <NFTMint mintFunction={mint} />
          ) : (
            <NFTView nfts={userNfts} />
          )}
        </div>
      </div>
    </div>
    // </Div100vh>
  );
};

export default Mint;
