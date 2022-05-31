import Moralis from "moralis";

export const initMoralis = async () => {
  await Moralis.start({
    serverUrl: NEXT_PUBLIC_MORALIS_URL,
    appId: NEXT_PUBLIC_MORALIS_APP_ID,
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
