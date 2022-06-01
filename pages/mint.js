import React, { useContext, useEffect, useState, useCallback } from "react";
import NftPageViewWrapper from "../components/NftPageViewWrapper";
import Web3 from "web3";
import { UserContext } from "../context/UserContext";
import {
  getContract,
  mintNft,
  getMintProgress,
  getMintAmountLeft,
  getAndSetMintProgress,
  getAndSetMintAmountLeft,
} from "../helpers/MintHelper";
import NFTMint from "../components/NFTMint";

const Mint = () => {
  const [errorText, setErrorText] = useState("");
  const [mintAmountLeft, setMintAmountLeft] = useState(1111);
  const [mintCompletePercent, setMintCompletePercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [nftContract, setNftContract] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
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

  const mint = async (mintAmount) => {
    let web3;
    if (!nftContract) return;
    if (provider) web3 = new Web3(provider);
    console.log("CONTRACT METHODS", nftContract.methods);

    try {
      //getting balance
      let userCurrentBalance = await nftContract.methods
        .balanceOf(account)
        .call();
      console.log("balance", userCurrentBalance);

      //getting percent of mint completed
      let complete = await getMintProgress(nftContract);
      console.log("complete", complete);
      setMintCompletePercent(complete);

      //getting the amount left to mint
      let amountLeft = await getMintAmountLeft(nftContract);
      console.log("amountLeft", amountLeft);

      // let events = await nftContract.getPastEvents("Transfer", { fromBlock: 1 });
      // console.log(events);

      //SENDING THE TRANSACTION TO MINT
      let tx = await mintNft(
        account,
        nftContract,
        mintAmount,
        userCurrentBalance,
        web3
      );
      console.log("tx", tx);
    } catch (e) {
      notify("Error!", e.message);
    }

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
    if (account && provider) {
      let { Contract, contractAddress } = getContract(provider);
      setNftContract(Contract);
      setContractAddress(contractAddress);
      (async () => {
        //getting percent of mint completed and left to mint
        await getUIUpdates(Contract);
        //subscribing to transfer event from contract
        await listenAndUpdateByEvent(Contract);
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
