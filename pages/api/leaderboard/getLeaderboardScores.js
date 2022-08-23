import connectMongo from "../../../lib/connectMongo";
import Leaderboard from "../../../models/Leaderboard";
let axios = require("axios");
const rarityMap = require("../../../helpers/rarityMap.json");

const moralisBaseUrl = "https://deep-index.moralis.io/api/v2/nft/";
const fafzContract = "0xB183341A1FC7C851df05E01bf98EE683080B7e8C";
const seContract = "0x657aA32E1e270e62EB32471c80dF091e855Ac362";
const plStakingContract = "0x019afd2bc9cae3eb4ba75bca46bbcd4019f5ef82";

//WALLET SCORE HELPER FUNCTION
const getMetadata = async (data, rarityMap) => {
  let totalRarity = 0;
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
  } else if (
    !data.hasOwnProperty("attributes") &&
    data.description.includes("Special Edition")
  ) {
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

const getTiers = (walletScore) => {
  let tier;
  switch (true) {
    case walletScore < 500:
      tier = 0;
      break;
    case walletScore >= 500 && walletScore <= 1000:
      tier = 1;
      break;
    case walletScore > 1000 && walletScore <= 2000:
      tier = 2;
      break;
    case walletScore > 2000 && walletScore <= 4000:
      tier = 3;
      break;
    case walletScore > 4000 && walletScore <= 8000:
      tier = 4;
      break;
    case walletScore > 8000:
      tier = 5;
      break;
    default:
      throw `Wallet Score doesnt meet condition ${walletScore}`;
  }
  return tier;
};

const getFAFzRarityStatus = (totalRarity) => {
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
//END WALLET SCORE HELPER FUNCTIONS

//START MORALIS HELPER FUNCTIONS
const getNFTOwners = async (contract) => {
  let ownerMap = {};
  let cursor = null;
  do {
    ("https://deep-index.moralis.io/api/v2/nft/0xB183341A1FC7C851df05E01bf98EE683080B7e8C/owners?chain=fantom&format=decimal");
    let url = `${moralisBaseUrl}${contract}/owners?chain=fantom&format=decimal`;
    if (cursor) {
      url = `${url}&cursor=${cursor}`;
    }
    let headers = {
      accept: "application/json",
      "X-API-Key": process.env.MORALIS_API_KEY,
    };
    let { data } = await axios.get(url, { headers });
    for (const d of data.result) {
      if (!ownerMap.hasOwnProperty(d.owner_of)) {
        ownerMap[d.owner_of] = {};
        ownerMap[d.owner_of]["count"] = 1;
        d.metadata = await getMetadata(JSON.parse(d.metadata), rarityMap);
        ownerMap[d.owner_of]["data"] = [d];
      } else {
        ownerMap[d.owner_of]["count"]++;
        d.metadata = await getMetadata(JSON.parse(d.metadata), rarityMap);
        ownerMap[d.owner_of].data.push(d.metadata);
      }
    }
    cursor = data.cursor;
  } while (cursor != "" && cursor !== null);
  return ownerMap;
};

const mergeRecords = (fafzData, seData) => {
  for (const se in seData) {
    for (const data of seData[se].data) {
      let d;
      if (data.hasOwnProperty("metadata")) {
        d = data.metadata;
      } else {
        d = data;
      }
      if (!fafzData.hasOwnProperty(se)) {
        fafzData[se] = {};
        fafzData[se]["seCount"] = 1;
        fafzData[se].data = [d];
      } else {
        fafzData[se]["seCount"] = fafzData[se].hasOwnProperty("seCount")
          ? fafzData[se]["seCount"]++
          : 1;
        fafzData[se].data.push(d);
      }
    }
  }
  return fafzData;
};

const getData = async () => {
  try {
    let ownerData = await getNFTOwners(fafzContract);
    let seData = await getNFTOwners(seContract);
    let merged = mergeRecords(ownerData, seData);
    let arr = [];
    for (const owner in merged) {
      let totalWallet = 0;
      for (const d of ownerData[owner].data) {
        if (d.hasOwnProperty("metadata")) {
          totalWallet += d.metadata.walletScore;
        } else {
          totalWallet += d.walletScore;
        }
      }
      let tier = getTiers(totalWallet);
      arr.push({
        account: owner,
        count: ownerData[owner].count,
        seCount: ownerData[owner].hasOwnProperty("seCount")
          ? ownerData[owner].seCount
          : 0,
        walletScore: totalWallet,
        tier,
      });
    }
    arr = arr.sort((a, b) => b.walletScore - a.walletScore);
    return arr;
  } catch (err) {
    console.log({ err: err.message });
    console.log("ERROR GETTING DATA");
  }
};

const connectAndUpsert = async (data) => {
  console.log("UPSERTING");
  try {
    for (const d of data) {
      if (d.account !== plStakingContract) {
        let { account, walletScore, tier } = d;
        const doc = await Leaderboard.findOneAndUpdate(
          {
            account,
          },
          { account, walletScore, tier },
          { upsert: true, useFindAndModify: true, returnDocument: "after" }
        );
      }
    }
    return;
  } catch (err) {
    console.log({ err });
  }
};
//END MORALIS HELPER FUNCTIONS

export default async function getLeaderboardData(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    const method = req.method;
    const { secret } = req.headers;
    if (method === "GET") {
      if (secret !== process.env.FAFZ_SECRET) {
        res
          .status(403)
          .json({ error: "You must not know the secret password..." });
      }
      console.log("GETTING DATA");
      let data = await getData();
      console.log("GOT DATA - STARTING UPSERT");
      await connectAndUpsert(data);
      // res.json(leaderboardRecords);
      console.log("FINISHED UPSERTING");
      return res.status(200).json({ message: "Ran cron successfully" });
    } else {
      res.status(404).json({ error: "Wrong HTTP Method" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
