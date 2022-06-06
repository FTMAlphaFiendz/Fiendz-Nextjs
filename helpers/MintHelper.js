export const mintNft = async (account, contract, mintAmount, web3) => {
  try {
    let tx = await sendMintTx(contract, account, mintAmount, web3);
    return tx;
  } catch (err) {
    throw err;
  }
};

export const sendMintTx = async (contract, account, mintAmount, web3) => {
  let cost = await contract.methods.cost().call();
  //calc mint const
  let mintCost = cost * mintAmount;
  let calcCost = web3.utils.fromWei(mintCost.toString(), "ether");
  //checking transaction amount from wallet
  const nonce = await web3.eth.getTransactionCount(account, "latest");
  //setting params
  let params = {
    from: account,
    value: web3.utils.toWei(calcCost, "ether"),
    nonce: nonce,
  };
  //sending transaction
  let tx = await contract.methods.mint(mintAmount).send(params);
  return tx;
};

export const isAtWalletMax = async (contract, account) => {
  let balance = await contract.methods.balanceOf(account).call();
  return balance > maxWalletAmount;
};

export const getTotalandMaxSupply = async (contract) => {
  let totalSupply = await contract.methods.totalSupply().call();
  let maxSupply = await contract.methods.MAX_SUPPLY().call();
  return { totalSupply, maxSupply };
};

export const getMintProgress = async (contract) => {
  let { totalSupply, maxSupply } = await getTotalandMaxSupply(contract);
  if (totalSupply === maxSupply) {
    return 100;
  } else {
    let percentDone = (totalSupply / maxSupply) * 100;
    return Math.ceil(percentDone);
  }
};

export const getMintAmountLeft = async (contract) => {
  let { totalSupply, maxSupply } = await getTotalandMaxSupply(contract);
  return maxSupply - totalSupply;
};

export const listenToContractTransfer = async (contract) => {
  contract.events.Transfer({}).on("data", (event) => {
    console.log("in mint helper", event);
  });
};

export const getAndSetMintProgress = async (
  contract,
  setMintCompletePercent
) => {
  let complete = await getMintProgress(contract);
  setMintCompletePercent(complete);
};

export const getAndSetMintAmountLeft = async (contract, setMintAmountLeft) => {
  let amountLeft = await getMintAmountLeft(contract);
  setMintAmountLeft(amountLeft);
};

export const getMaxMintAmount = async (contract) => {
  let maxMintAmount = await contract.methods.maxMintAmount().call();
  console.log({ maxMintAmount });
  return maxMintAmount;
};

export const getIsWhitelistOnly = async (contract) => {
  let isWhitelist = await contract.methods.onlyWhitelisted().call();
  return isWhitelist;
};

export const isAccountWhitelisted = async (contract, account) => {
  let isAccountWhitelisted = await contract.methods
    .isWhitelisted(account)
    .call();
  return isAccountWhitelisted;
};
