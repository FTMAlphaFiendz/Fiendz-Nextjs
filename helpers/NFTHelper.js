import { formatUrl } from "../helpers/utils";
import { getContract } from "../helpers/Contract";
import { formatName } from "../helpers/utils";
import axios from "axios";
import Web3 from "web3";
const fantomNode =
  "wss://speedy-nodes-nyc.moralis.io/e8a15a63a7fefd85da1d8ebe/fantom/mainnet/ws";

const getWeb3 = (provider) => {
  return new Web3(provider);
};

export const getSEHolderCount = async (provider, account) => {
  let contract = getContract(provider, "se");
  let tokenCount = await contract.methods.walletOfOwner(account).call();
  return tokenCount.length;
};

export const getTokenUriById = async (contract, id) => {
  let tokenUri = await contract.methods.tokenURI(id).call();
  return tokenUri;
};

export const getMetadata = async (tokenUri, rarityMap, type) => {
  let totalRarity = 0;
  let { data } = await axios.get(tokenUri);
  data.name = formatName(data.name);
  if (data.hasOwnProperty("attributes")) {
    for (const attribute of data.attributes) {
      let traitType = attribute.trait_type;
      let traitValue = attribute.value;
      if (rarityMap[`${traitType}`]) {
        if (rarityMap[`${traitType}`].hasOwnProperty(traitValue)) {
          attribute.rarityPercent =
            rarityMap[`${traitType}`][`${traitValue}`].rarityPercent;
        }
      }
      if (attribute.hasOwnProperty("trait_type")) {
        attribute.trait_type = traitType.replace("_", "");
      }
      if (attribute.hasOwnProperty("value")) {
        attribute.value = attribute.value.replaceAll("_", " ");
      }
      totalRarity += attribute.rarityPercent;
    }
    let { rarityStatus, walletScore, rarityBg, sortIndex } =
      getFAFzRarityStatus(totalRarity);
    data.rarityStatus = rarityStatus;
    data.walletScore = walletScore;
    data.rarityBackground = rarityBg;
    data.sortIndex = sortIndex;
  } else if (!data.hasOwnProperty("attributes") && type === "se") {
    data.attributes = [
      {
        trait_type: "Special Edition",
        value: "Special Edition",
      },
    ];
    data.rarityBackground = "#fee235";
    data.rarityStatus = "Legendary";
    data.walletScore = 2250;
    data.sortIndex = 0;
  }
  return data;
};

export const getFAFzRarityStatus = (totalRarity) => {
  let rarityStatus, walletScore, rarityBg, sortIndex;
  if (totalRarity > 0 && totalRarity <= 1) {
    rarityStatus = "Legendary";
    walletScore = 2250;
    rarityBg = "#fee235";
    sortIndex = 0;
  } else if (totalRarity > 1 && totalRarity <= 24) {
    rarityStatus = "Epic";
    walletScore = 750;
    rarityBg = "#bbb2ff";
    sortIndex = 1;
  } else if (totalRarity > 24 && totalRarity <= 67) {
    rarityStatus = "Rare";
    walletScore = 250;
    rarityBg = "#fdb077";
    sortIndex = 2;
  } else if (totalRarity > 67 && totalRarity <= 78) {
    rarityStatus = "Common";
    walletScore = 100;
    rarityBg = "#92e8fd";
    sortIndex = 3;
  } else {
    throw "Rarity does not exist";
  }
  return { rarityStatus, walletScore, rarityBg, sortIndex };
};

export const getTokensFromWallet = async (contract, account) => {
  let tokensInWallet = await contract.methods.walletOfOwner(account).call();
  return tokensInWallet;
};

export const getNFTData = async (provider, account, type, rarityMap) => {
  let dataArray = [];
  let contract = getContract(provider, type);
  let tokenIds = await getTokensFromWallet(contract, account);
  if (tokenIds.length === 0) return dataArray;
  for (const id of tokenIds) {
    let uri = await getTokenUriById(contract, id);
    dataArray.push(await getMetadata(uri, rarityMap, type));
  }
  let data = await Promise.all(dataArray);
  return data;
};

