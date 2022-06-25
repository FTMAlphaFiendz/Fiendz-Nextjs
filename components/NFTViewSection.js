/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NFTModal from "./NFTModal";
import { GrTransaction } from "react-icons/gr";
import { GiCampfire } from "react-icons/gi";

const NFTViewSection = ({ nfts, skeletonCount, isLoading }) => {
  const [metaData, setMetadata] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNFT, setActiveNFT] = useState({});

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (nfts) {
      setMetadata(nfts);
    }
  }, [nfts]);

  return (
    <div className="flex justify-center w-full">
      {isLoading ? (
        <div className="my-8 w-11/12 md:w-12/12">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {skeletonCount.map((skeleton) => {
              return <div key={skeleton} className="px-3"></div>;
            })}
          </div>
        </div>
      ) : (
        <div className="my-8 w-11/12 md:w-9/12">
          {nfts.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {metaData.map((data, i) => {
                return (
                  <div key={i} className="flex flex-col items-center px-3 py-2">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleShowModal();
                        setActiveNFT(data);
                      }}
                    >
                      <img
                        src={data.image}
                        alt={data.name}
                        className="view-nft mb-2"
                        style={{ height: "150px", width: "150px" }}
                      />
                    </div>
                    <h3 className="font-inter text-border">{data.name}</h3>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <p>
                You have no FAFZ in this wallet! Check us out on secondary!!
              </p>
              <p>Campfire.exchange</p>
              <p>Nftkey.app</p>
            </div>
          )}
        </div>
      )}
      <NFTModal show={modalOpen} onHide={handleClose} activeNFT={activeNFT} />
    </div>
  );
};

export default NFTViewSection;
