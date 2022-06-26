/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import { UserContext } from "../context/UserContext";
import { getAllUserNFTs } from "../helpers/NFTHelper";
import { FaSearch } from "react-icons/fa";
import FiendCard from "../components/FiendCard";
import NFTModal from "../components/NFTModal";
import fafzRarity from "../public/files/fafzWithRarity.json";
import rarityMap from "../public/files/rarityMap.json";
import FilterFAFZ from "../public/images/misc/fafz-filter.png";
import FilterSE from "../public/images/misc/se-filter.png";
import Image from "next/image";
import { isInput } from "dom-helpers";

const SEOdesc = "Collection page to filter by rarities!";

const fFilters = [
  {
    id: 1,
    name: "Common",
    fontColor: "#92e8fd",
    select: false,
  },
  {
    id: 2,
    name: "Rare",
    fontColor: "#fdb077",
    select: false,
  },
  {
    id: 3,
    name: "Epic",
    fontColor: "#bbb2ff",
    select: false,
  },
  {
    id: 4,
    name: "Legendary",
    fontColor: "#fee235",
    select: false,
  },
];

export async function getStaticProps(context) {
  let data = fafzRarity;
  data = data.sort((a, b) => a.edition - b.edition);
  return {
    props: { data }, // will be passed to the page component as props
  };
}

const Collection = ({ data }) => {
  const { user } = useContext(UserContext);
  const [userNFTData, setUserNFTData] = useState(null);
  const [activeNFT, setActiveNFT] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [collectionData, setCollectionData] = useState(null);
  const [fiendFilters, setFiendFilters] = useState(null);
  const [searchedFAFZ, setSearchedFAFZ] = useState(null);
  const [collectionCount, setCollectionCount] = useState(null);
  const [searchedToken, setSearchedToken] = useState(null);

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  const filterCollection = (filters) => {
    let filteredCollection;
    let selectedFilters = filters.filter((el) => el.select === true);
    if (selectedFilters.length > 0) {
      filteredCollection = data.filter((d) => {
        for (const f of selectedFilters) {
          if (f.name === d.rarityStatus) {
            return data;
          }
        }
      });
    } else {
      filteredCollection = data;
    }
    setCollectionCount(filteredCollection.length);
    setCollectionData(filteredCollection);
  };

  const checkTokenId = (tokenId, collectionData) => {
    if (typeof tokenId === "string") tokenId = Number(tokenId);
    let searched = collectionData.find((e) => e.edition === tokenId);
    if (!searched) {
      setErrorText("No FAFZ found!");
    }
    return searched;
  };

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSearchForToken(event);
    }
  };

  const onSearchForToken = (e) => {
    e.preventDefault();
    if (searchedToken === undefined || !searchedToken) {
      console.log("here");
      console.log(data);
      setCollectionData(data);
      setIsError(false);
      return;
    }
    if (searchedToken < 0 || searchedToken > 777) {
      setErrorText("Token Id is not within collection range");
      setIsError(true);
    } else {
      let searchedFafz = checkTokenId(searchedToken, collectionData);
      setCollectionData([searchedFafz]);
      setIsError(false);
    }
  };

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setCollectionData(data);
    setCollectionCount(data.length);
    setFiendFilters(fFilters);
  }, [user]);

  return (
    <div>
      <SEOMeta description={SEOdesc} path="/collection" page="Collection" />
      <div className="mint-page flex ">
        <div className="w-full mt-16 md:mt-20 mx-10">
          <header className="flex justify-center mb-4 lg:mt-8">
            <h1 className="font-freckle text-5xl md:text-7xl text-border page-title ">
              Collection
            </h1>
          </header>
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-3/12 flex justify-center">
              <div
                id="filter"
                className="flex justify-center nft-border bg-white mb-3 hidden md:block filter-section py-2 px-3"
              >
                <div className="w-full">
                  <h2 className="text-border font-freckle text-xl mb-2">
                    Collection
                  </h2>
                  <div className="w-full flex flex-row">
                    <div className="w-6/12 p-2">
                      <Image
                        src={FilterFAFZ}
                        alt="Fiend from FAFZ Collection"
                      />
                      <p className="text-border font-freckle">FAFZ</p>
                    </div>
                    <div className="w-6/12 p-2">
                      <Image src={FilterSE} alt="Fiend from SE Collection" />
                      <p className="text-border font-freckle">FAFZ SE</p>
                    </div>
                  </div>
                </div>
                <div className="border-bottom my-1"></div>
                <div className="">
                  <h2 className="text-border font-freckle text-xl my-2">
                    Filter
                  </h2>
                  <div className="flex flex-col">
                    {fiendFilters?.map((filter) => {
                      return (
                        <div
                          className="flex items-center py-1"
                          key={filter.name}
                        >
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            name={filter.name}
                            style={{ height: "20px", width: "20px" }}
                            onChange={(e) => {
                              let checked = e.target.checked;
                              setFiendFilters(
                                fiendFilters.map((f) => {
                                  if (filter.id === f.id) {
                                    f.select = checked;
                                  }
                                  return f;
                                })
                              );
                              filterCollection(fiendFilters);
                            }}
                            checked={filter.select}
                          />
                          <label
                            className="font-inter ml-2"
                            style={{ color: filter.fontColor }}
                          >
                            {filter.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              id="collection"
              className="w-full md:w-9/12 lg:w-9/12 collection-area"
            >
              <div
                id="filter-bar"
                className="mx-3 flex flex-row items-center w-full mb-2"
              >
                <div className="font-freckle text-2xl text-border text-white w-full">
                  {collectionCount} NFTS FOUND
                </div>
                <div className="w-full nft-border bg-white token-checker mx-2 flex flex-row items-center">
                  <button className="ml-2 text-border cursor-pointer">
                    <FaSearch />
                  </button>
                  <input
                    type="text"
                    className={`font-inter text-border bg-transparent ml-2`}
                    placeholder="Search by ID....."
                    value={searchedToken}
                    onChange={(e) => {
                      let { value } = e.target;
                      if (!isNaN(value)) {
                        setSearchedToken(value);
                      }
                    }}
                    onKeyDown={onKeyDown}
                    min="0"
                    max="777"
                  />
                </div>
                <div className="w-full">DROP DOWN FILTER</div>
              </div>
              <div className="flex flex-wrap justify-center h-auto">
                {collectionData &&
                  collectionData.map((data) => {
                    return (
                      <FiendCard
                        data={data}
                        name={data?.name}
                        handleShowModal={handleShowModal}
                        setActiveNFT={setActiveNFT}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NFTModal show={modalOpen} onHide={handleClose} activeNFT={activeNFT} />
    </div>
  );
};

export default Collection;
