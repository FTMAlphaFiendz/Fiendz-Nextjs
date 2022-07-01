/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const NFTModal = ({ show, onHide, activeNFT, userData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const appWidth = () => {
    if (window.innerWidth <= 1127) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    return window.innerWidth;
  };

  const checkIfUserNFT = (userNFTData, cardData) => {
    if (!cardData) return;
    let { edition, rarityStatus } = cardData;
    const checkEdition = (edition, rarityStatus, userNFTData) => {
      for (const data of userNFTData) {
        if (data.edition === edition && data.rarityStatus === rarityStatus) {
          return true;
        }
      }
    };
    return checkEdition(edition, rarityStatus, userNFTData);
  };

  useEffect(() => {
    window.addEventListener("resize", appWidth);
    appWidth();
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size={isMobile ? "md" : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="flex w-full justify-end">
          <button className="text-2xl" onClick={onHide}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex items-center flex-col lg:flex-row lg:items-start w-full h-full">
          <div className="w-9/12 lg:w-6/12 flex justify-center items-center relative">
            <div className="flex justify-center overflow-hidden relative modal-image">
              <img
                src={activeNFT?.image}
                alt={activeNFT?.name}
                style={{ height: "100%", width: "100%" }}
                className="mb-2 nft-border"
              />
              {userData && checkIfUserNFT(userData, activeNFT) && (
                <div className="banner-modal font-freckle">Owned</div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12 flex flex-col p-3">
            <div className="mb-4 flex flex-col">
              <div className="font-freckle text-border text-xl mb-2">
                {activeNFT?.name}
              </div>
              <div className="flex">
                <p
                  className={`text-border font-freckle px-2 rounded-lg modal-status`}
                  style={{
                    backgroundColor: activeNFT?.rarityBackground.toString(),
                  }}
                >
                  {activeNFT?.rarityStatus}
                </p>
                <span className="font-freckle text-border ml-2">
                  Wallet Score:{" "}
                  <span className="text-orange-500">
                    {activeNFT?.walletScore}
                  </span>
                </span>
              </div>
            </div>
            {activeNFT?.attributes && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {activeNFT.attributes.map((attribute) => {
                    return (
                      <div
                        key={attribute.trait_type}
                        className="px-3 py-1 font-inter text-border text-center nft-border bg-lightblue flex flex-col justify-center"
                      >
                        <p className="text-sm font-inter ">
                          {attribute.trait_type}
                        </p>

                        <p className="font-freckle text-base">
                          {attribute.value}
                        </p>
                        <p className="text-sm font-inter text-orange-500">
                          {attribute.rarityPercent &&
                            `${attribute.rarityPercent}% have this`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NFTModal;
