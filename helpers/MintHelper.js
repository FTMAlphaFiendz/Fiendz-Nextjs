import { getContract } from "./Contract";
import testContractABI from "../public/files/abi/testNftABI.json";
import abiDecoder from "abi-decoder";

export const mintNft = async (
  provider,
  account,
  contract,
  mintAmount,
  web3
) => {
  try {
    let tx = await sendMintTx(provider, contract, account, mintAmount, web3);
    return tx;
  } catch (err) {
    throw err;
  }
};

export const fmNft = async (provider, account, contract, mintAmount, web3) => {
  try {
    console.log("before seHolder");
    // let seHolderCount = await getSEHolderCount(provider, account);
    let seHolderCount = 1;
    console.log({ seHolderCount, mintAmount });
    let tx = await sendFM(account, contract, mintAmount, web3, seHolderCount);
    return tx;
  } catch (err) {
    let { transactionHash, blockNumber } = err.receipt;
    let reason = await getRevertReason(transactionHash, blockNumber, web3);
    console.log({ reason });
  }
};

const sendFM = async (account, contract, mintAmount, web3, seHolderCount) => {
  console.log(contract);
  const nonce = await web3.eth.getTransactionCount(account, "latest");
  let tx = await contract.methods
    .freemint(mintAmount, seHolderCount)
    .send({ from: account, nonce, gasLimit: 3000000 });
  return tx;
};

export const sendMintTx = async (
  provider,
  contract,
  account,
  mintAmount,
  web3
) => {
  let cost = await contract.methods.cost().call();
  // let seHolderCount = await getSEHolderCount(provider, account);
  let seHolderCount = 0;
  //calc mint cost
  let mintCost = cost * mintAmount;
  //checking transaction amount from wallet
  const nonce = await web3.eth.getTransactionCount(account, "latest");
  //setting params
  let params = {
    from: account,
    value: web3.utils.toWei(mintCost.toString(), "ether"),
    nonce: nonce,
    gasLimit: 3000000,
  };
  let tx;
  try {
    tx = await contract.methods.mint(mintAmount, seHolderCount).send(params);
  } catch (err) {
    let { transactionHash, blockNumber } = err.receipt;
    console.log({ transactionHash });
    let reason = await getRevertReason(transactionHash, blockNumber, web3);
    console.log({ reason });
  }
  return tx;
};

const getRevertReason = async (txHash, blockNumber, web3) => {
  console.log("HERE");
  const tx = await web3.eth.getTransaction(txHash);
  console.log({ tx });
  console.log("HERE");
  let result = await web3.eth.call(tx, blockNumber);
  result = result.startsWith("0x") ? result : `0x${result}`;
  if (result && result.substr(138)) {
    const reason = web3.utils.toAscii(result.substr(138));
    console.log("Revert reason:", reason);
    return reason;
  } else {
    console.log("Cannot get reason - No return value");
  }
};

export const getSEHolderCount = async (provider, account) => {
  let contract = getContract(provider, "se");
  let tokenCount = await contract.methods.walletOfOwner(account).call();
  tokenCount = [1];
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

export const checkEligibleFreeMint = async (provider, account) => {
  let seContract = getContract(provider, "se");
  console.log("IN CHECKELIGIBLEFREEMINT");
  //this is a holders address
  // account = "0xa048736571f18948bba02f9c9f765d99f9c4d5f9";
  // let seCount = await seContract.methods.walletOfOwner(account).call();
  // seCount = seCount.length;
  let seCount = 1;
  let fafzContract = getContract(provider, "fafz");
  let fafzCount = await fafzContract.methods.walletOfOwner(account).call();
  let isEligible = await fafzContract.methods.isfreeMinted(account).call();
  // isEligible = true;
  fafzCount = fafzCount.length;
  console.log({ seCount, fafzCount, isEligible });

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
