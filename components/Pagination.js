import React, { useState, useEffect } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const Pagination = ({ nftsperpage, totalNFTs, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [lastIndex, setLastIndex] = useState(39);

  const getSlicedPageNumbers = (totalNFTs, nftsperpage) => {
    let numbers = [];
    for (let i = 1; i <= Math.ceil(totalNFTs / nftsperpage); i++) {
      numbers.push(i);
    }
    let lastPage = numbers.length;
    setLastIndex(lastPage);
    numbers = getRange(numbers, currentPage, 4);
    return numbers;
  };

  const getRange = (array, index, range) => {
    var least = index - Math.floor(range / 2);
    least = least < 0 ? 0 : least;
    return array.slice(least, least + range);
  };

  const changePageByRange = (currentPage, lastIndex, type, range = 5) => {
    if (type === "plus") {
      currentPage = currentPage + range;
      if (currentPage > lastIndex) {
        currentPage = lastIndex;
      }
    } else {
      currentPage = currentPage - range;
      if (currentPage <= 0) {
        currentPage = 1;
      }
    }
    return currentPage;
  };
  useEffect(() => {
    let newPageNumbers = getSlicedPageNumbers(totalNFTs, nftsperpage);
    setPageNumbers(newPageNumbers);
  }, [currentPage, totalNFTs]);

  return (
    <div className="flex items-center justify-center my-3 w-full">
      {pageNumbers.length > 0 && (
        <ul className="flex">
          <li
            className={`mx-2 text-2xl font-inter text-border cursor-pointer paginate-button flex items-center justify-center`}
            onClick={() => {
              let cp = changePageByRange(currentPage, lastIndex, "minus");
              setCurrentPage(cp);
              paginate(cp);
            }}
          >
            <a className="">
              <AiOutlineDoubleLeft />
            </a>
          </li>
          <li
            className={
              currentPage >= 3
                ? "block text-border cursor-pointer paginate-button text-xl font-inter mx-2"
                : "hidden"
            }
          >
            <a
              onClick={() => {
                setCurrentPage(1);
                paginate(1);
              }}
            >
              1
            </a>
          </li>
          <li className={`${currentPage >= 4 ? "block font-inter" : "hidden"}`}>
            ...
          </li>
          {pageNumbers?.map((number) => (
            <li
              key={number}
              className={` mx-2 text-xl ${
                currentPage === number && "paginate-active"
              } font-inter text-border cursor-pointer paginate-button`}
            >
              <a
                onClick={() => {
                  setCurrentPage(number);
                  paginate(number);
                }}
              >
                {number}
              </a>
            </li>
          ))}
          <li
            className={`${
              currentPage <= lastIndex - 4 ? "block font-inter" : "hidden"
            }`}
          >
            ...
          </li>
          <li
            className={
              currentPage <= lastIndex - 4
                ? "block text-border cursor-pointer paginate-button text-xl font-inter mx-2"
                : "hidden"
            }
          >
            <a
              onClick={() => {
                setCurrentPage(lastIndex);
                paginate(lastIndex);
              }}
            >
              {lastIndex}
            </a>
          </li>
          <li
            className={`mx-2 text-2xl font-inter text-border cursor-pointer paginate-button flex items-center justify-center`}
            onClick={() => {
              console.log("here");
              let cp = changePageByRange(currentPage, lastIndex, "plus");
              setCurrentPage(cp);
              paginate(cp);
            }}
          >
            <AiOutlineDoubleRight />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
