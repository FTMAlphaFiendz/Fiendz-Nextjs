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
  getRevertReason,
  noWhitelist,
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
  const [isWhitelist, setIsWhitelist] = useState(false);
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
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);
    console.log("CONTRACT METHODS", nftContract.methods);
    try {
      // let isPaused = await nftContract.methods.paused.call();
      // console.log({ isPaused });

      let isOnlyWhitelist = await getIsWhitelistOnly(nftContract);
      // isOnlyWhitelist = false;
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
      let tx = await mintNft(provider, nftContract, account, mintAmount, web3);
      notify("success", `Mint Successfully`);
      await checkingEligibility(provider, account);
      console.log({ tx });
    } catch (err) {
      await getErrorMessage(err, web3);
    }
    return;
  };

  const fmFunction = async (provider, account, mintAmount) => {
    let web3;
    console.log(account);
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);
    try {
      let tx = await fmNft(provider, account, nftContract, mintAmount, web3);
      console.log({ tx });
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
        console.log({ s });
      }
    } else {
      console.log("here");
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
    console.log("LISTENING......");
    contract.events.Transfer({}).on("data", async (event) => {
      if (event) {
        await getUIUpdates(contract);
      }
    });
  };

  useEffect(() => {
    if (user?.chainId) {
      let { provider, account, chainId } = user;
      if (chainId !== 4002) {
        notify("error", `Need to change network to Fantom`);
      } else {
        let Contract = getContract(provider, "fafz");
        setNftContract(Contract);
        (async () => {
          let isOnlyWhitelist = await getIsWhitelistOnly(Contract);
          setIsWhitelist(isOnlyWhitelist);
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
      console.log("mint use effect", { user });
    }
  }, [user]);

  useEffect(() => {
    console.log({ user });
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
        />
      </NftPageViewWrapper>
    </div>
  );
};

export default Mint;
