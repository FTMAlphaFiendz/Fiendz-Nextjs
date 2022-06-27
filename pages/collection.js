/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import { UserContext } from "../context/UserContext";
import { getAllUserNFTs } from "../helpers/NFTHelper";

import FiendCard from "../components/FiendCard";
import NFTModal from "../components/NFTModal";
import fafzRarity from "../public/files/fafzWithRarity.json";
import rarityMap from "../public/files/rarityMap.json";
import Pagination from "../components/Pagination";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import CollectionFilter from "../components/CollectionFilter";
import CollectionDesktopFilterBar from "../components/CollectionDesktopFilterBar";

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
  const [searchedToken, setSearchedToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(20);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

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

  const handleFilterCollection = (e, filter) => {
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
  };

  const checkTokenId = (tokenId) => {
    if (typeof tokenId === "string") tokenId = Number(tokenId);
    let searched = data.find((e) => e.edition === tokenId);
    if (!searched) {
      setErrorText("No FAFZ found!");
    }
    return searched;
  };

  const handleTokenOnChange = (e) => {
    let { value } = e.target;
    if (value === "") {
      setCollectionData(data);
    }
    if (!isNaN(value)) {
      setSearchedToken(value);
    }
  };

  const onSearchForToken = (e) => {
    e.preventDefault();
    if (searchedToken === undefined || !searchedToken) {
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

  const sortDataById = (type, collectionData) => {
    let sortedData = [...collectionData];
    if (type === "asc") {
      sortedData.sort((a, b) => a.edition - b.edition);
    } else {
      sortedData.sort((a, b) => b.edition - a.edition);
    }
    setCollectionData(sortedData);
  };

  useEffect(() => {
    setCollectionData(data);
    setCollectionCount(data.length);
    setFiendFilters(fFilters);
  }, [user]);

  //get nfts for paging
  const indexOfLastNFT = currentPage * nftsPerPage;
  const indexOfFirstNFT = indexOfLastNFT - nftsPerPage;
  const currentNFTs = collectionData?.slice(indexOfFirstNFT, indexOfLastNFT);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <SEOMeta description={SEOdesc} path="/collection" page="Collection" />
      <div className="mint-page flex overflow-x-hidden">
        <div className="w-full mt-16 md:mt-20 mx-10">
          <header className="flex justify-center mb-4 lg:mt-8">
            <h1 className="font-freckle text-5xl md:text-7xl text-border page-title ">
              Collection
            </h1>
          </header>
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-3/12 flex justify-center collection-filter">
              <CollectionFilter
                fiendFilters={fiendFilters}
                handleFilterCollection={handleFilterCollection}
              />
            </div>

            <div id="collection" className="w-full md:w-8/12 lg:w-9/12 ml-6">
              <div
                id="filter-bar"
                className="flex md:px-4 items-center mb-2 justify-around"
              >
                <CollectionDesktopFilterBar
                  collectionData={collectionData}
                  sortDataById={sortDataById}
                  collectionCount={collectionCount}
                  onSearchForToken={onSearchForToken}
                  searchedToken={searchedToken}
                  handleTokenOnChange={handleTokenOnChange}
                />
              </div>
              <div className="flex flex-wrap justify-center">
                {currentNFTs &&
                  currentNFTs.map((data) => {
                    return (
                      <div key={data.name}>
                        <FiendCard
                          data={data}
                          name={data?.name}
                          handleShowModal={handleShowModal}
                          setActiveNFT={setActiveNFT}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="flex text-center">
                <Pagination
                  nftsperpage={nftsPerPage}
                  totalNFTs={collectionData?.length}
                  paginate={paginate}
                />
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
