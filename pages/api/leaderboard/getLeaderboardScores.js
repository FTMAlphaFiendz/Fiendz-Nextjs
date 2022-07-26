import connectMongo from "../../../lib/connectMongo";
import Leaderboard from "../../../models/Leaderboard";

export default async function getLeaderboardData(req, res) {
  console.log("CONNECTING TO MONGO");
  await connectMongo();
  const method = req.method;
  const { secret } = req.headers;
  if (method === "GET") {
    if (secret !== process.env.FAFZ_SECRET) {
      res
        .status(403)
        .json({ error: "You must not know the secret password..." });
    }
    let leaderboardRecords = await Leaderboard.find().sort({
      walletScore: "descending",
    });
    res.json(leaderboardRecords);
    try {
      res.json({ here: "here" });
    } catch (err) {
      console.log({ err });
      res.json(err);
    }
  } else {
    res.status(404).json({ error: "Wrong HTTP Method" });
  }
}
