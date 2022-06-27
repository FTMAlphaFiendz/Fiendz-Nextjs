import React from "react";
import FilterFAFZ from "../public/images/misc/fafz-filter.png";
import FilterSE from "../public/images/misc/se-filter.png";
import Image from "next/image";

const CollectionFilter = ({ fiendFilters, handleFilterCollection }) => {
  return (
    <div
      id="filter"
      className="flex justify-center nft-border bg-white mb-3 hidden md:block filter-section py-2 px-3"
    >
      <div className="w-full">
        <h2 className="text-border font-freckle text-xl mb-2">Collection</h2>
        <div className="w-full flex flex-row">
          <div className="w-6/12 p-2">
            <Image src={FilterFAFZ} alt="Fiend from FAFZ Collection" />
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
        <h2 className="text-border font-freckle text-xl my-2">Filter</h2>
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
  );
};

export default CollectionFilter;
