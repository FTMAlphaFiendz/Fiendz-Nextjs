import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ConnectWalletBtn from "./ConnectWalletBtn";

const MintButton = ({
  mintFunction,
  fmFunction,
  isFreeMintEligible,
  mintAmount,
  buttonText,
}) => {
  let { user, connectWallet, disconnectWallet } = useContext(UserContext);
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
      text = "MINT";
    }
    return text;
  };
  return (
    <>
      {user?.account ? (
        <button
          className={`sm:ml-2 hover:shadow-xl duration-500 hover:text-white font-freckle check-whitelist-btn button-border mint-button`}
          onClick={() => {
            console.log({ isFreeMintEligible });
            if (isFreeMintEligible) {
              fmFunction(user?.provider, user?.account, mintAmount);
              return;
            }
            mintFunction(user?.provider, user?.account, mintAmount);
          }}
        >
          <span className="button-text text-border">
            {buttonText
              ? buttonText
              : formatBtnText(user?.account, user?.chainId)}
          </span>
        </button>
      ) : (
        <ConnectWalletBtn
          account={user?.account}
          chainId={user?.chainId}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          className="sm:ml-2 hover:shadow-xl duration-500 hover:text-white font-freckle check-whitelist-btn button-border mint-button"
        />
      )}
    </>
  );
};

export default MintButton;
