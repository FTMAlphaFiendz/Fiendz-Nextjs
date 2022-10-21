const web3 = require("web3");
const fantomNode =
  "wss://ws-nd-186-579-089.p2pify.com/f44c3c1903cce504f0fc063e7b6c502e";
const rarityMap = require("../../../public/files/rarityMap.json");
const { getAllUserNFTs } = require("../../../helpers/NFTHelper");
let provider = new web3.providers.WebsocketProvider(fantomNode);

export default async function handler(req, res) {
  const method = req.method;
  const { secret } = req.headers;
  const { address } = req.body;
  if (method === "POST") {
    if (secret !== process.env.FAFZ_SECRET) {
      res
        .status(403)
        .json({ error: "You must not know the secret password..." });
    }
    try {
      let nfts = await getAllUserNFTs(provider, address, rarityMap);
      res.json({ nfts });
    } catch (err) {
      console.log({ err });
      res.status(500).json(err);
    }
  } else {
    res.status(404).json({ error: "Wrong HTTP Method" });
  }
}
