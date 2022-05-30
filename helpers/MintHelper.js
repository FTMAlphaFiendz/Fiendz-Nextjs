import Web3 from "web3";
import axios from "axios";
import testNftABI from "../public/files/abi/testNftABI.json";
// require("dotenv").config();

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
