import React from "react";
import Waves from "./Waves";
import Image from "next/image";
import logoBig from "../public/images/titles/logo-big.png";

const NftPageViewWrapper = ({ children }) => {
  return (
    <div className="mint-page relative md:flex">
      <Waves fillColor="#fedf87" className="editorial-fixed" />
      <div id="main" className="center-div w-full flex justify-center">
        <div className="fiendz-card-container w-50 md:w-5/6 lg:m-3 relative justify-center flex flex-col bg-white items-center lg:w-8/12">
          <header className="w-full absolute -top-0 md:-top-8 flex justify-center items-center">
            <div className="w-48 md:w-72 lg:w-80 absolute -top-12 md:-top-8 coming-soon-title">
              <Image src={logoBig} alt="Main Fantom Alpha Fiendz Logo" />
            </div>
          </header>
          <div className="flex items-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default NftPageViewWrapper;
