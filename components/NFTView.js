import React, { useEffect, useState } from "react";
import {} from "../helpers/Moralis";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getMetadataByURI, formatUrl } from "../helpers/MintHelper";

const NFTView = ({ nfts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeFiend, setActiveFiend] = useState("");
  const [skeletonAmount, setSkeletonAmount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [metaData, setMetaData] = useState([]);

  const handleShow = (fiend) => {
    console.log("click");
    setShowModal(!showModal);
    setActiveFiend(fiend);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const createSkeletonAmount = (nfts) => {
    let s = [];
    for (let i = 0; i < nfts.length; i++) {
      s.push(i);
    }
    setSkeletonAmount(s);
  };

  const getMetadata = (nfts) => {
    let m = [];
    for (const nft of nfts) {
      console.log(JSON.parse(nft.metadata));
      m.push(JSON.parse(nft.metadata));
    }
    return m;
  };

  useEffect(() => {
    createSkeletonAmount(nfts);
    setIsLoading(true);
    let metadata = getMetadata(nfts);
    setMetaData(metadata);
    console.log("METADATA", metadata);
    setTimeout(() => {
      setIsLoading(false);
    }, "5000");
  }, [nfts]);

  return (
    <div className="flex flex-col font-inter content-line text-base lg:text-lg font-normal text-center w-full my-4 md:my-10 xl:mt-18 items-center px-4">
      <h1 className="font-freckle text-border text-xl md:text-2xl md:text-4xl lg:text-6xl">
        <b>View All NFTS!</b>
      </h1>
      {isLoading ? (
        <div className="my-8 w-11/12 md:w-12/12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {skeletonAmount.map((skeleton) => {
              return (
                <div key={skeleton}>
                  <Skeleton count={1} height={200} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="my-8 w-11/12 md:w-12/12">
          {nfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {metaData.map((data, i) => {
                return (
                  <div key={i} className="flex flex-col">
                    <div
                      className="cursor-pointer view-nft"
                      onClick={() => setIsOpen(true)}
                    >
                      <Image
                        src={formatUrl(data.image)}
                        alt={data.name}
                        placeholder="blur"
                      />
                    </div>
                    <h3>{data.name}</h3>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No Nfts</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NFTView;
