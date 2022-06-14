import React, { useState, useEffect } from "react";

const ConnectWalletBtn = ({
  account,
  chainId,
  connectWallet,
  disconnectWallet,
  className,
}) => {
  const [disconnectButtonTxt, setDisconnectButtonTxt] = useState("");

  const formatDisconnectText = (account, chainId) => {
    let text;
    if (chainId === 250) {
      text = `${account.substring(0, 5)}....${account.substring(37, 42)}`;
    } else if (chainId === 4002) {
      text = "Testnet";
    } else {
      text = "Connect to FTM";
    }
    return text;
  };

  useEffect(() => {
    setDisconnectButtonTxt(formatDisconnectText(account, chainId));
  }, [account, chainId]);

  return (
    <div>
      {account ? (
        <button
          onClick={disconnectWallet}
          onMouseEnter={() => setDisconnectButtonTxt("Disconnect")}
          onMouseLeave={() =>
            setDisconnectButtonTxt(formatDisconnectText(account, chainId))
          }
          className={`${
            className
              ? className
              : "p-2.5 sm:ml-2 rounded-full border-2 border-orange-700 hover:shadow-xl duration-500 hover:text-white font-freckle mr-16 lg:mx-2 w-48 connect-button"
          }`}
        >
          {disconnectButtonTxt}
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className={`${
            className
              ? className
              : "p-2.5 sm:ml-2 rounded-full border-2 border-orange-700 hover:shadow-xl duration-500 hover:text-white font-freckle mr-16 lg:mx-2 w-48 connect-button"
          }`}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletBtn;
