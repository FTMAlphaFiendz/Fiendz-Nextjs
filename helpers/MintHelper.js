import { getContract } from "./Contract";

export const fmNft = async (provider, account, contract, mintAmount, web3) => {
  //THIS WILL GET ADDED WITH MAINNET
  let seHolderCount = await getSEHolderCount(provider, account);
  const nonce = await web3.eth.getTransactionCount(account, "latest");
  let tx = await contract.methods
    .freemint(mintAmount, seHolderCount)
    .send({ from: account, nonce, gasLimit: 3000000 });
  return tx;
};

export const mintNft = async (
  provider,
  contract,
  account,
  mintAmount,
  web3
) => {
  let BN = web3.utils.BN;
  let cost = await contract.methods.cost().call();
  let seHolderCount = await getSEHolderCount(provider, account);
  //calc mint cost
  let mintCost = new BN(cost).mul(new BN(mintAmount));
  //checking transaction amount from wallet
  const nonce = await web3.eth.getTransactionCount(account, "latest");

  const gasPrice = await web3.eth.getGasPrice();
  //setting params
  let params = {
    from: account,
    value: mintCost.toString(),
    nonce: nonce,
    gasPrice: gasPrice,
  };
  //sending transaction
  let tx = await contract.methods.mint(mintAmount, seHolderCount).send(params);
  return tx;
};

export const getRevertReason = async (txHash, blockNumber, web3) => {
  const tx = await web3.eth.getTransaction(txHash);
  try {
    let result = await web3.eth.call(tx, blockNumber);
    result = result.startsWith("0x") ? result : `0x${result}`;
    if (result && result.substr(138)) {
      const reason = web3.utils.toAscii(result.substr(138));
      return reason;
    } else {
      return "Cannot get reason - No return value";
    }
  } catch (err) {
    return err;
  }
};

export const isPaused = async (provider) => {
  let contract = getContract(provider, "fafz");
  let paused = await contract.methods.paused().call();
  return paused;
};

export const getSEHolderCount = async (provider, account) => {
  let contract = getContract(provider, "se");
  let tokenCount = await contract.methods.walletOfOwner(account).call();
  return tokenCount.length;
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
    // console.log("in mint helper nft transfer", event);
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
  return maxMintAmount;
};

export const getIsWhitelistOnly = async (contract) => {
  let isWhitelist = await contract.methods.onlyWhitelisted().call();
  return isWhitelist;
};

export const isAccountWhitelisted = async (contract, account, provider) => {
  if (!contract) {
    contract = getContract(provider, "fafz");
  }
  let isAccountWhitelisted = await contract.methods
    .isWhitelisted(account)
    .call();
  return isAccountWhitelisted;
};

export const checkEligibleFreeMint = async (provider, account) => {
  let seContract = getContract(provider, "se");
  //this is a holders address
  // account = "0xa048736571f18948bba02f9c9f765d99f9c4d5f9";
  let seCount = await seContract.methods.walletOfOwner(account).call();
  seCount = seCount.length;
  let fafzContract = getContract(provider, "fafz");
  let fafzCount = await fafzContract.methods.walletOfOwner(account).call();
  let isEligible = await fafzContract.methods.isfreeMinted(account).call();
  fafzCount = fafzCount.length;

  if (seCount > 0 && isEligible) {
    if (fafzCount >= seCount) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
