export const formatUrl = (tokenURI) => {
  let ipfsGateway = "https://ftmdead.mypinata.cloud/ipfs/";
  // let ipfsGateway = "https://ipfs.io/ipfs/";
  if (!tokenURI) return;
  if (tokenURI.includes("https://gateway.pinata.cloud/ipfs/")) {
    return tokenURI.replace("https://gateway.pinata.cloud/ipfs/", ipfsGateway);
  } else if (tokenURI.includes("ipfs://")) {
    return tokenURI.replace("ipfs://", ipfsGateway);
  } else if (tokenURI.includes("https://potlucklabs.mypinata.cloud/ipfs/")) {
    return tokenURI.replace(
      "https://potlucklabs.mypinata.cloud/ipfs/",
      ipfsGateway
    );
  }
};

export const formatName = (name) => {
  if (name.includes("Fantom Alpha Fiendz:")) {
    let n = name.replace("Fantom Alpha Fiendz:", "FAFz:");
    return n;
  } else if (name.includes("Fantom Alpha Fiendz")) {
    let n = name.replace("Fantom Alpha Fiendz", "FAFz:");
    return n;
  }
  return name;
};
