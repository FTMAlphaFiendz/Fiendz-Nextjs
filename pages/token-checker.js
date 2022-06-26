import React, { useState, useEffect } from "react";
import SEOMeta from "../components/SEOMeta";
import { FaSearch } from "react-icons/fa";
import fafzRarity from "../public/files/fafzWithRarity.json";
import NFTModal from "../components/NFTModal";
import FiendCard from "../components/FiendCard";
import { formatName } from "../helpers/utils";

const SEOdesc = "Page to check wallet score, rarity and attributes by token id";
const TokenChecker = () => {
  const [tokenId, setTokenId] = useState(0);
  const [errorText, setErrorText] = useState("");
  const [isError, setIsError] = useState(false);
  const [activeNFT, setActiveNFT] = useState(null);
  const [searchedFAFZ, setSearchedFAFZ] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  0;

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
    setIsError(false);
  }, []);

  const checkTokenId = (tokenId, fafzRarity) => {
    if (typeof tokenId === "string") tokenId = Number(tokenId);
    let searched = fafzRarity.find((e) => e.edition === tokenId);
    if (!searched) {
      setErrorText("No FAFZ found!");
    }
    setSearchedFAFZ(searched);
  };

  return (
    <div>
      <SEOMeta
        description={SEOdesc}
        path="/token-checker"
        page="Token Checker"
      />
      <div className="mint-page relative flex">
        <div className="w-full mt-16 md:mt-20 mx-10">
          <header className="flex justify-center mb-4 lg:mt-8">
            <h1 className="text-white font-inter text-3xl">Token Checker</h1>
          </header>
          <div className="flex flex-col items-center w-full">
            <div
              id="wallet-stats"
              className="bg-white flex flex-col w-11/12 md:w-6/12 lg:w-5/12 md:px-4 wallet-stats items-center mb-2 p-4"
            >
              <div className="text-center">
                <p className="font-inter text-border">
                  Input a token Id below to check the FAFZ rarity, attributes
                  and score.
                </p>
              </div>
              <div className="mt-3 flex justify-center items-center w-full">
                <input
                  type="number"
                  className="token-checker border-2 font-inter text-border text-center mx-1"
                  value={tokenId}
                  onChange={(e) => {
                    let { value } = e.target;
                    setTokenId(value);
                  }}
                  onKeyDown={onKeyDown}
                  min="0"
                  max="777"
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    if (tokenId < 0 || tokenId > 777) {
                      setErrorText("Token Id is not within collection range");
                      setIsError(true);
                    } else {
                      checkTokenId(tokenId, fafzRarity);
                      setIsError(false);
                    }
                  }}
                  className="p-2.5 sm:ml-2 rounded-full border-2 border-orange-700 hover:shadow-xl duration-500 hover:text-white font-freckle connect-button mx-1"
                >
                  <FaSearch />
                </button>
              </div>
              {isError && (
                <p className="text-red-500 font-inter text-sm mt-1">
                  {errorText}
                </p>
              )}
            </div>
            <div className="w-full md:w-5/12 flex justify-center">
              {searchedFAFZ && (
                <FiendCard
                  data={searchedFAFZ}
                  name={searchedFAFZ?.name}
                  handleShowModal={handleShowModal}
                  setActiveNFT={setActiveNFT}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <NFTModal show={modalOpen} onHide={handleClose} activeNFT={activeNFT} />
    </div>
  );
};

export default TokenChecker;
