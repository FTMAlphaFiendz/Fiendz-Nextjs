import Web3 from "web3";
import axios from "axios";
import testNftABI from "../public/files/abi/testNftABI.json";

const maxWalletAmount = 5;
const testNftContract = "0x725D2Cc0468510e5962b78cbc988CD50eF87F328";

export const getContract = (provider) => {
  // const testNftABI = require("../helpers/abi/testNftABI.json");
  let web3 = new Web3(provider);
  let Contract = new web3.eth.Contract(testNftABI, testNftContract);
  return { Contract, contractAddress: testNftContract };
};

export const mintNft = async (
  account,
  contract,
  mintAmount,
  userCurrentBalance,
  web3
) => {
  //getting cost
  let cost = await contract.methods.cost().call();
  console.log("Mint Amount", mintAmount);
  //calc mint const
  let mintCost = cost * mintAmount;
  let calcCost = web3.utils.fromWei(cost, "ether");

  //checking max wallet mint
  //NEED TO SET THIS FOR WHITELIST ONLY
  let maxMint = await contract.methods.maxMintAmount().call();
  // if (maxMint + userCurrentBalance > maxMint) {
  //   console.log("The amount you are trying to mint exceeds max wallet limits");
  //   return;
  // }
  //getting mint cost in ether
  //checking transaction amount from wallet
  const nonce = await web3.eth.getTransactionCount(account, "latest");
  console.log(mintCost);
  //setting params
  let params = {
    from: account,
    value: web3.utils.toWei(calcCost, "ether"),
    nonce: nonce,
  };
  //sending transaction
  let tx = await contract.methods.mint(calcCost).send(params);
  return tx;
};

export const getMetadataById = async (contract, tokenId = 1) => {
  let n = await contract.methods.tokenURI(tokenId).call();
  console.log(n);
  let url = formatUrl(n);
  console.log(url);
  let data = await axios.get(
    formatUrl("ipfs://QmPwwwAmA5x8Zfhj3D8X8hUkQqctHYFkyU4ApgQ87PSPTG/14.json")
  );
  console.log(data);
  return data;
};

export const isAtWalletMax = async (contract, account) => {
  let balance = await contract.methods.balanceOf(account).call();
  return balance > maxWalletAmount;
};

export const getTotalandMaxSupply = async (contract) => {
  let totalSupply = await contract.methods.totalSupply().call();
  let maxSupply = await contract.methods.MAX_SUPPLY().call();
  return { totalSupply, maxSupply };
};

export const getMintProgress = async (contract) => {
  let { totalSupply, maxSupply } = await getTotalandMaxSupply(contract);
  if (totalSupply === maxSupply) {
    return 100;
  } else {
    let percentDone = (totalSupply / maxSupply) * 100;
    return Math.ceil(percentDone);
  }
};

export const getMintAmountLeft = async (contract) => {
  let { totalSupply, maxSupply } = await getTotalandMaxSupply(contract);
  return maxSupply - totalSupply;
};

export const getMetadataByURI = async (tokenUri) => {
  let url = formatUrl(tokenUri);
  console.log(url);
  let data = await axios.get(url);
  console.log(data);
  return data;
};

export const formatUrl = (tokenURI) => {
  return tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
};

export const listenToContractTransfer = async (contract) => {
  contract.events.Transfer({}).on("data", (event) => {
    console.log("in mint helper", event);
  });
};

export const getAndSetMintProgress = async (
  contract,
  setMintCompletePercent
) => {
  let complete = await getMintProgress(contract);
  setMintCompletePercent(complete);
};

export const getAndSetMintAmountLeft = async (contract, setMintAmountLeft) => {
  let amountLeft = await getMintAmountLeft(contract);
  setMintAmountLeft(amountLeft);
};
