import Moralis from "moralis";
require("dotenv").config();
const MORALIS_URL = "https://yupniueihluv.usemoralis.com:2053/server";
const MORALIS_APP_ID = "9AhicLM1Ip38LXJs2gqcJ9JUFJX6P3hqirhOdn1z";

export const initMoralis = async () => {
  await Moralis.start({
    serverUrl: MORALIS_URL,
    appId: MORALIS_APP_ID,
  });
};

export const getUserNFTs = async (nftAddress, account, chain) => {
  chain = "0xfa";
  let options2 = {
    address: account,
    token_address: nftAddress,
    limit: "10",
    chain: chain,
  };
  const userNfts = await Moralis.Web3API.account.getNFTs(options2);
  return userNfts;
};
