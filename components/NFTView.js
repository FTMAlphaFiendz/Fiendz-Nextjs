import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import ViewSelection from "../components/ViewSelection";
import { requestChainChange } from "../helpers/Web3Client";
import { getLastestBoughtFromNK, getAllUserNFTs } from "../helpers/NFTHelper";
import Pagination from "../components/Pagination";
import toast from "../components/Toast";

const viewSelections = [
  { title: "My NFTs", type: "view", disabled: false },
  // { title: "Staking", type: "stake", disabled: true },
  // { title: "Activity", type: "activity", disabled: true },
];
const NFTView = () => {
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState("view");
  const [userNFTs, setUserNFTs] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  useEffect(() => {
    if (user?.account) {
      let { provider, account, chainId } = user;
      if (chainId !== 250) {
        requestChainChange(provider);
        return;
      } else {
        const getNfts = async (provider, account) => {
          try {
            let allData = await getAllUserNFTs(provider, account);
            setUserNFTs(allData);
            setIsLoading(false);
            //THIS WILL BE FOR THE FUTURE FOOTER SALE INFO
            let events = await getLastestBoughtFromNK(provider);
            console.log({ events });
          } catch (err) {
            console.log(err);
            if (err) {
              notify("error", err.message);
              return;
            }
          }
        };
        getNfts(provider, account).catch((err) => console.log(err));
      }
    }
  }, [user]);

  //get nfts for paging
  const indexOfLastNFT = currentPage * nftsPerPage;
  const indexOfFirstNFT = indexOfLastNFT - nftsPerPage;
  const currentNFTs = userNFTs.slice(indexOfFirstNFT, indexOfLastNFT);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col font-inter content-line text-base lg:text-lg font-normal text-center w-full my-4 md:my-10 xl:mt-18 items-center px-4 w-full">
      <div className="w-full flex md:w-10/12 pt-2 justify-center">
        {viewSelections.map((selection) => {
          return (
            <div
              key={selection.title}
              className={`w-10/12 font-freckle text-4xl md:text-5xl main-title-text-secondary  ${
                selected === selection.type ? "active-view" : "inactive-view"
              } ${
                selection.disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (selection.disabled) {
                  return;
                } else {
                  setSelected(selection.type);
                }
              }}
            >
              {selection.title}
            </div>
          );
        })}
      </div>
      <ViewSelection
        selected={selected}
        nfts={currentNFTs}
        skeletonCount={[1, 2, 3]}
        isLoading={isLoading}
      />
      <Pagination
        nftsperpage={nftsPerPage}
        totalNFTs={userNFTs.length}
        paginate={paginate}
      />
    </div>
  );
};

export default NFTView;
