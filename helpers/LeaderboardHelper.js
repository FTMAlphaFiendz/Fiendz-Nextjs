import axios from "axios";

const getBaseUrl = () => {
  let baseUrl = "http://localhost:3000";
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  }
  return baseUrl;
};

export const registerUserWallet = async (account, walletScore) => {
  let baseUrl = getBaseUrl();
  if (!account || !walletScore) {
    console.error("Account and Wallet Score are required");
  }
  let body = { account, walletScore };
  let registerRecord = await axios.post(`/api/leaderboard/`, body, {
    headers: { secret: process.env.NEXT_PUBLIC_FAFZ_SECRET },
  });
  let { data } = registerRecord;
  if (typeof data === "string") {
    data = JSON.parse(data);
  }
  return data;
};

export const getLeaderboardScores = async () => {
  let baseUrl = getBaseUrl();
  let { data } = await axios.get(`/api/leaderboard/getLeaderboardScores`, {
    headers: { secret: process.env.NEXT_PUBLIC_FAFZ_SECRET },
  });
  return data;
};

export const checkUserRegistration = async (account) => {
  let baseUrl = getBaseUrl();
  let userRecord = await axios.get(`/api/leaderboard/${account}`, {
    headers: { secret: process.env.NEXT_PUBLIC_FAFZ_SECRET },
  });
  if (!userRecord) return null;
  return userRecord.data;
};
