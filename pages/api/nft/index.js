const Moralis = require("moralis/node");

const serverUrl = "https://yupniueihluv.usemoralis.com:2053/server";
const appId = "9AhicLM1Ip38LXJs2gqcJ9JUFJX6P3hqirhOdn1z";
const secretKey =
  "gzNtCUAgaZxmUOIU6Px9gRhyXT6ZZlPXvhRxG9QmBPq2UQPgGuA7SwnPefGGK4y5";

const initMoralis = async () => {
  await Moralis.start({ serverUrl, appId, secretKey });
};

const getTestTokenBal = async () => {
  const price = await Moralis.Web3API.token.getTokenPrice({
    address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    chain: "bsc",
  });
  return price;
};

export default async (req, res) => {
  res.send("hello");
};
