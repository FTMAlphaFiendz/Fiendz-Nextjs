import { useState } from "react";

const FiendCard = ({ data, handleShowModal, setActiveNFT }) => {
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
        <div className="text-center font-inter text-border mb-1">
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
