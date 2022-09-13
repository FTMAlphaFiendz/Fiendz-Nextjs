/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { getFTMBalance, getFtmBalance } from "../helpers/Web3Client";

const WalletModal = ({
  user,
  userNFTData,
  showWalletModal,
  setShowWalletModal,
  disconnectWallet,
  profileUrl,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [copyText, setCopyText] = useState("Copy Address");
  const appWidth = () => {
    if (window.innerWidth <= 1127) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    return window.innerWidth;
  };
  const onHide = () => {
    setShowWalletModal(!showWalletModal);
    setCopyText("Copy Address");
  };
  const formatAccount = (account) => {
    let formattedAccount = `${account?.substring(0, 5)}..${account?.substring(
      39,
      42
    )}`;
    return formattedAccount;
  };

  const copyAddress = (account) => {
    console.log("copy clicked");
    navigator.clipboard.writeText(account);
    setCopyText("Copied!");
  };
  useEffect(() => {
    window.addEventListener("resize", appWidth);
    appWidth();
  }, []);

  return (
    <Modal
      show={showWalletModal}
      onHide={onHide}
      size={isMobile ? "sm" : "md"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="flex w-full justify-end h-12">
          <button className="text-2xl" onClick={onHide}>
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <img
              src={profileUrl}
              alt="profile FAFZ"
              className="loading w-[80px] h-[80px] rounded-full nft-border"
            />
          </div>
          <div className="flex flex-col items-center mt-4 font-inter text-border text-xl">
            <h1>{formatAccount(user?.account)}</h1>
            <h5 className="mt-1">
              {user?.walletBalance}
              <span className="ml-1">FTM</span>
            </h5>
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <button
              onClick={() => copyAddress(user?.account)}
              className={`mt-4 p-2.5 rounded-full border-2 border-orange-700 hover:shadow-xl duration-500 hover:text-white font-freckle  lg:mx-2 w-48 connect-button`}
            >
              {copyText}
            </button>
            <button
              onClick={() => {
                disconnectWallet();
                onHide();
              }}
              className={`mt-4 p-2.5  rounded-full border-2 border-orange-700 hover:shadow-xl duration-500 hover:text-white font-freckle  lg:mx-2 w-48 connect-button`}
            >
              Disconnect
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WalletModal;
