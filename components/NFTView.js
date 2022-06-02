import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { initMoralis, getUserNFTs, getSEUserNFTs } from "../helpers/Moralis";
import ViewSelection from "../components/ViewSelection";
import { useMoralisWeb3Api } from "react-moralis";

const viewSelections = [
  { title: "My NFTs", type: "view", disabled: false },
  // { title: "Staking", type: "stake", disabled: true },
  // { title: "Activity", type: "activity", disabled: true },
];

const NFTView = () => {
  const Web3Api = useMoralisWeb3Api();
  const [selected, setSelected] = useState("view");
  const { account, provider, chainId } = useContext(UserContext);
  const [userNfts, setUserNfts] = useState("");

  const getAllNfts = async () => {
    let nfts = await getUserNFTs(
      "0xBc83cae02389fe6A719C49BbEA5f8bEc795c1147",
      account,
      chainId
    );
    setUserNfts(nfts.result);
  };

  const getSENfts = async () => {
    let nfts = await getSEUserNFTs(Web3Api);
    setUserNfts(nfts.result);
  };

  useEffect(() => {
    if (account) {
      const getNfts = async () => {
        try {
          await initMoralis(
            process.env.NEXT_PUBLIC_MORALIS_URL,
            process.env.NEXT_PUBLIC_MORALIS_APP_ID
          );
          // await getAllNfts();
          await getSENfts();
        } catch (err) {
          console.log("ERROR IN USE EFFECT NEED TO SHOW A TOAST");
          console.log(err);
        }
      };

      getNfts().catch((err) => console.log(err));
    }
  }, [account]);

  return (
    <div className="flex flex-col font-inter content-line text-base lg:text-lg font-normal text-center w-full my-4 md:my-10 xl:mt-18 items-center px-4 w-full">
      <div className="w-full flex md:w-10/12 pt-2 justify-center">
        {viewSelections.map((selection) => {
          return (
            <div
              key={selection.title}
              className={`w-4/12 view-selectors font-freckle main-title-text-secondary text-3xl ${
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
        nfts={userNfts}
        skeletonCount={[1, 2, 3, 4]}
      />
    </div>
  );
};

export default NFTView;
