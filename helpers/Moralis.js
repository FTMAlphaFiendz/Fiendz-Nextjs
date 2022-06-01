import Moralis from "moralis";

process.env.PUBLIC_NEXT_MORALIS_URL =
  "https://yupniueihluv.usemoralis.com:2053/server";
process.env.PUBLIC_NEXT_MORALIS_APP_ID =
  "9AhicLM1Ip38LXJs2gqcJ9JUFJX6P3hqirhOdn1z";

export const initMoralis = async (serverUrl, appId) => {
  await Moralis.start({
    serverUrl,
    appId,
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

export const getSEUserNFTs = async (Web3Api, nftAddress, account, chain) => {
  chain = "0xfa";
  //will need to pass in account to get user this will get all
  nftAddress = "0x657aA32E1e270e62EB32471c80dF091e855Ac362";
  let options = {
    token_address: nftAddress,
    limit: "10",
    chain: chain,
  };

  let test_options = {
    address: nftAddress,
    chain,
  };
  // const userNfts = await Moralis.Web3API.account.getNFTs(options2);
  console.log(options);
  const userNfts = await Web3Api.token.getAllTokenIds(test_options);
  return userNfts;
};
