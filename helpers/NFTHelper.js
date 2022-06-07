import { formatUrl } from "../helpers/utils";
import { getContract } from "../helpers/Contract";
import axios from "axios";

export const getTokenUriById = async (contract, id) => {
  let tokenUri = await contract.methods.tokenURI(id).call();
  return tokenUri;
};

export const getMetadata = async (tokenUri) => {
  let formattedURI = formatUrl(tokenUri);
  let { data } = await axios.get(formattedURI);
  return data;
};

export const getTokensFromWallet = async (contract, account) => {
  let seInWallet = await contract.methods.walletOfOwner(account).call();
  return seInWallet;
};

export const getNFTData = async (provider, account, type) => {
  let dataArray = [];
  let contract = getContract(provider, type);
  let tokenIds = await getTokensFromWallet(contract, account);
  //this is temporary
  tokenIds = [1, 2, 3, 4, 5, 6, 7, 8];
  if (tokenIds.length === 0) return dataArray;
  for (const id of tokenIds) {
    let uri = await getTokenUriById(contract, id);
    dataArray.push(await getMetadata(uri));
  }
  let data = await Promise.all(dataArray);
  console.log(data);
  return data;
};

//NFT FUNCTIONS
export const getMetadataByURI = async (tokenUri) => {
  let url = formatUrl(tokenUri);
  console.log(url);
  let data = await axios.get(url);
  console.log(data);
  return data;
};

export const getMetadataById = async (contract, tokenId = 1) => {
  let n = await contract.methods.tokenURI(tokenId).call();
  let url = formatUrl(n);
  let data = await axios.get(
    formatUrl("ipfs://QmPwwwAmA5x8Zfhj3D8X8hUkQqctHYFkyU4ApgQ87PSPTG/14.json")
  );
  console.log(data);
  return data;
};
