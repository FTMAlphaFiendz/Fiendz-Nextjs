import clientPromise from "../../../lib/mongodb";
import connectMongo from "../../../lib/connectMongo";
import Leaderboard from "../../../models/Leaderboard";

export default async function addAccount(req, res) {
  let { account, walletScore, displayName } = req.body;
  console.log("CONNECTING TO MONGO");
  await connectMongo();
  console.log("CONNECTED TO MONGO");
  console.log("CREATING DOCUMENT");
  account = "0xa1111";
  walletScore = 1000;
  displayName = "Test";
  //make sure to check validation of req.body
  const leaderboard = await Leaderboard.create({
    account,
    walletScore,
    displayName,
  });
  console.log("CREATED DOCUMENT");
  //db connection
  try {
    res.json({ here: "here" });
  } catch (err) {
    console.log({ err });
    res.json(err);
  }
}
