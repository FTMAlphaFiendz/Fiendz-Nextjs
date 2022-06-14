import React, { useState } from "react";

const Pagination = ({ nftsperpage, totalNFTs, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalNFTs / nftsperpage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`inline-block mx-2 ${
            currentPage === number ? "text-3xl" : "text-xl"
          } font-inter text-border cursor-pointer`}
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
    </ul>
  );
};

export default Pagination;
