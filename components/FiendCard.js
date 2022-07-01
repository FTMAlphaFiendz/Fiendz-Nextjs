import { useState } from "react";
import { FaStar } from "react-icons/fa";

const FiendCard = ({ data, handleShowModal, setActiveNFT, userData }) => {
  const checkIfUserNFT = (userNFTData, cardData) => {
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
  return (
    <div
      key={data.name}
      className="w-3/12 m-2 flex flex-col nft-card nft-border cursor-pointer relative card-container"
      onClick={() => {
        handleShowModal();
        setActiveNFT(data);
      }}
    >
      {userData && checkIfUserNFT(userData, data) && (
        <div className="banner font-freckle">Owned</div>
      )}
      <img
        src={data.image}
        alt={data.name}
        className="nft-border m-auto my-3"
        style={{ height: "190px", width: "185px" }}
      />
      <div id="nft-stats" className="mb-3">
        <div className="font-freckle text-border mb-1 flex items-center justify-center">
          <span className="mr-2 text-yellow-500">
            {userData && checkIfUserNFT(userData, data)}
          </span>
          {data.name}
        </div>
        <div className="flex flex-row justify-around">
          <p className="text-border font-freckle">
            Score: <span className="text-orange-500">{data.walletScore}</span>
          </p>
          <p
            className={`text-border font-freckle px-2 rounded-lg`}
            style={{
              backgroundColor: data.rarityBackground.toString(),
            }}
          >
            {data.rarityStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FiendCard;
