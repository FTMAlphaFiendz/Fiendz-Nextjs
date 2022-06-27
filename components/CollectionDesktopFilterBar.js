import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch, FaArrowDown, FaArrowUp } from "react-icons/fa";

const dropdownSelections = [
  {
    icon: <FaArrowUp />,
    text: "NFT ID",
    active: false,
    sort: "asc",
  },
  {
    icon: <FaArrowDown />,
    text: "NFT ID",
    active: true,
    sort: "desc",
  },
];

const CollectionDesktopFilterBar = ({
  collectionCount,
  onSearchForToken,
  searchedToken,
  handleTokenOnChange,
  collectionData,
  sortDataById,
}) => {
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState(dropdownSelections[0]);
  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSearchForToken(event);
    }
  };

  const onFilterSelect = (data, filter) => {
    sortDataById(filter.sort, data);
    setActiveFilter(filter);
    setOpenFilterDropdown(!openFilterDropdown);
  };

  return (
    <>
      <div className="font-freckle text-2xl text-border text-white">
        {collectionCount} NFTS FOUND
      </div>
      <div className="w-4/12 nft-border bg-white token-checker mx-2 flex flex-row items-center">
        <button
          className="ml-2 text-border cursor-pointer"
          onClick={(e) => {
            onSearchForToken(e);
          }}
        >
          <FaSearch />
        </button>
        <input
          type="text"
          className={`font-inter text-border bg-transparent ml-2 overflow-hidden text-sm`}
          placeholder="Search by ID....."
          value={searchedToken}
          onChange={handleTokenOnChange}
          onKeyDown={onKeyDown}
          min="0"
          max="777"
        />
      </div>
      <div className="w-3/12 nft-border bg-white token-checker mx-2 flex flex-row items-center justify-between filter-dropdown relative">
        <div className="flex items-center font-inter text-border ml-4">
          {activeFilter?.text}
          <span className="ml-2">{activeFilter?.icon}</span>
        </div>

        <div
          className="mr-2 text-xl font-inter text-border cursor-pointer"
          onClick={() => {
            setOpenFilterDropdown(!openFilterDropdown);
          }}
        >
          <IoMdArrowDropdown />
        </div>
        {openFilterDropdown && (
          <DropdownMenu
            filters={dropdownSelections}
            collectionData={collectionData}
            onFilterSelect={onFilterSelect}
          />
        )}
      </div>
    </>
  );
};

const DropdownMenu = ({ filters, collectionData, onFilterSelect }) => {
  return (
    <div className="text-border dropdown-test nft-border w-full">
      {filters.map((filter, i) => {
        return (
          <div
            key={i}
            className="flex items-center font-inter text-border ml-4 cursor-pointer"
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
  );
};

export default CollectionDesktopFilterBar;
