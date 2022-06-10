import React, { useContext, useEffect, useState, useCallback } from "react";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import Web3 from "web3";
import { UserContext } from "../context/UserContext";
import { getContract } from "../helpers/Contract";
import {
  mintNft,
  fmNft,
  getAndSetMintProgress,
  getAndSetMintAmountLeft,
  getIsWhitelistOnly,
  isAccountWhitelisted,
  getMaxMintAmount,
  checkEligibleFreeMint,
} from "../helpers/MintHelper";
import NFTMint from "../components/NFTMint";
import SEOMeta from "../components/SEOMeta";
import toast from "../components/Toast";

const SEOdesc = "Fantom Alpha Fiendz Mint Page";

const Mint = () => {
  const [mintAmountLeft, setMintAmountLeft] = useState(1111);
  const [mintCompletePercent, setMintCompletePercent] = useState(0);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [nftContract, setNftContract] = useState(null);
  const [isFreeMintEligible, setIsFreeMintEligible] = useState(false);
  const { account, chainId, provider } = useContext(UserContext);

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);

  const getUIUpdates = async (contract) => {
    await getAndSetMintAmountLeft(contract, setMintAmountLeft);
    await getAndSetMintProgress(contract, setMintCompletePercent);
  };

  const checkingEligibility = async (provider, account) => {
    let eligible = await checkEligibleFreeMint(provider, account);
    setIsFreeMintEligible(eligible);
    return eligible;
  };

  const mint = async (provider, mintAmount) => {
    let web3;
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);
    console.log("CONTRACT METHODS", nftContract.methods);
    console.log("HERE");
    try {
      let isOnlyWhitelist = await getIsWhitelistOnly(nftContract);
      isOnlyWhitelist = false;
      console.log({ isOnlyWhitelist });
      if (isOnlyWhitelist) {
        let isAccWhitelist = await isAccountWhitelisted(nftContract, account);
        console.log({ isAccWhitelist });
        if (!isAccWhitelist) {
          notify(
            "error",
            "This wallet is not whitelisted! Try with different wallet or wait for public sale"
          );
          return;
        }
      }
      let tx = await mintNft(provider, account, nftContract, mintAmount, web3);
      notify("success", `Mint Successfully`);
      await checkingEligibility(provider, account);
      console.log({ tx });
    } catch (e) {
      getErrorMessage(e);
    }
    return;
  };

  const fmFunction = async (provider, mintAmount) => {
    let web3;
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);
    try {
      let tx = await fmNft(provider, account, nftContract, mintAmount, web3);
      console.log({ tx });
      await checkingEligibility(provider, account);
    } catch (err) {
      getErrorMessage(e);
    }
  };

  const getErrorMessage = (e) => {
    let initIndex = e.message.search("{");
    if (initIndex > 0) {
      let finalIndex = e.message.length;
      let errorMessage = e.message.substring(initIndex, finalIndex);
      errorMessage = JSON.parse(errorMessage);
      let { message } = errorMessage;
      notify("error", message);
    } else {
      notify("error", e.message);
    }
  };

  const listenAndUpdateByEvent = async (contract) => {
    console.log("LISTENING......");
    contract.events.Transfer({}).on("data", async (event) => {
      if (event) {
        await getUIUpdates(contract);
      }
    });
  };

  useEffect(() => {
    if (chainId && chainId !== 4002) {
      notify("error", `Need to change network to Fantom`);
    } else {
      console.log("here??", chainId);
      if (account && provider) {
        let Contract = getContract(provider, "fafz");
        setNftContract(Contract);
        (async () => {
          let isEligible = await checkingEligibility(provider, account);
          console.log({ isEligible });
          // getting percent of mint completed and left to mint
          await getUIUpdates(Contract);
          //subscribing to transfer event from contract
          await listenAndUpdateByEvent(Contract);
          let mmAmount = await getMaxMintAmount(Contract);
          setMaxMintAmount(mmAmount);
        })();
      }
    }
  }, [account, provider, chainId]);

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  return (
    <div>
      <SEOMeta page="Mint" description={SEOdesc} path="/mint" />
      <NftPageViewWrapper>
        <NFTMint
          isFreeMintEligible={isFreeMintEligible}
          mintFunction={mint}
          maxMintAmount={maxMintAmount}
          mintCompletePercent={mintCompletePercent}
          mintAmountLeft={mintAmountLeft}
          fmFunction={fmFunction}
        />
      </NftPageViewWrapper>
    </div>
  );
};

export default Mint;
