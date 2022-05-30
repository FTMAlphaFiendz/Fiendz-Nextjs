import React from "react";
import { Puff } from "react-loading-icons";

const MintButton = ({
  mintFunction,
  isLoading,
  account,
  chainId,
  mintAmount,
}) => {
  const formatBtnText = (account, chainId) => {
    let text;
    if (!account) {
      //no wallet is connected
      text = "CONNECT WALLET";
    } else if (account && chainId !== 250) {
      //account is connected but the chain isnt Fantom
      text = "CONNECT TO FTM";
      if (chainId === 4002) {
        text = "TESTNET";
      }
    } else {
      //wallet is connected and chain is Fantom
      text = "MINT MAINNET";
    }
    return text;
  };
  return (
    <>
      {isLoading ? (
        <span>
          <Puff stroke="#1d1f91" fill="#1d1f91" speed={0.75} />
        </span>
      ) : (
        <button
          className="sm:ml-2 hover:shadow-xl duration-500 hover:text-white font-freckle check-whitelist-btn button-border mint-button"
          onClick={() => mintFunction(mintAmount)}
        >
          <span className="button-text text-border">
            {formatBtnText(account, chainId)}
          </span>
        </button>
      )}
    </>
  );
};

export default MintButton;
