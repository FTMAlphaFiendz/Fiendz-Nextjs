import Web3 from "web3";
import axios from "axios";
import testNftABI from "../public/files/abi/testNftABI.json";

const maxWalletAmount = 5;

export const getContract = (provider) => {
  const testNftContract = "0x725D2Cc0468510e5962b78cbc988CD50eF87F328";
  // const testNftABI = require("../helpers/abi/testNftABI.json");
  let web3 = new Web3(provider);
  let Contract = new web3.eth.Contract(testNftABI, testNftContract);
  return { Contract, contractAddress: testNftContract };
};

export const mintNft = async (account, contract, mintAmount, web3) => {
  let cost = await contract.methods.cost().call();
  let f = web3.utils.fromWei(cost, "ether");
  console.log("Mint Amount", mintAmount);
  let tx = await contract.methods
    .mint(mintAmount)
    .send({ from: account, value: web3.utils.toWei(f, "ether") });
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
