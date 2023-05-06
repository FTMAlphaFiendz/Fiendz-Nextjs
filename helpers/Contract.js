import testNftABI from "../public/files/abi/testNftABI.json";
import SENftABI from "../public/files/abi/seNftABI.json";
import NFTKeyABI from "../public/files/abi/nftKeyABI.json";
import CampfireABI from "../public/files/abi/campfireABI.json";
import MainABI from "../public/files/abi/mainnetABI.json";
const testNftContract = "0x37e1880e9BECF4828e995fb323A99068c724C7b1";
const seNftContract = "0x657aA32E1e270e62EB32471c80dF091e855Ac362";
const nftKeyContract = "0x1A7d6ed890b6C284271AD27E7AbE8Fb5211D0739";
const campfireContract = "0x3f4301e574d0484fa138D933578d200f23c3E4b0";
const mainnetContract = "0xB183341A1FC7C851df05E01bf98EE683080B7e8C";
const fantomNode =
  "wss://ws-nd-186-579-089.p2pify.com/f44c3c1903cce504f0fc063e7b6c502e";
import { ethers } from "ethers";

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
    case "test":
      contract = testNftContract;
      abi = testNftABI;
      break;
    case "campfire":
      contract = campfireContract;
      abi = CampfireABI;
      break;
    default:
      throw "No contract for this type";
  }
  return { contract, abi };
};

export const getContract = (provider, type) => {
  provider = new ethers.providers.WebSocketProvider(fantomNode);
  let { contract, abi } = contractFactory(type);
  let NFTContract = new ethers.Contract(
    contract,
    abi,
    provider.getSigner("0x3aA0C22B6B98cE3b1a3229244c99140D50D4A832")
  );
  return NFTContract;
};
