import React from "react";

const Pagination = ({ nftsperpage, totalNFTs, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalNFTs / nftsperpage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className="inline-block mx-2 text-xl font-inter text-border cursor-pointer"
        >
          <a onClick={() => paginate(number)}>{number}</a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
