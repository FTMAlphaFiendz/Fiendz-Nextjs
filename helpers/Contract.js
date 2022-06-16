import Web3 from "web3";
import testNftABI from "../public/files/abi/testNftABI.json";
import SENftABI from "../public/files/abi/seNftABI.json";
import NFTKeyABI from "../public/files/abi/nftKeyABI.json";
import AstroKidABI from "../public/files/abi/astrokidABI.json";
import MainABI from "../public/files/abi/mainnetABI.json";
const testNftContract = "0x37e1880e9BECF4828e995fb323A99068c724C7b1";
const seNftContract = "0x657aA32E1e270e62EB32471c80dF091e855Ac362";
const nftKeyContract = "0x1A7d6ed890b6C284271AD27E7AbE8Fb5211D0739";
const astroKidsContract = "0x3d7E7157459A352ada13ed8dA1Ba54a08A883965";
const mainnetContract = "0xB183341A1FC7C851df05E01bf98EE683080B7e8C";

//types are fafz and se
const contractFactory = (type) => {
  let contract, abi;
  switch (type) {
    case "fafz":
      contract = mainnetContract;
      abi = MainABI;
      break;
    case "se":
      contract = seNftContract;
      abi = SENftABI;
      break;
    case "nftkey":
      contract = nftKeyContract;
      abi = NFTKeyABI;
      break;
    case "astrokid":
      contract = astroKidsContract;
      abi = AstroKidABI;
      break;
    case "test":
      contract = testNftContract;
      abi = testNftABI;
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
  return NFTContract;
};
