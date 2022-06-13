/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NFTModal from "./NFTModal";
import { GrTransaction } from "react-icons/gr";

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
              return (
                <div key={skeleton} className="px-3">
                  <Skeleton count={1} height={150} width={150} />
                </div>
              );
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
              <p className="font-inter text-border my-3">
                You have no FAFz in this wallet
              </p>
              <p className="font-inter text-border mb-3">Lets Mint Some!!</p>
              <Link href="/mint">
                <button
                  className={`link-button bg-white p-3 font-freckle w-150 text-center flex items-center justify-center text-border m-2 button-border px-10`}
                >
                  <span className="text-2xl mr-1 button-text">
                    <GrTransaction />
                  </span>
                  <span className="button-text">Go To Mint</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      <NFTModal show={modalOpen} onHide={handleClose} activeNFT={activeNFT} />
    </div>
  );
};

export default NFTViewSection;
