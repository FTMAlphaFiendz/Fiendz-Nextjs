import connectMongo from "../../../lib/connectMongo";
import Leaderboard from "../../../models/Leaderboard";

export default async function handler(req, res) {
  console.log("CONNECTING TO MONGO");
  const { account } = req.query;
  const method = req.method;
  const { secret } = req.headers;
  console.log({ account, secret });
  if (!account) res.status(404).json({ error: "No account sent" });
  if (method === "GET") {
    if (secret !== process.env.FAFZ_SECRET) {
      res
        .status(403)
        .json({ error: "You must not know the secret password..." });
    }
    try {
      await connectMongo(); //getting one document by account
      let accountRecord = await Leaderboard.findOne({ account });
      res.json(accountRecord);
    } catch (err) {
      console.log({ err });
      res.status(500).json(err);
    }
  } else {
    res.status(404).json({ error: "Wrong HTTP Method" });
  }
}
