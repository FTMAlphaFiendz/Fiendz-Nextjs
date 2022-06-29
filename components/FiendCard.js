import { useState } from "react";
import { FaStar } from "react-icons/fa";

const FiendCard = ({ data, handleShowModal, setActiveNFT, userData }) => {
  const checkIfUserNFT = (userNFTData, cardData) => {
    let { edition, rarityStatus } = cardData;
    const checkEdition = (edition, rarityStatus, userNFTData) => {
      for (const data of userNFTData) {
        console.log({ data, edition, rarityStatus });
        if (data.edition === edition && data.rarityStatus === rarityStatus) {
          return <FaStar />;
        }
      }
    };
    return checkEdition(edition, rarityStatus, userNFTData);
  };
  return (
    <div
      key={data.name}
      className="w-3/12 m-2 flex flex-col nft-card nft-border cursor-pointer"
      onClick={() => {
        handleShowModal();
        setActiveNFT(data);
      }}
    >
      <img
        src={data.image}
        alt={data.name}
        className="nft-border m-auto my-3"
        style={{ height: "190px", width: "185px" }}
      />
      <div id="nft-stats" className="mb-3">
        <div className="font-inter text-border mb-1 flex items-center justify-center">
          <span className="mr-2 text-yellow-500">
            {userData && checkIfUserNFT(userData, data)}
          </span>
          {data.name}
        </div>
        <div className="flex flex-row justify-around">
          <p className="text-border font-inter">Score: {data.walletScore}</p>
          <p
            className={`text-border font-inter px-2 rounded-lg`}
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
