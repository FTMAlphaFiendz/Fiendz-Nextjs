/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import NFTModal from "./NFTModal";
import WalletStatsBar from "./WalletStatsBar";
import { ThreeDots } from "react-loading-icons";

const NFTViewSection = ({ nftData, isLoading }) => {
  const [metaData, setMetadata] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNFT, setActiveNFT] = useState(null);
  const [isHighSorted, setIsHighSorted] = useState(true);

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const getTier = (walletScore) => {};

  const sortFAFZ = (nfts, isHighSorted) => {
    let sortedNfts;
    if (isHighSorted) {
      sortedNfts = nfts.sort((a, b) => a.sortIndex - b.sortIndex);
    } else {
      sortedNfts = nfts.sort((a, b) => b.sortIndex - a.sortIndex);
    }
    setIsHighSorted(!isHighSorted);
    setMetadata(nfts);
  };

  useEffect(() => {
    if (nftData?.data) {
      setMetadata(nftData.data);
    }
  }, [nftData]);

  return (
    <div className="flex flex-col w-full">
      <WalletStatsBar
        nfts={nftData?.data}
        walletScore={nftData?.totalWallet}
        seCount={nftData?.seCount}
        fafzCount={nftData?.fafzCount}
        sortFAFZ={sortFAFZ}
        isHighSorted={isHighSorted}
        isLoading={isLoading}
      />
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
            {nftData?.data?.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {metaData.map((data, i) => {
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
                          <p className="text-border font-inter">
                            Score: {data.walletScore}
                          </p>
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