const getTotalWalletScore = (data) => {
  let totalWalletScore = 0;
  for (const d of data) {
    totalWalletScore += d.walletScore;
  }
  return totalWalletScore;
};

export const getAllUserNFTs = async (provider, account, rarityMap) => {
  const seData = await getNFTData(provider, account, "se", rarityMap);
  let seCount = seData.length;
  let fafzData = await getNFTData(provider, account, "fafz", rarityMap);
  let fafzCount = fafzData.length;
  let data = seData.concat(fafzData);
  data = data.sort((a, b) => a.sortIndex - b.sortIndex);
  let totalWallet = getTotalWalletScore(data);
  return { data, seCount, fafzCount, totalWallet };
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
  blockNumber,
  marketplace
) => {
  let url = await contract.methods.tokenURI(tokenId).call();
  let data = await axios.get(url);
  if (boughtPrice) data["purchasedPrice"] = boughtPrice;
  if (blockNumber) data["blockNumber"] = blockNumber;
  if (marketplace) data["marketplace"] = marketplace;
  return data;
};

export const getCurrentBlock = async (provider) => {
  let web3 = new Web3(provider);
  let currentBlock = await web3.eth.getBlock("latest");
  return currentBlock.number;
};

const getDataFromEvents = async (provider, contract, events, marketplace) => {
  let web3 = getWeb3(provider);
  if (events.length === 0) throw "No events present";
  let promises = [];
  for (const event of events) {
    let boughtPrice, tokenId;
    if (marketplace === "campfire") {
      boughtPrice = event.returnValues.price;
      tokenId = event.returnValues.nftTokenId;
    } else if (marketplace === "nftkey") {
      boughtPrice = event.returnValues["3"].value;
      tokenId = event.returnValues["3"].tokenId;
    }
    boughtPrice = web3.utils.fromWei(boughtPrice, "ether");
    event.marketplace = marketplace;
    promises.push(
      await getMetadataById(
        contract,
        tokenId,
        boughtPrice,
        event.blockNumber,
        event.marketplace
      )
    );
  }
  let data = await Promise.all(promises);
  return data;
};

export const getLatestBoughtFromCampfire = async (provider, maxLength = 15) => {
  let fafz = "0xB183341A1FC7C851df05E01bf98EE683080B7e8C";
  let fafzContract = getContract(provider, "fafz");
  let fromBlock = 40598710;
  let campfireContract = getContract(provider, "campfire");

  let events = await campfireContract.getPastEvents("Sale", {
    filter: { nftContractAddress: fafz },
    fromBlock,
    toBlock: "latest",
  });

  events = events.reverse();
  events = events.slice(0, maxLength);
  let formattedData = await getDataFromEvents(
    provider,
    fafzContract,
    events,
    "campfire"
  );
  return formattedData;
};

export const getLatestBoughtFromNFTKey = async (provider, maxLength = 15) => {
  let fafz = "0xB183341A1FC7C851df05E01bf98EE683080B7e8C";
  let fafzContract = getContract(provider, "fafz");
  let fromBlock = 40598710;
  let nkContract = getContract(provider, "nftkey");
  let events = await nkContract.getPastEvents("TokenBought", {
    filter: { erc721Address: fafz },
    fromBlock,
    toBlock: "latest",
  });
  events = events.reverse();
  events = events.slice(0, maxLength);
  let formattedData = await getDataFromEvents(
    provider,
    fafzContract,
    events,
    "nftkey"
  );
  return formattedData;
};

export const getAllBoughtEvents = async (maxLength = 10) => {
  let provider = new Web3.providers.WebsocketProvider(fantomNode);
  let eventPromises = [
    await getLatestBoughtFromNFTKey(provider, maxLength),
    await getLatestBoughtFromCampfire(provider, maxLength),
  ];

  let data = await Promise.all(eventPromises);
  data = data.flat();
  data = data.sort((a, b) => b.blockNumber - a.blockNumber);
  data = data.slice(0, maxLength);
  return data;
};
