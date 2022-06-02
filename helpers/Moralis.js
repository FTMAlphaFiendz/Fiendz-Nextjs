import Moralis from "moralis";

const seNFTContract = "0x657aA32E1e270e62EB32471c80dF091e855Ac362";

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
  let options = {
    token_address: seNFTContract,
    limit: "10",
    chain: chain,
  };

  let test_options = {
    address: seNFTContract,
    chain,
  };
  // const userNfts = await Moralis.Web3API.account.getNFTs(options);
  const userNfts = await Web3Api.token.getAllTokenIds(test_options);
  return userNfts;
};
