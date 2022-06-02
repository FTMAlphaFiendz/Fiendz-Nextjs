import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatUrl, formatName } from "../helpers/utils";
import NFTModal from "./NFTModal";

const NFTViewSection = ({ nfts, skeletonCount }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [metaData, setMetadata] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNFT, setActiveNFT] = useState({});

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const getMetadata = (nfts) => {
    let m = [];
    for (const nft of nfts) {
      m.push(JSON.parse(nft.metadata));
    }
    return m;
  };

  useEffect(() => {
    if (nfts) {
      let md = getMetadata(nfts);
      setMetadata(md);
      setTimeout(() => setIsLoading(false), 3000);
    }
  }, [nfts]);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="my-8 w-11/12 md:w-12/12">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
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
        <div className="my-8 w-11/12 md:w-12/12">
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
                      <Image
                        src={formatUrl(data.image)}
                        alt={data.name}
                        height={150}
                        width={150}
                        className="view-nft"
                        objectFit="contain"
                        priority={true}
                      />
                    </div>
                    <h3 className="font-inter text-border">
                      {formatName(data.name)}
                    </h3>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No Nfts</div>
          )}
        </div>
      )}
      <NFTModal show={modalOpen} onHide={handleClose} activeNFT={activeNFT} />
    </div>
  );
};

export default NFTViewSection;
