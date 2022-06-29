import { rejects } from "assert";
import connectMongo from "../../../lib/connectMongo";
import Leaderboard from "../../../models/Leaderboard";

export default async function addAccount(req, res) {
  let { account, walletScore, displayName } = req.body;
  const method = req.method;
  const { secret } = req.headers;
  if (method === "POST") {
    if (secret !== process.env.FAFZ_SECRET) {
      res
        .status(403)
        .json({ error: "You must not know the secret password..." });
    }
    try {
      await connectMongo();
      const doc = await Leaderboard.findOneAndUpdate(
        {
          account,
        },
        { account, walletScore, displayName },
        { upsert: true, useFindAndModify: true, returnDocument: "after" }
      );
      res.json(doc);
      return;
    } catch (err) {
      console.log({ err });
      res.status(500).json(err);
    }
  } else {
    res.status(404).json({ error: "Wrong HTTP Method" });
  }
}
