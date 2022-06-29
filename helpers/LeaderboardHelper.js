import axios from "axios";

export const registerUserWallet = async (account, walletScore) => {
  if (!account || !walletScore) {
    console.error("Account and Wallet Score are required");
  }
  let body = { account, walletScore };
  let registerRecord = await axios.post(
    `http://localhost:3000/api/leaderboard/`,
    body,
    { headers: { secret: process.env.NEXT_PUBLIC_FAFZ_SECRET } }
  );
  let { data } = registerRecord;
  if (typeof data === "string") {
    data = JSON.parse(data);
  }
  return data;
};

export const getLeaderboardScores = async () => {
  let { data } = await axios.get(
    "http://localhost:3000/api/leaderboard/getLeaderboardScores",
    {
      headers: { secret: process.env.NEXT_PUBLIC_FAFZ_SECRET },
    }
  );
  return data;
};

export const checkUserRegistration = async (account) => {
  let userRecord = await axios.get(
    `http://localhost:3000/api/leaderboard/${account}`,
    { headers: { secret: process.env.NEXT_PUBLIC_FAFZ_SECRET } }
  );
  if (!userRecord) return null;
  return userRecord.data;
};
