import React, { useContext, useEffect, useState, useCallback } from "react";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import Web3 from "web3";
import { UserContext } from "../context/UserContext";
import { getContract } from "../helpers/Contract";
import { requestChainChange } from "../helpers/Web3Client";
import {
  mintNft,
  fmNft,
  getAndSetMintProgress,
  getAndSetMintAmountLeft,
  getIsWhitelistOnly,
  isAccountWhitelisted,
  getMaxMintAmount,
  checkEligibleFreeMint,
  getRevertReason,
} from "../helpers/MintHelper";
import NFTMint from "../components/NFTMint";
import SEOMeta from "../components/SEOMeta";
import toast from "../components/Toast";

const SEOdesc = "Fantom Alpha Fiendz Mint Page";

const Mint = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [mintAmountLeft, setMintAmountLeft] = useState(777);
  const [mintCompletePercent, setMintCompletePercent] = useState(0);
  const [maxMintAmount, setMaxMintAmount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [nftContract, setNftContract] = useState(null);
  const [isFreeMintEligible, setIsFreeMintEligible] = useState(false);
  const [isWhitelist, setIsWhitelist] = useState(false);
  const [isSuccessfulMint, setIsSuccessfulMint] = useState(false);
  const { user } = useContext(UserContext);

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

  const mint = async (provider, account, mintAmount) => {
    let web3;
    if (provider) web3 = new Web3(provider);
    let chainId = await web3.eth.getChainId();
    if (chainId !== 250) {
      notify("error", "Please connect to Fantom Mainnet and try again");
      return;
    }
    if (!nftContract) return;
    try {
      let isPaused = await nftContract.methods.paused().call();
      if (isPaused) {
        notify(
          "error",
          "Mint is not live yet, check back on June 17th @8pm UTC"
        );
        return;
      }
      let isOnlyWhitelist = await getIsWhitelistOnly(nftContract);
      if (isOnlyWhitelist) {
        let isAccWhitelist = await isAccountWhitelisted(nftContract, account);
        if (!isAccWhitelist) {
          notify(
            "error",
            "This wallet is not whitelisted! Try with different wallet or wait for public sale"
          );
          return;
        }
      }
      let tx = await mintNft(provider, nftContract, account, mintAmount, web3);
      notify("success", `Mint Successful`);
      setIsSuccessfulMint(true);
      await checkingEligibility(provider, account);
    } catch (err) {
      await getErrorMessage(err, web3);
    }
    return;
  };

  const fmFunction = async (provider, account, mintAmount) => {
    let web3;
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);
    try {
      let tx = await fmNft(provider, account, nftContract, mintAmount, web3);
      await checkingEligibility(provider, account);
    } catch (err) {
      await getErrorMessage(err, web3);
    }
  };

  const getErrorMessage = async (err, web3) => {
    let message;
    if (!err.hasOwnProperty("receipt")) {
      if (err.message) {
        message = err.message;
      } else {
        let s = JSON.parse(JSON.stringify(err));
      }
    } else {
      let { transactionHash, blockNumber } = err.receipt;
      let e = await getRevertReason(transactionHash, blockNumber, web3);
      let initIndex = e.message.search("{");
      if (initIndex > 0) {
        let finalIndex = e.message.length;
        let errorMessage = e.message.substring(initIndex, finalIndex);
        errorMessage = JSON.parse(errorMessage);
        message = errorMessage.message;
      } else {
        message = e.message;
      }
    }
    notify("error", message);
    return;
  };

  const listenAndUpdateByEvent = async (contract) => {
    contract.events.Transfer({}).on("data", async (event) => {
      if (event) {
        await getUIUpdates(contract);
      }
    });
  };

  useEffect(() => {
    if (user?.chainId) {
      let { provider, account, chainId } = user;
      if (chainId !== 250) {
        requestChainChange(provider);
      } else {
        let Contract = getContract(provider, "fafz");
        setNftContract(Contract);
        (async () => {
          let paused = await Contract.methods.paused().call();
          setIsPaused(paused);
          let isOnlyWhitelist = await getIsWhitelistOnly(Contract);
          setIsWhitelist(isOnlyWhitelist);
          let isEligible = await checkingEligibility(provider, account);
          setIsFreeMintEligible(isEligible);
          // getting percent of mint completed and left to mint
          await getUIUpdates(Contract);
          //subscribing to transfer event from contract
          await listenAndUpdateByEvent(Contract);
          let mmAmount = await getMaxMintAmount(Contract);
          setMaxMintAmount(mmAmount);
        })();
      }
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  return (
    <div>
      <SEOMeta page="Mint" description={SEOdesc} path="/mint" />
      <NftPageViewWrapper>
        <NFTMint
          isLoading={isLoading}
          isFreeMintEligible={isFreeMintEligible}
          mintFunction={mint}
          maxMintAmount={maxMintAmount}
          mintCompletePercent={mintCompletePercent}
          mintAmountLeft={mintAmountLeft}
          fmFunction={fmFunction}
          isWhitelist={isWhitelist}
          isPaused={isPaused}
          isSuccessfulMint={isSuccessfulMint}
        />
      </NftPageViewWrapper>
    </div>
  );
};

export default Mint;
