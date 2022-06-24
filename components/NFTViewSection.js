/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import NFTModal from "./NFTModal";
import { GrTransaction } from "react-icons/gr";
import { GiCampfire } from "react-icons/gi";
import { ThreeDots } from "react-loading-icons";

const NFTViewSection = ({ nftData, isLoading }) => {
  const [metaData, setMetadata] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNFT, setActiveNFT] = useState({});

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const getTier = (walletScore) => {};

  useEffect(() => {
    if (nftData?.data) {
      setMetadata(nftData.data);
    }
  }, [nftData]);

  return (
    <div className="flex flex-col w-full">
      <div
        id="wallet-stats"
        className="bg-white flex w-full md:px-4 wallet-stats items-center"
      >
        <div className="w-3/12 flex-col text-center py-2">
          <p className="font-inter text-border text-lg md:text-xl">
            {nftData?.totalWallet}
          </p>
          <p className="font-inter text-border text-sm md:text-base">
            Wallet Score
          </p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex-col text-center py-2">
          <p className="font-inter text-border text-lg md:text-xl">3</p>
          <p className="font-inter text-border text-sm md:text-base">Tier</p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex-col text-center py-2">
          <p className="font-inter text-border text-lg md:text-xl">
            {nftData?.fafzCount}
          </p>
          <p className="font-inter text-border text-sm md:text-base">FAFz</p>
        </div>
        <span className="border-right"></span>
        <div className="w-3/12 flex-col text-center py-2">
          <p className="font-inter text-border text-lg md:text-xl">
            {nftData?.seCount}
          </p>
          <p className="font-inter text-border text-sm md:text-base">FAFz SE</p>
        </div>
      </div>
      <div id="card-section" className="w-full">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center mt-16">
            <ThreeDots speed={0.75} />
            <h2 className="text-white font-inter text-3xl mt-3">
              Fetching NFT Data....
            </h2>
          </div>
        ) : (
          <div className="my-8 ">
            {nftData?.data.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {metaData.map((data, i) => {
                  return (
                    <div
                      key={i}
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
                          <p className="text-border font-inter">Score: 123</p>
                          <p
                            className={`capitalize text-border font-inter bg-common px-2 rounded-lg`}
                          >
                            {data.rarityStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center">
                <h1 className="text-white font-inter text-3xl">NO NFTs</h1>
              </div>
            )}
          </div>
        )}
      </div>
      <NFTModal show={modalOpen} onHide={handleClose} activeNFT={activeNFT} />
    </div>
  );
};

export default NFTViewSection;
