import React, { useEffect, useState } from "react";
import NFTModal from "./NFTModal";
import WalletStatsBar from "./WalletStatsBar";
import FiendCard from "./FiendCard";
import { ThreeDots } from "react-loading-icons";

const nftKeyLink = "https://nftkey.app/collections/ftmalphafiendz/";
const campfireLink =
  "https://campfire.exchange/collections/0xb183341a1fc7c851df05e01bf98ee683080b7e8c";
const operaHouseLink =
  "https://operahouse.online/collection/FTM%20Alpha%20Fiendz";

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
        walletScore={nftData?.totalWallet || 0}
        seCount={nftData?.seCount || 0}
        tier={nftData?.tier}
        fafzCount={nftData?.fafzCount || 0}
        sortFAFZ={sortFAFZ}
        isHighSorted={isHighSorted}
        isLoading={isLoading}
      />
      <div id="card-section" className="">
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
                    <div key={data.name}>
                      <FiendCard
                        data={data}
                        handleShowModal={handleShowModal}
                        setActiveNFT={setActiveNFT}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center bg-white nft-border p-4 lg:w-8/12">
                  <h1 className="text-border font-freckle text-3xl mb-2">
                    NO NFTs
                  </h1>
                  <p className="text-border font-inter text-base md:w-8/12 text-center my-2">
                    Our genesis mint is complete but check us out on secondary
                    markets!
                  </p>
                  <div className="flex flex-col items-center">
                    <a
                      className="py-1 text-border text-xl font-freckle"
                      href={nftKeyLink}
                      target="_blank"
                    >
                      NFTKey
                    </a>
                    <a
                      className="py-1 text-border text-xl font-freckle"
                      href={campfireLink}
                      target="_blank"
                    >
                      Campfire
                    </a>
                    <a
                      className="py-1 text-border text-xl font-freckle"
                      href={operaHouseLink}
                      target="_blank"
                    >
                      Operahouse
                    </a>
                  </div>
                  <div className="w-8/12">
                    <p className="mt-3 text-border text-sm text-center font-inter">
                      If you are staking your FAFZ in the coffins with Potluck
                      Protocol. Your NFTs will not appear here as they are not
                      in your wallet. But dont worry they are safe in the
                      coffins!{" "}
                    </p>
                  </div>
                </div>
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
