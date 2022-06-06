import Web3 from "web3";
import testNftABI from "../public/files/abi/testNftABI.json";
import SENftABI from "../public/files/abi/seNftABI.json";

const testNftContract = "0x725D2Cc0468510e5962b78cbc988CD50eF87F328";
const seNftContract = "0x657aA32E1e270e62EB32471c80dF091e855Ac362";

//types are fafz and se
const contractFactory = (type) => {
  let contract, abi;
  switch (type) {
    case "fafz":
      console.log("fafz");
      contract = testNftContract;
      abi = testNftABI;
      break;
    case "se":
      contract = seNftContract;
      abi = SENftABI;
      break;
    default:
      throw "No contract for this type";
  }
  return { contract, abi };
};

export const getContract = (provider, type) => {
  let web3 = new Web3(provider);
  let { contract, abi } = contractFactory(type);
  let NFTContract = new web3.eth.Contract(abi, contract);
  console.log(NFTContract);
  return NFTContract;
};
