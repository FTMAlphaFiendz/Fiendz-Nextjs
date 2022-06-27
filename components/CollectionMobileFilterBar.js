import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import FilterFAFZ from "../public/images/misc/fafz-filter.png";
import FilterSE from "../public/images/misc/se-filter.png";
import Image from "next/image";

const dropdownSelections = [
  {
    id: 1,
    icon: <FaArrowUp />,
    text: "NFT ID",
    active: false,
    sort: "asc",
  },
  {
    id: 2,
    icon: <FaArrowDown />,
    text: "NFT ID",
    active: true,
    sort: "desc",
  },
];

const CollectionMobileFilterBar = ({
  collectionCount,
  onSearchForToken,
  searchedToken,
  handleTokenOnChange,
  collectionData,
  sortDataById,
  fiendFilters,
  handleFilterCollection,
  switchCollection,
  isFAFZActiveCollection,
}) => {
  const [openCollectionFilter, setOpenCollectionFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openTokenChecker, setOpenTokenChecker] = useState(false);
  const [activeSortFilter, setActiveOrderFilter] = useState(
    dropdownSelections[0]
  );

  const toggleCollectionFilter = () => {
    setOpenCollectionFilter(!openCollectionFilter);
  };

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const toggleTokenChecker = () => {
    setOpenTokenChecker(!openTokenChecker);
  };

  const onFilterSelect = (data, filter) => {
    sortDataById(filter.sort, data);
    setActiveOrderFilter(filter);
  };

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSearchForToken(event);
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div
        id="m-collection-filter"
        className="w-full bg-white flex flex-col justify-between p-2 items-center nft-border my-2"
      >
        <div className="flex justify-between w-full items-center">
          <div className="text-border font-inter text-lg">Collection</div>
          <div
            className="text-border font-inter text-lg cursor-pointer"
            onClick={() => {
              toggleCollectionFilter();
            }}
          >
            {openCollectionFilter ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {openCollectionFilter && (
          <div>
            <div className="w-full flex flex-row">
              <div
                className={`w-6/12 p-2 cursor-pointer ${
                  !isFAFZActiveCollection && "non-active-collection"
                }`}
                onClick={() => {
                  switchCollection("fafz");
                }}
              >
                <Image src={FilterFAFZ} alt="Fiend from FAFZ Collection" />
                <p className="text-border font-freckle">FAFZ</p>
              </div>
              <div
                className={`w-6/12 p-2 cursor-pointer ${
                  isFAFZActiveCollection && "non-active-collection"
                }`}
                onClick={() => {
                  switchCollection("se");
                }}
              >
                <Image src={FilterSE} alt="Fiend from SE Collection" />
                <p className="text-border font-freckle">FAFZ SE</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        id="m-filter"
        className="w-full bg-white flex flex-col justify-between p-2 items-center nft-border my-2"
      >
        <div className="flex justify-between w-full items-center">
          <div className="text-border font-inter text-lg">Filter</div>
          <div
            className="text-border font-inter text-lg cursor-pointer"
            onClick={() => {
              toggleFilter();
            }}
          >
            {openFilter ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {openFilter && (
          <div className="flex justify-between">
            <div className="flex flex-col items-between">
              <h6 className="font-inter text-border mb-2">By Rarity</h6>
              {fiendFilters?.map((filter) => {
                return (
                  <div className="flex items-center py-1" key={filter.name}>
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      name={filter.name}
                      style={{ height: "20px", width: "20px" }}
                      onChange={(e) => {
                        handleFilterCollection(e, filter);
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
            <div>
              <h6 className="w-full font-inter text-border mb-1">
                By Token ID
              </h6>
              {dropdownSelections.map((filter, i) => {
                return (
                  <div
                    key={i}
                    className={`flex items-center font-inter ${
                      activeSortFilter.id === filter.id
                        ? "text-orange-500"
                        : "text-border"
                    }  ml-4 cursor-pointer my-1`}
                    onClick={() => {
                      onFilterSelect(collectionData, filter);
                    }}
                  >
                    {filter.text}
                    <span className="ml-2">{filter.icon}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div
        id="m-token-checker"
        className="w-full bg-white flex flex-col justify-between p-2 items-center nft-border my-2"
      >
        <div className="flex justify-between w-full items-center">
          <div className="text-border font-inter text-lg">NFT ID</div>
          <div
            className="text-border font-inter text-lg cursor-pointer"
            onClick={() => {
              toggleTokenChecker();
            }}
          >
            {openTokenChecker ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {openTokenChecker && (
          <div className="my-3">
            <input
              type="text"
              className="token-checker border-2 font-inter text-border text-center"
              placeholder="Search by ID....."
              value={searchedToken}
              onChange={handleTokenOnChange}
              onKeyDown={onKeyDown}
            />
            <button
              type="submit"
              onClick={(e) => {
                onSearchForToken(e);
              }}
              className="p-2.5 sm:ml-2 rounded-full border-2 border-orange-700 hover:shadow-xl duration-500 hover:text-white font-freckle connect-button mx-1"
            >
              <FaSearch />
            </button>
          </div>
        )}
      </div>
      <div className="font-freckle text-2xl text-border text-white my-2 count-title">
        {collectionCount} NFTS FOUND
      </div>
    </div>
  );
};

export default CollectionMobileFilterBar;
