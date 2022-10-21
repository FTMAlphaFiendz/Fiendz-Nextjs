const { getAllBoughtEvents } = require("../../../helpers/NFTHelper");

export default async function handler(req, res) {
  const method = req.method;
  const { secret } = req.headers;
  if (method === "GET") {
    if (secret !== process.env.FAFZ_SECRET) {
      res
        .status(403)
        .json({ error: "You must not know the secret password..." });
    }
    try {
      let nfts = await getAllBoughtEvents();
      let latest = [];
      for (const nft of nfts) {
        let { data, purchasedPrice, marketplace } = nft;
        latest.push({ data, purchasedPrice, marketplace });
      }
      res.json({ latest });
    } catch (err) {
      console.log({ err });
      res.status(500).json(err);
    }
  } else {
    res.status(404).json({ error: "Wrong HTTP Method" });
  }
}
