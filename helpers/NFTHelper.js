import { formatUrl } from "../helpers/utils";
import { getContract } from "../helpers/Contract";
import axios from "axios";
import Web3 from "web3";

const getWeb3 = (provider) => {
  return new Web3(provider);
};

export const getSEHolderCount = async (provider, account) => {
  let contract = getContract(provider, "se");
  let tokenCount = await contract.methods.walletOfOwner(account).call();
  tokenCount = [1];
  return tokenCount.length;
};

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
  let tokensInWallet = await contract.methods.walletOfOwner(account).call();
  return tokensInWallet;
};

export const getNFTData = async (provider, account, type) => {
  let dataArray = [];
  let contract = getContract(provider, type);
  let tokenIds = await getTokensFromWallet(contract, account);
  //this is temporary
  // tokenIds = [1, 2, 3, 4, 5, 6, 7, 8];
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
  let data = await axios.get(url);
  return data;
};

export const getMetadataById = async (
  contract,
  tokenId = 1,
  boughtPrice,
  blockNumber
) => {
  let n = await contract.methods.tokenURI(tokenId).call();
  let url = formatUrl(n);
  let data = await axios.get(url);
  if (boughtPrice) data["purchasedPrice"] = boughtPrice;
  if (blockNumber) data["blockNumber"] = blockNumber;
  return data;
};

export const getCurrentBlock = async (provider) => {
  let web3 = new Web3(provider);
  let currentBlock = await web3.eth.getBlock("latest");
  return currentBlock.number;
};

const getDataFromEvents = async (provider, contract, events) => {
  let web3 = getWeb3(provider);
  if (events.length === 0) throw "No events present";
  let promises = [];
  for (const event of events) {
    let boughtPrice = event.returnValues["3"].value;
    boughtPrice = web3.utils.fromWei(boughtPrice, "ether");
    let tokenId = event.returnValues["3"].tokenId;
    promises.push(
      await getMetadataById(contract, tokenId, boughtPrice, event.blockNumber)
    );
  }
  let data = await Promise.all(promises);
  return data;
};

export const getLastestBoughtFromNK = async (provider, maxLength = 15) => {
  //THIS WILL GET REPLACED WITH FAFZ
  let astrokids = "0x3d7E7157459A352ada13ed8dA1Ba54a08A883965";
  let asContract = getContract(provider, "astrokid");
  //THIS WILL GET REPLACED WITH FAFZ
  let currentBlock = await getCurrentBlock(provider);
  let fromBlock = currentBlock - 1000000;
  let nkContract = getContract(provider, "nftkey");
  let events = await nkContract.getPastEvents("TokenBought", {
    filter: { erc721Address: astrokids },
    fromBlock,
    toBlock: "latest",
  });
  events = events.reverse();
  events = events.slice(0, maxLength);
  let formattedData = await getDataFromEvents(provider, asContract, events);
  console.log({ formattedData });
};
