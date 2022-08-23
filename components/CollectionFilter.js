import React from "react";
import FilterFAFZ from "../public/images/misc/fafz-filter.png";
import FilterSE from "../public/images/misc/se-filter.png";
import Image from "next/image";

const CollectionFilter = ({
  fiendFilters,
  handleFilterCollection,
  switchCollection,
  isFAFZActiveCollection,
}) => {
  return (
    <div
      id="filter"
      className="flex justify-center nft-border bg-white mb-3 hidden md:block filter-section py-3 px-3"
    >
      <div className="w-full">
        <h2 className="text-border font-freckle text-2xl mb-2">Collections</h2>
        <div className="w-full flex flex-row">
          <div
            className={`w-6/12 p-2.5 cursor-pointer ${
              !isFAFZActiveCollection && "non-active-collection"
            }`}
            onClick={() => {
              switchCollection("fafz");
            }}
          >
            <img
              src="/images/misc/fafz-filter.png"
              alt="Fiend from FAFZ Collection"
              className={`${
                !isFAFZActiveCollection ? "clear-border" : "nft-border"
              }`}
            />
            <p className="text-border font-freckle">FAFZ</p>
          </div>
          <div
            className={`w-6/12 p-2.5 cursor-pointer ${
              isFAFZActiveCollection && "non-active-collection"
            }`}
            onClick={() => {
              switchCollection("se");
            }}
          >
            <img
              src="/images/misc/se-filter.png"
              alt="Fiend from SE Collection"
              className={`${
                !isFAFZActiveCollection ? "nft-border" : "clear-border"
              }`}
            />

            <p className="text-border font-freckle">FAFZ SE</p>
          </div>
        </div>
      </div>
      <div className="border-bottom my-1"></div>
      <div className="">
        <h2 className="text-border font-freckle text-2xl my-2">Filters</h2>
        <div className="flex flex-col">
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
                  className="font-freckle ml-2"
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
  );
};

export default CollectionFilter;
