export const formatUrl = (tokenURI) => {
  if (!tokenURI) return;
  if (tokenURI.includes("https://gateway.pinata.cloud/ipfs/")) {
    return tokenURI.replace(
      "https://gateway.pinata.cloud/ipfs/",
      "https://ipfs.io/ipfs/"
    );
  } else if (tokenURI.includes("ipfs://"))
    return tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
};

export const formatName = (name) => {
  if (name.includes("Fantom Alpha Fiendz:")) {
    let n = name.replace("Fantom Alpha Fiendz:", "");
    return n;
  }
};
